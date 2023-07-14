const { withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

const mf = require('@angular-architects/module-federation/webpack');
const path = require('path');
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(path.join(__dirname, 'tsconfig.json'), [
  '@nx-ngrx-angular/data-store',
]);

module.exports = new withModuleFederationPlugin({
  name: 'auth',

  exposes: {
    './Module': './src/app/auth/auth.module.ts',
  },

  shared: share({
    '@angular/core': {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    },
    '@angular/common': {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    },
    '@angular/router': {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    },
    '@ngrx/effects': {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    },
    '@ngrx/store': {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    },
    '@ngrx/store-devtools': {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    },
    '@ngrx/router-store': {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    },

    ...sharedMappings.getDescriptors(),
  }),
})
