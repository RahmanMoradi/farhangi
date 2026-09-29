/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        dangerouslyAllowLocalIP: true,
        remotePatterns: [
            { protocol: 'https', hostname: 'api.minnsdev.ir', pathname: '/storage/**' },
            { protocol: 'http', hostname: 'localhost', port: '3939', pathname: '/storage/**' },
        ],
    }
};

export default nextConfig;
