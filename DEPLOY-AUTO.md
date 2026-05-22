# Auto Deploy UTE Job Platform

Mô hình:

```text
GitHub push main
  -> SSH vào server deploy backend
  -> Deploy frontend lên Vercel
```

## 1. Chuẩn bị server backend

Trên server cần có:

```bash
node -v
npm -v
git --version
pm2 -v
```

Nếu chưa có PM2:

```bash
npm install -g pm2
```

Clone project vào server, ví dụ:

```bash
cd /var/www
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git ute-job-platform
cd /var/www/ute-job-platform/backend
npm ci --omit=dev
```

Tạo file backend `.env` trên server:

```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://USER:PASSWORD@CLUSTER/ute-job-platform
JWT_SECRET=doi-chuoi-nay-that-dai-va-bi-mat
JWT_EXPIRE=7d
FRONTEND_URL=https://your-project.vercel.app
```

Chạy thử backend:

```bash
pm2 start src/server.js --name ute-job-backend
pm2 save
```

Test:

```text
http://IP_SERVER:5000/health
```

Khuyến nghị dùng Nginx + HTTPS:

```text
https://api-your-domain.com -> http://localhost:5000
```

## 2. Chuẩn bị Vercel frontend

Tạo project Vercel với:

```text
Root Directory: frontend
Framework: Vite
Build Command: npm run build
Output Directory: dist
```

Trong Vercel Project Settings -> Environment Variables:

```env
VITE_API_URL=https://api-your-domain.com/api
VITE_SOCKET_URL=https://api-your-domain.com
```

Nếu chưa có domain API HTTPS, có thể dùng tạm:

```env
VITE_API_URL=http://IP_SERVER:5000/api
VITE_SOCKET_URL=http://IP_SERVER:5000
```

Nhưng khi frontend chạy HTTPS, backend HTTP có thể bị trình duyệt chặn mixed content. Nên dùng HTTPS cho backend.

## 3. Lấy Vercel token và project id

Cài Vercel CLI ở máy local:

```bash
npm install -g vercel
cd /JOB_WEB/frontend
vercel login
vercel link
```

Lấy thông tin project:

```bash
cat .vercel/project.json
```

Bạn sẽ thấy:

```json
{
  "orgId": "...",
  "projectId": "..."
}
```

Tạo token tại:

```text
Vercel -> Account Settings -> Tokens
```

## 4. Tạo SSH key cho GitHub Actions

Trên máy local:

```bash
ssh-keygen -t ed25519 -C "github-actions-ute-job" -f ~/.ssh/ute_job_deploy
```

Copy public key lên server:

```bash
ssh-copy-id -i ~/.ssh/ute_job_deploy.pub USER@IP_SERVER
```

Kiểm tra đăng nhập:

```bash
ssh -i ~/.ssh/ute_job_deploy USER@IP_SERVER
```

Lấy private key để đưa vào GitHub Secret:

```bash
cat ~/.ssh/ute_job_deploy
```

## 5. Tạo GitHub Secrets

Vào:

```text
GitHub repo -> Settings -> Secrets and variables -> Actions -> New repository secret
```

Thêm các secret:

```text
SERVER_HOST=IP_SERVER
SERVER_USER=ten_user_server
SERVER_PORT=22
SERVER_SSH_KEY=private_key_vua_tao
BACKEND_PATH=/var/www/ute-job-platform

VERCEL_TOKEN=token_tu_vercel
VERCEL_ORG_ID=orgId_tu_.vercel/project.json
VERCEL_PROJECT_ID=projectId_tu_.vercel/project.json
```

## 6. Push để tự deploy

Ở máy local:

```bash
cd /JOB_WEB
git add .
git commit -m "Add auto deploy workflow"
git branch -M main
git push origin main
```

Từ lần sau chỉ cần:

```bash
git add .
git commit -m "Update web"
git push
```

GitHub Actions sẽ tự deploy.

## 7. Lưu ý quan trọng

- Không commit file `.env`.
- Backend server phải pull được repo GitHub.
- Nếu repo private, server cần deploy key hoặc GitHub token.
- Nếu dùng HTTPS frontend, backend cũng nên có HTTPS.
- Sau khi đổi domain frontend, nhớ cập nhật `FRONTEND_URL` trong backend `.env`.
- Nếu backend không restart được, kiểm tra:

```bash
pm2 logs ute-job-backend
```

## 8. Nếu server không có IP public: deploy backend lên Render Free

GitHub chỉ lưu code, không chạy backend. Nếu server nội bộ không có IP public, frontend Vercel sẽ không gọi được API trên server đó. Cách miễn phí dễ nhất là deploy backend từ GitHub lên Render.

### 8.1. Chuẩn bị database MongoDB Atlas

Tạo MongoDB Atlas Free cluster, sau đó lấy URI dạng:

```env
mongodb+srv://USER:PASSWORD@CLUSTER/ute-job-platform
```

Trong Network Access của Atlas, cho phép Render kết nối. Khi demo có thể dùng:

```text
0.0.0.0/0
```

### 8.2. Tạo Render Web Service

Vào:

```text
https://render.com
```

Chọn:

```text
New -> Web Service -> Connect GitHub repo sonnphspkt/vjec-hcmute
```

Nếu Render nhận `render.yaml`, chọn blueprint/web service theo file này. Nếu cấu hình thủ công:

```text
Root Directory: backend
Build Command: npm ci --omit=dev
Start Command: npm start
```

Environment Variables:

```env
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://USER:PASSWORD@CLUSTER/ute-job-platform
JWT_SECRET=chuoi-bi-mat-that-dai
JWT_EXPIRE=7d
FRONTEND_URL=https://jobs.vjec.edu.vn
```

Sau khi deploy, Render sẽ cho URL dạng:

```text
https://vjec-hcmute-api.onrender.com
```

Test:

```text
https://vjec-hcmute-api.onrender.com/health
```

### 8.3. Seed dữ liệu mẫu lên Render database

Sau khi Render deploy xong và có MongoDB Atlas URI, chạy seed từ máy local:

```bash
cd /JOB_WEB/backend
MONGODB_URI="mongodb+srv://USER:PASSWORD@CLUSTER/ute-job-platform" node src/utils/seed-rich.js
```

### 8.4. Trỏ frontend Vercel sang Render backend

Vào Vercel project `vjec-hcmute-4eaa`:

```text
Settings -> Environment Variables
```

Set:

```env
VITE_API_URL=https://vjec-hcmute-api.onrender.com/api
VITE_SOCKET_URL=https://vjec-hcmute-api.onrender.com
```

Sau đó redeploy frontend hoặc push code mới.

Lưu ý: Render Free có thể sleep khi không có truy cập, request đầu tiên sau khi sleep sẽ chậm hơn bình thường.
