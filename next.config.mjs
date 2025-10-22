import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  output: 'standalone',
  turbopack: {},
  reactCompiler: true,
}

export default withPayload(nextConfig)
