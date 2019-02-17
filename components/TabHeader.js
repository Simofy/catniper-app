import React from 'react';
import {
  Platform,
  StatusBar,
  Text,
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';
import { MaterialCommunityIcons as Icon} from '@expo/vector-icons';

function Back(props) {
  const {navigation, navigate} = props.props;
  if (navigation && navigate) {
    return( <TouchableOpacity style={styles.back} onPress={() => { navigation.goBack() }}>
    <View>
      <Icon name="chevron-left" size={36} color="white" />
    </View>
</TouchableOpacity>)
  }else{
    return (
      <View style={styles.back}>
        <Icon name="cat" size={42} color="white" />
      </View>);
  }
}

export class Header extends React.Component {
  render() {
    
    return (
      <View style={{
          ...styles.header,}}>
      <Back props = {this.props}></Back>

      <Text style={styles.text}>{this.props.screenName}</Text>
    </View>

    );
  }
}

const styles = StyleSheet.create({
  header: {
    marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    height: 50,
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#a21ebc',
    zIndex:10,
  },
  back: {
    height: 50,
    width:50,
    position:"absolute",
    top:0,
    left:0,
    justifyContent: 'center', 
    alignItems: 'center',
    
  },
  text:{
    color:"white",
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  container: {
    height:20,
    paddingTop: 15,
    position:"absolute",
    top:0,
    backgroundColor: "#fff"
  },
});
