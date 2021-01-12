import React from 'react';
import NavigatorView from 'screens/Navigator';
import { Provider } from '@ant-design/react-native';
import theme from 'styles/theme';

const App = () => {
  return (
    <Provider theme={theme}>
      <NavigatorView />
    </Provider>
  );
};
export default App;
