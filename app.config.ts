import { ExpoConfig, ConfigContext } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'milva',
  description: 'milva',
  slug: 'milva',
  scheme: 'milva',
  version: '1.0.0',
  sdkVersion: '47.0.0',
  orientation: 'portrait',
  icon: './src/assets/images/icon.png',  
  userInterfaceStyle: 'automatic',
  jsEngine: 'hermes',
  updates: {
    enabled: true,    
  },
  assetBundlePatterns: [
    './src/assets/images/*',
  ],
  locales: {
    tr: './src/assets/languages/turkish.json',
    en: './src/assets/languages/english.json',
  },
  splash: {
    image: './src/assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  ios: {
    bundleIdentifier: 'com.milva.milva',
    buildNumber: '1.0.0',
    infoPlist: {
      CFBundleAllowMixedLocalizations: true,
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './src/assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',     
    },
    package: 'com.milva.milva',
    versionCode: 1,
    useNextNotificationsApi: true,
  },

});
