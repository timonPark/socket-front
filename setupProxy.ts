import { createProxyMiddleware } from 'http-proxy-middleware';

export default function(app: any) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8788',  // 백엔드 API 서버 주소
      changeOrigin: true,
    })
  );
}