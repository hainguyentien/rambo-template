const { getDefaultConfig } = require('expo/metro-config');
const { withLingui } = require('@lingui/metro-transformer');

module.exports = withLingui(getDefaultConfig(__dirname));
