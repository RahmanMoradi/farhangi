/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        dangerouslyAllowLocalIP: true,
        domains: [
            'localhost',
            '192.168.1.220',
            'api.minnsdev.ir',
            'api.mehranstore.com',
            'api.devprojects.ir'
        ],
        remotePatterns: [
            { protocol: 'http', hostname: 'localhost', port: '3939', pathname: '/storage/**' },
        ],
    }
};

export default nextConfig;
