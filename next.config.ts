import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cscloudsolutions.com.ar' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'stagingweb.ctrl365.com' },
      { protocol: 'https', hostname: 'ctrl365.com' }
    ]
  }
};

export default nextConfig;
