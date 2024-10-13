import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
	trailingSlash: true,
	eslint: {
		ignoreDuringBuilds: true
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**.**.**'
			},
			{
				protocol: 'https',
				hostname: 'utfs.io'
			}
		]
	},
	experimental: {
		serverComponentsExternalPackages: ["yjs"]
	}
};

export default withNextIntl(nextConfig);
