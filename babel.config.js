module.exports = function babelConfig(api) {
  api.cache.forever();
  return {
    babelrcRoots: [
      // Keep the root as a root
      '.',
      // Also consider monorepo packages "root" and load their .babelrc files.
      './frontend/*',
    ],
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            browsers: [
              'last 3 chrome versions',
              'last 3 firefox versions',
              'last 3 safari versions',
              'last 3 edge versions',
              'ie 11'
             ],
          },
        },
      ],
      '@babel/typescript'
    ],
    plugins: [
      '@babel/proposal-class-properties',
      '@babel/syntax-dynamic-import',
      '@babel/plugin-proposal-object-rest-spread',
    ]
  };
};