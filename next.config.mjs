const isGithubPages = process.env.GITHUB_PAGES === 'true';
const basePath = isGithubPages ? '/Sasha-Dhruv-Wedding-Invite' : '';

const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
