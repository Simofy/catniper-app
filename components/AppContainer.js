import React from 'react';
import { Platform, StatusBar,Text, StyleSheet, View } from 'react-native';
import { AppLoading, Asset,  Font, Icon } from 'expo';
import AppNavigator from './../navigation/AppNavigator';

export default class AppContainer extends React.Component {

  render() {
    const AppNavigator_ = AppNavigator( (e) => this.handler(e));
    return (
    <View style={styles.container}>
        {/* <View style={styles.test}><Text>{this.state.path}</Text></View> */}
        <View style={styles.body}>
        <AppNavigator_ />
        </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gold',
  },
  test: {
    marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    height: 45,
    backgroundColor: '#333',
    fontSize: 14,
    alignItems: 'center',
    color:"white",
  },
  body: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
