import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../Context.js';
import { StyleSheet, Text, View, Button, ScrollView, Dimensions, Animated } from 'react-native';
import Pie from 'react-native-pie';
import { months } from '../Calendar/Dates.js';
import moment from 'moment';

const Charts = () => {
  const {
    page,
    setPage,
    chartShrink,
    chartUp,
    labelUp,
    weekProg,
    weekGoal,
    monthProg,
    monthGoal
  } = useContext(Context);

  const [monthClipped, setMonthClipped] = useState('');
  const [weekClipped, setWeekClipped] = useState('');

  useEffect(() => {
    const num = (100 * (monthProg/(monthGoal + 0.0001))).toString();
    let clipped = num;
    if (num.indexOf('.') >= 0) {
      clipped = num.substring(0, num.indexOf('.') + 2)
    }
    setMonthClipped(clipped);
  }, [monthProg])

  useEffect(() => {
    const num = (100 * (weekProg/(weekGoal + 0.0001))).toString();
    let clipped = num;
    if (num.indexOf('.') >= 0) {
      clipped = num.substring(0, num.indexOf('.') + 2)
    }
    setWeekClipped(clipped);
  }, [weekProg])

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
                percentage: 100 * (monthProg/(monthGoal + 0.0001)),
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
                percentage: 100 * (weekProg/(weekGoal + 0.0001)),
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
            width: Dimensions.get('window').width * 0.4,
            marginRight: Dimensions.get('window').width * 0.04,
            alignItems: 'center',
            transform: [
              {scale: chartShrink},
              {translateY: chartUp}
            ]
          }}
        >
          <Text style={styles.gaugeText}>{monthClipped}%</Text>
        </Animated.View>
        <Animated.View
          style={{
            width: Dimensions.get('window').width * 0.4,
            alignItems: 'center',
            marginLeft: Dimensions.get('window').width * 0.04,
            transform: [
              {scale: chartShrink},
              {translateY: chartUp}
            ]
          }}
        >
          <Text style={styles.gaugeText}>{weekClipped}%</Text>
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
          <Text style={styles.labelText}>{moment().startOf('week').format('MM/DD')} - {moment().endOf('week').format('MM/DD')}</Text>
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
    top: Dimensions.get('window').width * 0.17,
    alignSelf: 'center',

  },
  gaugeText: {
    fontSize: 25,
    color: 'white',
    fontFamily: 'Avenir-Medium'
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
    color: 'white',
    fontFamily: 'Avenir-Medium'
  },
  pies: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width * 0.9,
  }
});

export default Charts;