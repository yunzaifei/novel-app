module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['import', { libraryName: '@ant-design/react-native' }],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        // alias: {
        //   screens: ['./src/screens'],
        // },
      },
    ],
  ],
};
