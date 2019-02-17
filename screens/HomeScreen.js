import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  StatusBar,
  View,
  ListView,
  Dimensions,
  Picker,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import { WebBrowser } from 'expo';
import {AsyncStorage} from 'react-native';
import { Header } from '../components/TabHeader';
import Cat_names from './../assets/names/data';
import { processImages, buildRows, normalizeRows } from '../components/utils';
import GridItem from '../components/GridItem';

const maxWidth = Dimensions.get('window').width;

export default class HomeScreen extends React.Component {
  Grid = props => {
    return props.loading ? <View /> : <ListView dataSource={props.data} renderRow={props.row}/>;
  }
  Input = props =>{
    if(!props.visable) return <View />
    return(
      <TouchableWithoutFeedback onPress={(event)=>{this.setState({inputVisable:false,})}}>
        <View style={styles.input}>
          <TextInput autoFocus={true} style={styles.input_field} onChangeText={(text) => this.setState({text})}
          value={this.state.text} maxLength={2} keyboardType="numeric" onEndEditing = {(value) =>{
            this.setState({
              gridSize:"custom",
              custom: value.nativeEvent.text,
              inputVisable:false,
              text:"",
            }, () => {
              AsyncStorage.setItem("@store:total_items", this.state.custom.toString())
            })
            this.refreshGrid(value.nativeEvent.text)
          }}
          />
      </View>
    </TouchableWithoutFeedback>
    )
  }
  state = {
    barOffset:0,
    barFinish:false,
    gridSize:0,
    custom:0,
    cats:[],
    updating:true,
    inputVisable:false,
  };
  loadData = (cats) =>{
    this.setState({
      cats: cats
    }, () => {
      const processedImages = processImages(this.state.cats);
      let rows = buildRows(processedImages, maxWidth);
      rows = normalizeRows(rows, maxWidth);
      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      });
      this.setState({
        cats: ds.cloneWithRows(rows),
        updating:false,
      });
    });
  }
  async refreshGrid(total) {
    try {
      let cats = await AsyncStorage.getItem('@store:cats');
      cats = cats ? JSON.parse(cats) : [];
      let initialSize = cats.length;
      this.setState({
        updating: true
      })
      if (initialSize == total) {
        this.loadData(cats)
      } else {
        //_________________________________
        /*
        *Image generation porton
        */
        //_________________________________
        for (let i = cats.length; i < total; i++) {
          let w = 100 + Math.floor(Math.random() * 300);
          let h = 100 + Math.floor(Math.random() * 300);
          let img = Math.floor(Math.random() * 16);
          cats.push({
            id: i,
            width: w,
            height: h,
            title: Cat_names[Math.floor(Math.random()*Cat_names.length)],
            source: {
              uri: 'http://placekitten.com/' + w + '/' + h + '?image=' + img,
              cache: 'force-cache'
            }
          })
        }
        //_________________________________
        if (initialSize < cats.length) {
          AsyncStorage.setItem('@store:cats', JSON.stringify(cats));
          this.loadData(cats)
        } else {
          cats = cats.slice(0, total);
          this.loadData(cats)
        }

      }
    } catch (error) {

    }
    
  }

  static navigationOptions = {
    header: <Header screenName = "Gallery"/>,
  };

  componentWillMount = () => {
    //Initial check for storage
      AsyncStorage.getItem('@store:total_items', (error, result) => {
        if(result === null)AsyncStorage.setItem('@store:total_items', '30');
        value = result ? result : 30;
        if(value == 30 || value == 50 || value == 100){
          this.setState({gridSize:value})
        }else{
          this.setState({gridSize:"custom", custom:value})
        }
        this.refreshGrid(value)
    });
  }

  renderRow = (onPhotoOpen, row) =>
    <View style={styles.row}>
      {row.map(item =>
        <GridItem item={item} style = {{width:item.width, height:item.height}} key={item.id} onPhotoOpen={onPhotoOpen} />
      )}
    </View>;

  open = photo => {
    this.props.navigation.navigate('Cat', { photo: photo, })
  };

  render() {
    const {gridSize} = this.state;
    return (
      <View style={styles.container}>
        <this.Input visable={this.state.inputVisable}/>
        <View style={{...styles.bar, transform: [{translateY:this.state.barOffset}],}}>
          <Picker
          prompt='Grid size'
          selectedValue={gridSize}
          style={{height: 35,width:100, color:"white"}}
          onValueChange={(itemValue, itemIndex) =>{
              if(itemValue != "custom"){
                this.setState({gridSize: itemValue}, ()=>{
                  AsyncStorage.setItem("@store:total_items", itemValue.toString())
                  this.refreshGrid(itemValue)
                })  
              }else
                this.setState({inputVisable:true})
            }}>
            <Picker.Item color="black" label="30" value={30} />
            <Picker.Item color="black" label="50" value={50} />
            <Picker.Item color="black" label="100" value={100} />
            <Picker.Item color="black" label={"custom(" +this.state.custom.toString()+")"} value="custom" />
          </Picker>
        </View>
        <ScrollView style={styles.container} contentContainerStyle={[styles.contentContainer, styles.scroll]}
          onScroll={(event)=>{
            let vel = -event.nativeEvent.velocity.y * 2 + this.state.barOffset;
            if (vel > 0) vel = 0;
            if(vel < -35) vel = -35;
            this.setState({
              barOffset: vel,
              barFinish: event.nativeEvent.velocity.y < 0
            })
          }} onScrollEndDrag={()=>{
            if(this.state.barFinish)
            this.setState({
              barOffset: 0,
            }) 
          }}>
          <this.Grid loading = {this.state.updating} data = {this.state.cats} row = {this.renderRow.bind(this, this.open)}/>
        </ScrollView>
      </View>
    );
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
  row:{
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'space-between',
  },
  input_field: {
    height: 40,
    width: maxWidth / 2,
    borderColor: 'gray',
    backgroundColor: "white",
    borderWidth: 1
  },
  input: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 20
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll:{
    marginTop: 35,
  },
  bar: {
    width: maxWidth,
    height: 35,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: "absolute",
    backgroundColor: "#8e1ebc",
    zIndex: 5,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  test: {
    marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    height: 45,
    backgroundColor: '#333',
    fontSize: 14,
    alignItems: 'center',
    color:"white",
  },
  contentContainer: {
    paddingTop: 0,
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
