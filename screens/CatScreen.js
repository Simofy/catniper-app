import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import { Header } from '../components/TabHeader';

export default class CatScreen extends React.Component {
  constructor(props){
    super(props)
  }
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;
    return {
      header: <Header screenName = "Cat" navigation = {navigation} navigate={"Back"}/>,
    };
  };
    states = {header_offset: 0};
    render() {
      const {navigate,  state} = this.props.navigation;
      const photo  = state.params.photo;
        return (
        <View style={styles.container}>
          <Image
          source={photo.source}
          style={{
            flex:1,
          } }/>
        <View style={{ justifyContent: 'center', alignItems: 'center',  backgroundColor:"#f3f3f3",  borderColor:"#8e1ebc",borderRadius:1,borderStyle:"dashed", borderWidth:1}}>
          <Text style={{color:"#333", textAlign:"center",fontSize:36 }}>{photo.title}</Text>
        </View>  
        <View style={{flex:1, backgroundColor:"white", padding:15,}}>
          <Text style={{fontWeight:"bold",marginLeft:5,}}>Lorem Ipsum</Text>
          <Text style={{textAlign:"justify",}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In egestas nisl pretium malesuada mattis. Etiam porta maximus porttitor. Maecenas eu molestie tortor. Ut condimentum aliquet quam. Quisque vestibulum, lacus non lacinia tincidunt, diam nisl pharetra nisl, sed </Text>
        </View>
        </View>)
    }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
