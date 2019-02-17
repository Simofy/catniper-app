import {
  Easing, Animated,
} from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import CatScreen from '../screens/CatScreen';

const transitionConfig = () => {
    return {
      transitionSpec: {
        duration: 750,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
        useNativeDriver: true,
      },
      screenInterpolator: sceneProps => {
          const { position, layout, scene, index } = sceneProps
          const toIndex = index
          const thisSceneIndex = scene.index
          const width = layout.initWidth
          const translateX = position.interpolate({
            inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
            outputRange: [toIndex > 0 ? width - 50 : width, 0, 0]
          })
          const slideFromRight = { transform: [{ translateX }] }
          return slideFromRight
        },
    }}



const  AppNavigator = handler => createAppContainer(createStackNavigator({
  Home: {
    screen:HomeScreen,
    params:{  },
  },
  Cat: {
    screen:CatScreen,
    params:{ },
  },

},
{
  initialRouteName: 'Home',
  transitionConfig,
}

));
export default AppNavigator;