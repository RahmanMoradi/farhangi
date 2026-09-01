/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        dangerouslyAllowLocalIP: true,
        remotePatterns: [
            { protocol: 'https', hostname: 'api.minnsdev.ir', pathname: '/storage/**' },
        ],
    }
};

export default nextConfig;
