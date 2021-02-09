import React, { useContext, useRef, useEffect } from 'react';
import { Context } from '../Context.js';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, Animated } from 'react-native';
import Svg, {Circle, Path} from 'react-native-svg';
import Login from './Login.js';
import Signup from './Signup.js';

const Main = () => {
  const {page, setPage, svgMove} = useContext(Context);

  const screenAnim = useRef(new Animated.Value(0)).current;

  const screenFlipLogin = (pos, speed) => {
    speed = speed || 550
    return Animated.parallel([
      Animated.timing(screenAnim, {
        toValue: pos,
        duration: speed,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const buttonMove = () => {

  };

  useEffect(() => {
    screenFlipLogin(1, 1)
  }, [])

  return (
    <View>
       <Animated.View
        style={{
          height: Dimensions.get('window').height,
          transform: [{
            translateY: screenAnim.interpolate({
              inputRange: [-1, 0],
              outputRange: [Dimensions.get('window').height, 0],
            }),
          }]
        }}
      >
        <Signup screenFlipLogin={screenFlipLogin} />
      </Animated.View>
      <Animated.View
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
          transform: [{
            translateY: screenAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -Dimensions.get('window').height],
            }),
          }]
        }}
      >
        <Animated.View
          style={{
            transform: [{
              translateY: screenAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-Dimensions.get('window').width * 0.25, 0],
              }),
            }]
          }}
        >
          <View style={styles.fill}>
            <Text style={styles.title}>Ring Me Up</Text>
            <Animated.View
              style={{
                height: Dimensions.get('window').height,
                transform: [{
                  translateX: screenAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-Dimensions.get('window').width * 0.5, 0],
                  }),
                }]
              }}
            >
              <TouchableOpacity
                style={styles.signup}
                onPress={() => screenFlipLogin(0)}
              >
                <Text style={styles.signupText}>Signup</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Animated.View>
        <Animated.View
          style={{
            height: Dimensions.get('window').height,
            transform: [{
              translateX: screenAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [Dimensions.get('window').width * 0.5, 0],
              }),
            }]
          }}
        >
          <TouchableOpacity
            style={styles.login}
            onPress={() => screenFlipLogin(2)}
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
      <Animated.View
        style={{
          height: Dimensions.get('window').height,
          transform: [{
            translateY: screenAnim.interpolate({
              inputRange: [1, 2],
              outputRange: [-Dimensions.get('window').height, -Dimensions.get('window').height * 2],
            }),
          }]
        }}
      >
        <Login screenFlipLogin={screenFlipLogin} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: {
    alignItems: 'center',
    backgroundColor: 'rgb(130, 217, 176)',
    height: Dimensions.get('window').height * 0.5
  },
  signup: {
    marginTop: Dimensions.get('window').height * 0.07,
    backgroundColor: 'rgb(250, 250, 250)',
    height: Dimensions.get('window').height * 0.15,
    width: Dimensions.get('window').height * 0.15,
    borderRadius: Dimensions.get('window').height * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupText: {
    fontFamily: 'Avenir Next',
    fontSize: Dimensions.get('window').height * 0.03,
  },
  login: {
    alignSelf: 'center',
    marginTop: Dimensions.get('window').height * 0.02,
    backgroundColor: 'rgb(130, 217, 176)',
    height: Dimensions.get('window').height * 0.15,
    width: Dimensions.get('window').height * 0.15,
    borderRadius: Dimensions.get('window').height * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    fontFamily: 'Avenir Next',
    fontSize: Dimensions.get('window').height * 0.03,
    color: 'white',
  },
  svg: {
    position: 'absolute',
    zIndex: -1,
    marginTop: -100,
  },
  title: {
    fontFamily: 'Avenir-Medium',
    color: 'white',
    marginTop: Dimensions.get('window').height * 0.2,
    fontSize: Dimensions.get('window').height * 0.05,
  },
  viewCal: {
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 22,
    width: 140,
    alignItems: 'center',
  }
});

export default Main;