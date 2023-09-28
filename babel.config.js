module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'expo-router/babel',
      'nativewind/babel',
      // Required for expo-router
      [
        'babel-plugin-root-import',
        {
          rootPathSuffix: './',
          rootPathPrefix: '~/',
        },
      ],
    ],
  }
}
