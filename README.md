<p align="center">
  <img alt="stylehooks artwork" src="./readme-artwork.gif">
</p>

<h3 align="center" style="font-weight:600">

`react-native-stylehooks`

</h3>

<p align="center">
  Responsive React Native [Web] styles made simple.
</p>

---

<div align="center">

[![supports iOS](https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff)](https://github.com/expo/expo)
[![supports Android](https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff)](https://github.com/expo/expo)
[![supports web](https://img.shields.io/badge/web-4630EB.svg?style=flat-square&logo=GOOGLE-CHROME&labelColor=4285F4&logoColor=fff)](https://github.com/expo/expo)

</div>

## Getting Started

- Run `yarn add react-native-stylehooks` in your React Native [Web] app
- Use it similarly to the example shown below

```jsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native-stylehooks';

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

const useStyles = StyleSheet.create({
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
```
