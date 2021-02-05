import React, { useContext } from 'react';
import { Context } from '../Context.js';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';

const Goal = ({text, day, progress, quantity, frequency, path}) => {
  const {user, page, setPage, animate, weekGoal, weekProg, monthGoal, monthProg} = useContext(Context);

  const add = () => {
    let sum = 1;
    if (frequency === 'weekly') {
      sum = 5;
    } else if (frequency === 'monthly') {
      sum = 10;
    }
    if (progress < quantity) {
      firestore()
        .collection('Users')
        .doc(user.email)
        .collection('Goals')
        .doc(path)
        .set({
          task: text,
          progress: progress + 1,
          quantity,
          frequency,
        })
      if (progress + 1 === quantity) {
        if (frequency === 'daily') {
          firestore()
            .collection('Users')
            .doc(user.email)
            .collection('Progress')
            .doc('Week')
            .set({
              goal: weekGoal,
              progress: weekProg + 1,
            });
          firestore()
            .collection('Users')
            .doc(user.email)
            .collection('Progress')
            .doc('Month')
            .set({
              goal: monthGoal,
              progress: monthProg + 1,
            });
        } else if (frequency === 'weekly') {

        } else if (frequency === 'monthly') {

        }
      }
    }
  }

  const subtract = () => {
    if (progress > 0) {
      firestore()
        .collection('Users')
        .doc(user.email)
        .collection('Goals')
        .doc(path)
        .set({
          task: text,
          progress: progress - 1,
          quantity,
          frequency,
        })
      }
  }

  return (
    <Animated.View
      style={{
        transform: [
          {scale:
            animate.interpolate({
              inputRange: [12 * (day * 2.5 || 1), 28 * (day * 2 || 1)],
              outputRange: [0.87, 1],
              extrapolate: 'clamp',
            })
          },
        ]
      }}
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.edit}>
          <Icon name="ellipsis-v" size={30} color="rgb(220, 220, 220)" />
        </TouchableOpacity>
        <View style={styles.textandstatus}>
          <View style={styles.textBox}>
            <Text style={styles.text}>{text}</Text>
          </View>
          <View style={styles.status}>
            <View style={{
              backgroundColor:"rgb(6, 191, 166)",
              height: 10,
              width: Dimensions.get('window').width * 0.4 * (progress/quantity),
              borderRadius: 5
            }} />
          </View>
        </View>
        <View style={styles.plusminus}>
          <TouchableOpacity
            style={styles.check}
            onPress={() => subtract()}
          >
            <Icon name="minus-circle" size={50} color="rgb(220, 220, 220)" />
          </TouchableOpacity>
          <Text>{progress}</Text>
          <TouchableOpacity
            style={styles.check}
            onPress={() => add()}
          >
            <Icon name="plus-circle" size={50} color="rgb(6, 191, 166)" />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  check : {
    marginLeft: 5,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  container: {
    width: Dimensions.get('window').width * 0.88,
    // height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 12,
    marginTop: 14,
    marginBottom: 14,
    borderRadius: 35,
    shadowOffset: {width: 0, height: -10},
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowRadius: 15,
  },
  edit : {
    height: 50,
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  plusminus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 5,
  },
  status: {
    backgroundColor: "rgb(220, 220, 220)",
    height: 10,
    borderRadius: 5,
    marginTop: 10,
    width: Dimensions.get('window').width * 0.4,
  },
  text: {
    lineHeight: 28,
    fontSize: 20,
    flexWrap: 'wrap',
  },
  textBox: {
    maxWidth: Dimensions.get('window').width * 0.4,
  },
  textandstatus: {
    maxWidth: Dimensions.get('window').width * 0.50,
  }
});

export default Goal;