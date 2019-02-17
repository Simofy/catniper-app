import React from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
  Image,
  Text,
} from 'react-native';

export default class GridItem extends React.Component {
state = {
  opacity: new Animated.Value(1),
  clickable:false,
  waiting:true,
  error:false,
}
render(){
  const { item, onPhotoOpen } = this.props;
  const { opacity, error } = this.state;
  return(
    <TouchableOpacity  onPress={() => {
      if(onPhotoOpen && this.state.clickable)
        onPhotoOpen(item)
    }} activeOpacity={0.7}>
    <View style={{ backgroundColor:"#a21ebc", borderRadius:5,}}>
      <Text style={{position:"absolute", bottom:0,}}>{item.title}</Text>
      <Image
      onError = {() => {
        this.setState({error:true,waiting:false,})
      }}
      onLoad = {() => {
        this.setState({waiting:false, clickable:true,})
        Animated.timing(this.state.opacity, {
          toValue: 0,
          timing: Animated.timing,
          duration: 400,
        }).start(() => {
        });
      }}
      style={{...this.props.style, 
        borderRadius:5,
        borderWidth:1, borderRadius:5, borderColor:"#a21ebc",
    }}
      source={item.source}
        />
    <Animated.View  style={{...this.props.style, borderWidth:1, borderRadius:5,borderStyle:"dashed", borderColor:"#d3d3d3", 
    backgroundColor:this.state.opacity.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(243, 243, 243, 0.0)', 'rgba(243, 243, 243, 1.0)']
    }),
    justifyContent: 'center', alignItems: 'center', position:"absolute", flex:1}}>
    <Text style={{opacity:error?1:0, color:"white", textAlign:"center"}}>Ops... It's seems there is no internet conection</Text>
      <ActivityIndicator style={{position:"absolute"}} size="large" color="#ff87fb" animating={this.state.waiting }/>
    </Animated.View>
    </View>
  </TouchableOpacity >
  )
}
}
