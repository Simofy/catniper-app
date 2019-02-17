import React from 'react';
import { Platform, StatusBar,Text, StyleSheet, View } from 'react-native';
import { AppLoading, Asset,  Font, Icon } from 'expo';
import AppContainer from './components/AppContainer';
export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };
  constructor(props) {
    super(props)
  }
 
  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <View style={styles.body}>
            <AppContainer></AppContainer>
          </View>
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
      ]),
      Font.loadAsync({
        ...Icon.Ionicons.font,
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
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
