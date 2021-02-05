import React, { useContext } from 'react';
import { Context } from '../Context.js';
import { StyleSheet, Text, View, Button, ScrollView, Dimensions, Animated } from 'react-native';
import Pie from 'react-native-pie';
import { months } from '../Calendar/Dates.js';

const Charts = () => {
  const {page, setPage, chartShrink, chartUp, labelUp} = useContext(Context);

  return (
    <View style={styles.container}>
      <View style={styles.pies}>
        <Animated.View
          style={{
            transform: [
              {scale: chartShrink},
              {translateY: chartUp}
            ],
            shadowOffset: {width: 0, height: 0},
            shadowColor: 'rgb(51, 255, 214)',
            shadowOpacity: 0.7,
            shadowRadius: 10,
          }}
        >
          <Pie
            radius={Dimensions.get('window').width * 0.21}
            innerRadius={Dimensions.get('window').width * 0.19}
            sections={[
              {
                percentage: 70,
                color: 'rgb(6, 191, 166)',
              },
            ]}
            backgroundColor="rgb(240, 242, 242)"
          />
        </Animated.View>
        <Animated.View
          style={{
            transform: [
              {scale: chartShrink},
              {translateY: chartUp}
            ],
            shadowOffset: {width: 0, height: 0},
            shadowColor: 'rgb(51, 255, 214)',
            shadowOpacity: 0.7,
            shadowRadius: 10,
          }}
        >
          <Pie
            radius={Dimensions.get('window').width * 0.21}
            innerRadius={Dimensions.get('window').width * 0.19}
            sections={[
              {
                percentage: 40,
                color: 'rgb(6, 191, 166)',
              },
            ]}
            backgroundColor="rgb(240, 242, 242)"
          />
        </Animated.View>
      </View>
      <View style={styles.gauge}>
        <Animated.View
          style={{
            marginLeft: Dimensions.get('window').width * 0.19,
            transform: [
              {scale: chartShrink},
              {translateY: chartUp}
            ]
          }}
        >
          <Text style={styles.gaugeText}>70%</Text>
        </Animated.View>
        <Animated.View
          style={{
            marginRight: Dimensions.get('window').width * 0.18,
            transform: [
              {scale: chartShrink},
              {translateY: chartUp}
            ]
          }}
        >
          <Text style={styles.gaugeText}>40%</Text>
        </Animated.View>
      </View>
      <View style={styles.labels}>
        <Animated.View
          style={{
            marginLeft: Dimensions.get('window').width * 0.09,
            transform: [
              {scale: chartShrink},
              {translateY: labelUp}
            ]
          }}
        >
          <Text style={styles.labelText}>{months[new Date().getMonth()]} {new Date().getFullYear()}</Text>
        </Animated.View>
        <Animated.View
          style={{
            marginRight: Dimensions.get('window').width * 0.09,
            transform: [
              {scale: chartShrink},
              {translateY: labelUp}
            ]
          }}
        >
          <Text style={styles.labelText}>03/07 - 03/13</Text>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginBottom: 45,
    backgroundColor: 'rgb(130, 217, 176)',
  },
  gauge: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: Dimensions.get('window').width * 0.165,
    width: Dimensions.get('window').width,
    alignSelf: 'center',

  },
  gaugeText: {
    fontSize: 30,
    color: 'white'
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width,
    marginTop: 20,
    marginBottom: -20,
    alignSelf: 'center',
  },
  labelText: {
    fontSize: 22,
    color: 'white'
  },
  pies: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width * 0.9,
  }
});

export default Charts;