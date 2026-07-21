import type { NextConfig } from 'next';

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.gstatic.com https://apis.google.com https://cdn.tailwindcss.com;
  child-src 'self' https://*.firebaseapp.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' https://placehold.co https://picsum.photos https://images.unsplash.com data: https://firebasestorage.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self' vitals.vercel-insights.com https://*.googleapis.com https://*.firebase.com https://*.firebaseio.com https://*.cloudworkstations.dev https://firebasestorage.googleapis.com;
  frame-src 'self' https://www.google.com https://*.firebaseapp.com;
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
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/**',
      }
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
  async rewrites() {
    return [
      {
        source: '/faq',
        destination: '/faq.html',
      },
      {
        source: '/reviews',
        destination: '/reviews.html',
      },
    ];
  },
  serverExternalPackages: ['node-fetch']
};

export default nextConfig;
