
const basePath = '';
const env = {
  REACT_APP_BASE_API_URL: process.env.REACT_APP_BASE_API_URL,
  APP_ENV: (() => {
    return process.env.APP_ENV;
  })(),
};
const images = {
  domains: [
    'storage.googleapis.com',
    'res.cloudinary.com',
    'scontent-sin6-3.cdninstagram.com',
    'dev.eteamsponsor.com',
    'app.eteamsponsor.com',
    "images.unsplash.com",
    "source.unsplash.com",

  ],
  minimumCacheTTL: 31536000,
};

module.exports = {
  productionBrowserSourceMaps: true,
  env,
  images,
  basePath,
  async rewrites() {
    return [
      {
        source: '/:any*',
        destination: '/',
      },
    ];
  }
};
