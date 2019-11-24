import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { View, Text } from 'react-native';
import { Stylehooks } from '../';

function App() {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, Stylehooks</Text>
    </View>
  );
}

const breakpoints = {
  tablet: 1024,
  mobile: 400,
};

const useStyles = Stylehooks.create({
  container: ({ window: { width } }) => {
    return {
      flex: 1,
      justifyContent: 'center',
      height: '100vh',
      alignItems: 'center',
      backgroundColor: width <= breakpoints.tablet ? '#4630eb' : '#000020',
      borderColor: width <= breakpoints.mobile ? '#decd50' : '#93d9de',
      borderWidth: 8,
    };
  },
  text: _ => {
    return { color: 'white', fontSize: 32 };
  },
});

ReactDOM.render(<App />, document.getElementById('root'));
