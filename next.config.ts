import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Your Next.js config here
  output: 'standalone',
  turbopack: {},
  // reactCompiler: true,
}

export default withPayload(nextConfig)
