import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '752261691718-glv5aq8kimloohmks4ltrljqdcpee3ce.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
  },

  appId: 'io.ionic.starter',
  appName: 'tcc',
  webDir: 'www',
  bundledWebRuntime: false,

};



export default config;
