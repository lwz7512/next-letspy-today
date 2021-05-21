/**
 * write hero image base64 string to siteMetadata.json
 * @param {string} imgPath 
 */
const generateHeroImgPlaceholder = async (imgPath) => {
  console.log('>>> to generate hero placeholder...')
  const sharp = require('sharp')
  const buffer = await sharp(imgPath)
    .resize({width: 200}).jpeg({quality: 60}).toBuffer()
  const base64Str = buffer.toString('base64')
  const imgData = `data:image/jpg;base64,${base64Str}`
  const fs = require('fs-extra')
  const siteJson = await fs.readJSON('./data/siteMetadata.json')
  siteJson['heroImgPlaceholder'] = imgData
  await fs.writeJSON('./data/siteMetadata.json', siteJson, {spaces: 2})
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  future: {
    webpack5: true,
  },
  webpack: (config, { dev, isServer }) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|mp4)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: 'static/media/[name].[hash].[ext]',
          },
        },
      ],
    })

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    if (!dev && !isServer) {
      // Replace React with Preact only in client production build
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      })
    }

    return config
  },
})

// prepare placeholder image, saved to the global object
generateHeroImgPlaceholder('./public/static/images/lets_ph_md.jpg')