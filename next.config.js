const path = require('path');

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  experimental: {
    serverActions: true,
    esmExternals: 'loose',
    serverComponentsExternalPackages: ['mongoose'],
  },
};
