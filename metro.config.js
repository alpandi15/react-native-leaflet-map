const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = mergeConfig(getDefaultConfig(__dirname), {
    resolver: {
      assetExts: ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'svg'],
    },
});

module.exports = withNativeWind(config, { input: './global.css' });

// const config = {};

// module.exports = mergeConfig(getDefaultConfig(__dirname), config);
