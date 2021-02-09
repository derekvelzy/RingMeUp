import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../Context.js';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Animated, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

const Goal = ({text, day, progress, quantity, frequency, path}) => {
  const {user, page, setPage, animate, weekGoal, weekProg, monthGoal, monthProg} = useContext(Context);

  const [edit, setEdit] = useState(false);
  const [editText, setEditText] = useState(text);

  useEffect(() => {
    if (user) {
      dailyUpdate();
      weeklyUpdate();
      monthlyUpdate();
    }
  }, [user]);

  const dailyUpdate = async () => {
    if (frequency === 'daily') {
      const today = moment().format('MM-DD-YYYY');
      let prevDate = await firestore()
        .collection('Users')
        .doc(user.email)
        .collection('Date')
        .doc('Day')
        .get();
      if (prevDate._data.time !== today) {
        firestore()
          .collection('Users')
          .doc(user.email)
          .collection('Goals')
          .doc(path)
          .set({
            task: text,
            progress: 0,
            quantity,
            frequency,
          })
        firestore()
          .collection('Users')
          .doc(user.email)
          .collection('Date')
          .doc('Day')
          .set({time: today})
      }
    }
  }

  const weeklyUpdate = async () => {
    if (frequency === 'weekly') {
      const startWeek = moment().startOf('week').format('MM-DD-YYYY');
      let prevDate = await firestore()
        .collection('Users')
        .doc(user.email)
        .collection('Date')
        .doc('Week')
        .get();
      if (prevDate._data.time !== startWeek) {
        firestore()
          .collection('Users')
          .doc(user.email)
          .collection('Goals')
          .doc(path)
          .set({
            task: text,
            progress: 0,
            quantity,
            frequency,
          })
        firestore()
          .collection('Users')
          .doc(user.email)
          .collection('Date')
          .doc('Week')
          .set({time: startWeek})
        firestore()
          .collection('Users')
          .doc(user.email)
          .collection('Progress')
          .doc('Week')
          .set({
            goal: weekGoal,
            progress: 0,
          })
      }
    }
  }

  const monthlyUpdate = async () => {
    if (frequency === 'monthly') {
      const startMonth = moment().startOf('month').format('M');
      let prevDate = await firestore()
        .collection('Users')
        .doc(user.email)
        .collection('Date')
        .doc('Month')
        .get();
      if (prevDate._data.time !== startMonth) {
        firestore()
          .collection('Users')
          .doc(user.email)
          .collection('Goals')
          .doc(path)
          .set({
            task: text,
            progress: 0,
            quantity,
            frequency,
          })
        firestore()
          .collection('Users')
          .doc(user.email)
          .collection('Date')
          .doc('Month')
          .set({time: startMonth})
        firestore()
          .collection('Users')
          .doc(user.email)
          .collection('Progress')
          .doc('Month')
          .set({
            goal: monthGoal,
            progress: 0,
          })
      }
    }
  }

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
          firestore()
            .collection('Users')
            .doc(user.email)
            .collection('Progress')
            .doc('Week')
            .set({
              goal: weekGoal,
              progress: weekProg + 5,
            });
        } else if (frequency === 'monthly') {
          firestore()
            .collection('Users')
            .doc(user.email)
            .collection('Progress')
            .doc('Month')
            .set({
              goal: monthGoal,
              progress: monthProg + 10,
            });
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
      if (progress === quantity) {
        if (frequency === 'daily') {
          firestore()
            .collection('Users')
            .doc(user.email)
            .collection('Progress')
            .doc('Week')
            .set({
              goal: weekGoal,
              progress: weekProg - 1,
            });
          firestore()
            .collection('Users')
            .doc(user.email)
            .collection('Progress')
            .doc('Month')
            .set({
              goal: monthGoal,
              progress: monthProg - 1,
            });
        } else if (frequency === 'weekly') {
          firestore()
            .collection('Users')
            .doc(user.email)
            .collection('Progress')
            .doc('Week')
            .set({
              goal: weekGoal,
              progress: weekProg - 5,
            });
        } else if (frequency === 'monthly') {
          firestore()
            .collection('Users')
            .doc(user.email)
            .collection('Progress')
            .doc('Month')
            .set({
              goal: monthGoal,
              progress: monthProg - 10,
            });
        }
      }
    }
  }

  const remove = () => {
    const weekDiff = moment().endOf('week').diff(moment(), 'days');
    const monthDiff = moment().endOf('month').diff(moment(), 'days');
    if (frequency === 'daily') {
      let prog = 0;
      if (progress === quantity) {
        prog = 1;
      }
      firestore()
        .collection('Users')
        .doc(user.email)
        .collection('Progress')
        .doc('Week')
        .set({
          goal: weekGoal - (weekDiff + 1),
          progress: weekProg - prog,
        });
      firestore()
        .collection('Users')
        .doc(user.email)
        .collection('Progress')
        .doc('Month')
        .set({
          goal: monthGoal - (monthDiff + 1),
          progress: monthProg - prog,
        });
      firestore()
        .collection('Users')
        .doc(user.email)
        .collection('Goals')
        .doc(path)
        .delete();
    } else if (frequency === 'weekly') {
      let prog = 0;
      if (progress === quantity) {
        prog = 5;
      }
      firestore()
        .collection('Users')
        .doc(user.email)
        .collection('Progress')
        .doc('Week')
        .set({
          goal: weekGoal - 5,
          progress: weekProg - prog,
        });
      firestore()
        .collection('Users')
        .doc(user.email)
        .collection('Goals')
        .doc(path)
        .delete();
    } else if (frequency === 'monthly') {
      let prog = 0;
      if (progress === quantity) {
        prog = 10;
      }
      firestore()
        .collection('Users')
        .doc(user.email)
        .collection('Progress')
        .doc('Month')
        .set({
          goal: monthGoal - 10,
          progress: monthProg - prog,
        });
      firestore()
        .collection('Users')
        .doc(user.email)
        .collection('Goals')
        .doc(path)
        .delete();
    } else {
      firestore()
        .collection('Users')
        .doc(user.email)
        .collection('Goals')
        .doc(path)
        .delete();
    }
  }

  const save = () => {
    firestore()
      .collection('Users')
      .doc(user.email)
      .collection('Goals')
      .doc(path)
      .set({
        task: editText,
        progress,
        quantity,
        frequency,
      })
    setEdit(false);
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
      <View style={{
         shadowOffset: {width: 0, height: 0},
         shadowColor: progress === quantity ? 'rgb(6, 191, 166)' : 'black',
         shadowOpacity: progress === quantity ? 0.7 : 0.15,
         shadowRadius: progress === quantity ? 20 : 15,
      }}>
        {edit ?
          (
            <View style={styles.box}>
              <TouchableOpacity
                style={styles.edit}
                onPress={() => setEdit(false)}
              >
                <Icon name="ellipsis-v" size={30} color="rgb(220, 220, 220)" />
              </TouchableOpacity>
              <TextInput
                value={editText}
                placeholder="change"
                style={styles.editInput}
                onChangeText={(e) => setEditText(e)}
              />
              <View style={styles.plusminus}>
                <TouchableOpacity
                  style={styles.check}
                  onPress={() => remove()}
                >
                  <Icon name="times-circle" size={50} color="rgb(255, 114, 110)" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.check}
                  onPress={() => save()}
                >
                  <Icon name="check-circle" size={50} color="rgb(6, 191, 166)" />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.box}>
              <TouchableOpacity
                style={styles.edit}
                onPress={() => setEdit(true)}
              >
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
                <Text style={styles.progress}>{progress}</Text>
                <TouchableOpacity
                  style={styles.check}
                  onPress={() => add()}
                >
                  <Icon name="plus-circle" size={50} color="rgb(6, 191, 166)" />
                </TouchableOpacity>
              </View>
            </View>
          )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  box: {
    width: Dimensions.get('window').width * 0.88,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 12,
    marginTop: 14,
    marginBottom: 14,
    borderRadius: 35,
  },
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
    shadowOffset: {width: 0, height: 10},
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowRadius: 15,
  },
  edit: {
    height: 50,
    marginLeft: 20,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  editInput: {
    position: 'absolute',
    borderWidth: 1,
    left: 60,
    height: 46,
    borderRadius: 23,
    width: Dimensions.get('window').width * 0.4,
    paddingLeft: 10,
    fontSize: 18,
    borderColor: 'rgb(200, 200, 200)',
    fontFamily: 'Avenir Next'
  },
  plusminus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 5,
  },
  progress: {
    alignSelf: 'center',
    margin: 2
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
    fontFamily: 'Avenir Next'
  },
  textBox: {
    maxWidth: Dimensions.get('window').width * 0.4,
  },
  textandstatus: {
    maxWidth: Dimensions.get('window').width * 0.50,
  }
});

export default Goal;