import React, { useContext, useRef } from 'react';
import { Context } from '../Context.js';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, Animated } from 'react-native';
import Goals from './Goals.js';
import Charts from './Charts.js';
import Calendar from '../Calendar/Calendar.js';
import Info from './Info.js';
import Svg, {Circle, Path} from 'react-native-svg';

const Main = () => {
  const {page, setPage, animate, svgShrink, svgMove, resetDates, setResetDates} = useContext(Context);

  const screenAnim = useRef(new Animated.Value(0)).current;

  const screenFlip = (pos) => {
    if (!pos) {
      setPage('calendar')
    } else {
      setPage('dashboard')
    }
    setResetDates(!resetDates);
    return Animated.parallel([
      Animated.timing(screenAnim, {
        toValue: pos ? 0 : 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <Animated.View
        style={{
          transform: [{
            translateX: screenAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -Dimensions.get('window').width],
            }),
          }]
        }}
      >
        <View style={styles.container}>
          <Animated.ScrollView
            style={styles.scrollContainer}
            onScroll={Animated.event(
              [{nativeEvent:
                {contentOffset:
                  {y: animate}
                }
              }],
              {useNativeDriver: true}
            )}
          >
            <Info screenFlip={screenFlip} />
            <Animated.View
              style={{
                transform: [
                  {translateY: svgMove}
                ]
              }}
            >
              <Goals />
            </Animated.View>
          </Animated.ScrollView>
        </View>
      </Animated.View>
      <Animated.View
        style={{
          transform: [{
            translateX: screenAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -Dimensions.get('window').width * 1],
            }),
          }]
        }}
      >
        <Calendar screenFlip={screenFlip} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'rgb(245, 245, 255)',
  },
  scrollContainer: {
    // alignItems: 'center',
  },
  svg: {
    alignSelf: 'center',
    marginTop: -20,
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