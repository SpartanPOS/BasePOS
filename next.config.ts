const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

// const webpack = (config: Configuration, options: WebpackOptionsNormalized ): Configuration => {
//   const { isServer } = options;
//   config.plugins!.push(
//     new NextFederationPlugin({
//       name: 'MainModule',
//       library:  { type: config.output?.libraryTarget, name: 'MainModule'},
//       filename: 'static/runtime/remoteEntry.ts',
//       remotes: {},
//       exposes: {},
//       shared: {},
//       extraOptions: {
//         debug: isServer, // `false` by default
//         exposePages: isServer, // `false` by default
//         enableImageLoaderFix: isServer, // `false` by default
//         enableUrlLoaderFix: isServer, // `false` by default
//         skipSharingNextInternals: isServer, // `false` by default
//       },
//     })
//   );

//   return config;
// };

const ModuleManage = {
  // webpack(config: {isServer: boolean, plugins: Array<typeof NextFederationPlugin>}, options: Object) {
  //   config.plugins.push(
  //     new NextFederationPlugin({
  //       name: 'next2',
  //       filename: 'static/chunks/remoteEntry.js',
  //       exposes: {
  //       },
  //       shared: {
  //         // whatever else
  //       },
  //     }),
  //   );

  //   return config;
  // },
}

export default ModuleManage;