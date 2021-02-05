import React, { useContext, useRef } from 'react';
import { Context } from '../Context.js';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Animated } from 'react-native';
import Charts from './Charts.js';
import Svg, {Circle, Path} from 'react-native-svg';

const Info = ({screenFlip}) => {
  const {page, setPage, animate, svgShrink, svgMove} = useContext(Context);

  return (
    <View>
      <View style={styles.circle}>
        <TouchableOpacity
          onPress={() => screenFlip(false)}
          style={styles.viewCal}
        >
          <Text>View Calendar</Text>
        </TouchableOpacity>
        <Charts />
      </View>
      <Animated.View style={{
        zIndex: -1,
        transform: [
          {scaleY: svgShrink},
          {translateY: svgMove}
        ]
      }}>
        <Svg style={styles.svg} width={Dimensions.get('window').width} height="100" viewBox={`0 0 1800 220`}>
          <Path
            fill="rgb(130, 217, 176)"
            d="M0,0
              L0,220
              Q900,440 1800,220
              L1800,0
              Z" />
        </Svg>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    backgroundColor: 'rgb(130, 217, 176)',
    width: Dimensions.get('window').width,
    paddingTop: 300,
    marginTop: -300,
    alignItems: 'center',
  },
  svg: {
    alignSelf: 'center',
    marginTop: -34,
    left: 0,
    right: 0,
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

export default Info;