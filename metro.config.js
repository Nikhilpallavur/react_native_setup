const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'mp4', 'm4v', 'aac', 'wav', 'webm'], // Adjust as needed
    sourceExts: ['js', 'jsx', 'ts', 'tsx', 'svg', 'json', 'cjs'], // Include 'svg'
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
