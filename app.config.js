export default ({ config }) => ({
  ...config,
  name: "Butler",
  slug: "butler",
  version: "3.6.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*", "assets/fonts/*"],
  ios: {
    supportsTablet: false,
    bundleIdentifier: "com.butlerapp.ios",
    buildNumber: "3.6.0",
    infoPlist: {
      NSMicrophoneUsageDescription:
        "This app needs access to your microphone to record audio to be able to send your voice message to Butler Support for easier communication.",
      NSCameraUsageDescription:
        "This app needs access to your camera to take photos to share with Butler Support for easier communication.",
      NSPhotoLibraryUsageDescription:
        "This app needs access to your photo library to upload images to share with Butler Support for easier communication.",
      NSPhotoLibraryAddUsageDescription:
        "This app needs access to save photos to your photo library to share with Butler Support for easier communication.",
      NSDocumentDirectoryUsageDescription:
        "This app needs access to your documents to upload files to share with Butler Support for easier communication.",
      ITSAppUsesNonExemptEncryption: false,
      UIDeviceFamily: [1],
    },
  },
  android: {
    package: "com.butlerapp.android",
    versionCode: 1,
    permissions: [
      "RECORD_AUDIO",
      "CAMERA",
      "READ_EXTERNAL_STORAGE",
      "WRITE_EXTERNAL_STORAGE",
    ],
  },
  web: {
    favicon: "./assets/icon.png",
  },
  plugins: ["expo-dev-client", "expo-font"],
  extra: {
    eas: {
      projectId: "09cb2470-650b-446b-9570-fe5e59efd1a6",
    },
  },
});
