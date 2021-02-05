import React, { useContext, useState, useRef } from 'react';
import { Context } from '../Context.js';
import { StyleSheet, Text, View, Animated, Dimensions, TouchableOpacity } from 'react-native';

export default function App() {
  const {page, animateInfoSlider, infoSlider, setInfoSlider, animate} = useContext(Context);

  const [slider, setSlider] = useState(false);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        bottom: Dimensions.get('window').height * 0.05,
        transform: [
          {
            translateX: animate.interpolate({
            inputRange: [0, 1],
            outputRange: [-Dimensions.get('window').width, -Dimensions.get('window').width * 0.1],
            }),
          },
        ],
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').height * 0.9,
        alignItems: 'center',
        borderRadius: 14,
        backgroundColor: 'rgb(250, 250, 250)',
        shadowOffset: {width: 0, height: -20},
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowRadius: 18,
      }}
    >
      <View style={styles.optionsContainer}>
        <Text>Yipee</Text>
          <TouchableOpacity
            style={styles.close}
            onPress={() => {
              animateInfoSlider(true);
              setInfoSlider(false);
            }}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  close: {
    backgroundColor: 'rgb(220, 220, 220)',
    width: 120,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  closeText: {
    fontSize: 22,
  },
  optionsContainer: {
    marginTop: 100,
  },
});
