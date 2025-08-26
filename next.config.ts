
import type {NextConfig} from 'next';

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.gstatic.com;
  child-src 'self';
  style-src 'self' 'unsafe-inline';
  img-src 'self' https://placehold.co data:;
  font-src 'self';  
  connect-src 'self' vitals.vercel-insights.com https://firebase.googleapis.com https://identitytoolkit.googleapis.com;
  frame-src 'self' https://www.google.com;
  upgrade-insecure-requests;
`;

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
   {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
   {
    key: 'Permissions-Policy',
    value: "camera=(), microphone=(), geolocation=(), oversized-images=()"
  }
];

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
