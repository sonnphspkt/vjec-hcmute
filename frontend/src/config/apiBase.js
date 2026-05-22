/**
 * Dùng `/api` khi dev với Vite: request cùng origin (kể cả mở bằng IP LAN),
 * proxy trong vite.config.js chuyển tiếp sang backend :5000.
 * Production: đặt VITE_API_URL đầy đủ nếu API khác host (vd https://api.example.com/api).
 */
export function getApiBaseUrl() {
  const raw = import.meta.env.VITE_API_URL;
  if (typeof raw === 'string' && raw.trim()) {
    return raw.trim().replace(/\/$/, '');
  }
  return '/api';
}
