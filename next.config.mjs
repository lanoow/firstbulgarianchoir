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
		reactCompiler: true,
	},
	serverExternalPackages: ["yjs"],
	poweredByHeader: false,
};

export default withNextIntl(nextConfig);
