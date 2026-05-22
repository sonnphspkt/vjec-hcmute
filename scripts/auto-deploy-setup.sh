#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SSH_KEY_PATH="${HOME}/.ssh/ute_job_deploy"

info() {
  printf "\033[1;34m[auto-deploy]\033[0m %s\n" "$1"
}

warn() {
  printf "\033[1;33m[warning]\033[0m %s\n" "$1"
}

die() {
  printf "\033[1;31m[error]\033[0m %s\n" "$1" >&2
  exit 1
}

need_cmd() {
  command -v "$1" >/dev/null 2>&1 || die "Missing command: $1"
}

prompt() {
  local var_name="$1"
  local label="$2"
  local default="${3:-}"
  local value
  if [[ -n "$default" ]]; then
    read -r -p "${label} [${default}]: " value
    value="${value:-$default}"
  else
    read -r -p "${label}: " value
  fi
  printf -v "$var_name" '%s' "$value"
}

prompt_secret() {
  local var_name="$1"
  local label="$2"
  local value
  read -r -s -p "${label}: " value
  printf "\n"
  printf -v "$var_name" '%s' "$value"
}

need_cmd git
need_cmd ssh
need_cmd ssh-keygen

cd "$ROOT_DIR"

info "Checking local project"
if [[ ! -d .git ]]; then
  git init
  git branch -M main
  info "Initialized git repository on branch main"
else
  git branch -M main || true
fi

if [[ ! -f backend/package-lock.json || ! -f frontend/package-lock.json ]]; then
  die "Missing package-lock.json. Run npm install in backend and frontend first."
fi

info "Collecting deployment information"
prompt GITHUB_REPO "GitHub repo URL, ví dụ git@github.com:user/ute-job-platform.git"
prompt SERVER_HOST "Server IP/domain chạy backend"
prompt SERVER_USER "Server SSH user" "root"
prompt SERVER_PORT "Server SSH port" "22"
prompt BACKEND_PATH "Đường dẫn project trên server" "/var/www/ute-job-platform"
prompt API_URL "Backend public URL, ví dụ https://api.example.com hoặc http://IP:5000"
prompt FRONTEND_URL "Frontend Vercel URL hiện tại, nếu chưa có cứ nhập tạm https://your-project.vercel.app" "https://your-project.vercel.app"

info "Preparing SSH deploy key"
mkdir -p "${HOME}/.ssh"
chmod 700 "${HOME}/.ssh"
if [[ ! -f "$SSH_KEY_PATH" ]]; then
  ssh-keygen -t ed25519 -C "github-actions-ute-job" -f "$SSH_KEY_PATH" -N ""
  info "Created SSH key: $SSH_KEY_PATH"
else
  warn "SSH key already exists: $SSH_KEY_PATH"
fi

info "Copying SSH public key to server"
if command -v ssh-copy-id >/dev/null 2>&1; then
  ssh-copy-id -i "${SSH_KEY_PATH}.pub" -p "$SERVER_PORT" "${SERVER_USER}@${SERVER_HOST}" || warn "ssh-copy-id failed. Copy this public key manually to ~/.ssh/authorized_keys on server:"
else
  warn "ssh-copy-id not found. Copy this public key manually to ~/.ssh/authorized_keys on server:"
fi
cat "${SSH_KEY_PATH}.pub"

info "Writing local production env templates"
cat > frontend/.env.production.local <<EOF_ENV
VITE_API_URL=${API_URL}/api
VITE_SOCKET_URL=${API_URL}
VITE_APP_NAME=UTE Job Platform
VITE_APP_VERSION=1.0.0
EOF_ENV

cat > backend/.env.production.example <<EOF_ENV
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://USER:PASSWORD@CLUSTER/ute-job-platform
JWT_SECRET=change-this-to-a-long-random-secret
JWT_EXPIRE=7d
FRONTEND_URL=${FRONTEND_URL}
EOF_ENV

info "Configuring git remote"
if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "$GITHUB_REPO"
else
  git remote add origin "$GITHUB_REPO"
fi

info "Creating local commit"
git add .
if git diff --cached --quiet; then
  warn "Nothing to commit"
else
  git commit -m "Prepare automatic deployment"
fi

cat <<EOF_NEXT

============================================================
Phần tự động trong máy đã xong.

Bạn còn cần tạo GitHub Secrets. Nếu có GitHub CLI (gh), script có thể set giúp.
Máy hiện tại $(command -v gh >/dev/null 2>&1 && echo "có gh" || echo "chưa có gh").

Secrets cần set:

SERVER_HOST=${SERVER_HOST}
SERVER_USER=${SERVER_USER}
SERVER_PORT=${SERVER_PORT}
BACKEND_PATH=${BACKEND_PATH}
SERVER_SSH_KEY=<private key trong ${SSH_KEY_PATH}>

VERCEL_TOKEN=<token từ Vercel>
VERCEL_ORG_ID=<orgId trong frontend/.vercel/project.json>
VERCEL_PROJECT_ID=<projectId trong frontend/.vercel/project.json>

Backend server cần có file:
${BACKEND_PATH}/backend/.env

Tham khảo template:
backend/.env.production.example

Sau khi set secrets, chạy:

git push -u origin main

Hoặc vào GitHub -> Actions -> Deploy UTE Job Platform -> Run workflow.
============================================================
EOF_NEXT

if command -v gh >/dev/null 2>&1; then
  read -r -p "Bạn muốn set GitHub Secrets tự động bằng gh không? [y/N]: " USE_GH
  if [[ "${USE_GH}" =~ ^[Yy]$ ]]; then
    prompt_secret VERCEL_TOKEN "Vercel Token"
    prompt VERCEL_ORG_ID "Vercel ORG ID"
    prompt VERCEL_PROJECT_ID "Vercel PROJECT ID"
    gh secret set SERVER_HOST --body "$SERVER_HOST"
    gh secret set SERVER_USER --body "$SERVER_USER"
    gh secret set SERVER_PORT --body "$SERVER_PORT"
    gh secret set BACKEND_PATH --body "$BACKEND_PATH"
    gh secret set SERVER_SSH_KEY < "$SSH_KEY_PATH"
    gh secret set VERCEL_TOKEN --body "$VERCEL_TOKEN"
    gh secret set VERCEL_ORG_ID --body "$VERCEL_ORG_ID"
    gh secret set VERCEL_PROJECT_ID --body "$VERCEL_PROJECT_ID"
    info "GitHub Secrets were set."
  fi
fi
