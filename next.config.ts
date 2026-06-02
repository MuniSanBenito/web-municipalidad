import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  webpack: (webpack) => {
    webpack.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpack
  },
  output: 'standalone',
  // reactCompiler: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '12mb',
    },
  },
}

export default withPayload(nextConfig)
