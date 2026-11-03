import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Header } from './src/components';

const App = () => {
  return (
    <View style={styles.container}>
      <Header />
    </View>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
});

export default App;
