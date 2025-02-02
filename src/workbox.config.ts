module.exports = {
    globDirectory: 'dist/',
    globPatterns: [
      '**/*.{html,js,css,png,jpg}'
    ],
    swDest: 'dist/sw.js',
    runtimeCaching: [
      {
        urlPattern: ({ request }: { request: Request }) => request.destination === 'document' || request.destination === 'script' || request.destination === 'style',
        handler: 'StaleWhileRevalidate',
      },
    ],
  };
  