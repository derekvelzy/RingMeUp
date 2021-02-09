import React, { useEffect, useState, useContext, useRef } from 'react';
import { Context } from '../Context.js';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Modal,
  ScrollView,
  Animated,
  TextInput
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

const Popup = () => {
  const {user, popup, setPopup, setPage, resetDates, setResetDates} = useContext(Context);

  const [goals, setGoals] = useState([]);
  const [date, setDate] = useState('');
  const [newText, setNewText] = useState('');
  const [newQuant, setNewQuant] = useState('');
  const [err, setErr] = useState(false);

  const animate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (user) {
      return firestore()
        .collection('Users')
        .doc(user.email)
        .collection('Goals')
        .onSnapshot((querySnapshot) => {
          const t = [];
          let i = 0;
          querySnapshot.forEach((dox) => {
            i++;
            const dat = dox.data();
            if (dat.frequency === date) {
              let key = dox._ref._documentPath._parts[dox._ref._documentPath._parts.length - 1]
              t.push({path: key, text: dat.task})
            }
          });
          setGoals(t);
        });
    }
  }, [date])

  useEffect(() => {
    if (popup) {
      setDate(popup.date);
    }
  }, [popup])

  const remove = async (path) => {
    await firestore()
      .collection('Users')
      .doc(user.email)
      .collection('Goals')
      .doc(path)
      .delete();
    setPage('calendar');
    setResetDates(!resetDates);
  }

  const submit = async (type) => {
    setErr(false);
    let quantNum = Number.parseInt(newQuant);
    const today = moment().format('MM-DD-YYYY');
    if (newText === '' || !quantNum) {
      setErr(true);
    } else {
      await firestore()
        .collection('Users')
        .doc(user.email)
        .collection('Goals')
        .add({
          task: newText,
          progress: 0,
          quantity: quantNum,
          frequency: date,
        });
      slide(false);
    }
    setNewText('');
    setNewQuant('');
    setResetDates(!resetDates);
  }

  const slide = (pos) => {
    return Animated.parallel([
      Animated.timing(animate, {
        toValue: pos,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Modal
      style={styles.popup}
      animationType="slide"
      transparent={true}
      visible={!popup ? false : true}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Goals for {date}</Text>
        <ScrollView style={{maxHeight: 310}}>
          {goals.length === 0 ?
            <Text style={styles.noGoalText}>No goals for this date</Text> :
            <View>
              {goals.map((g) => {
                return (
                  <View style={styles.goal}>
                    <Text style={styles.goalText}>{g.text}</Text>
                    <TouchableOpacity
                      style={styles.remove}
                      onPress={() => remove(g.path)}
                    >
                      <Text style={styles.removeText}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                )
              })}
            </View>
          }
          <Animated.View
            style={{
              height: 250,
              transform: [{
                translateX: animate.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-Dimensions.get('window').width * 0.7, 0],
                }),
              }]
            }}
          >
            <View style={styles.addBox}>
              <View style={styles.left}>
                {err ? <Text style={styles.err}>Must enter valid goal and frequency</Text> : <Text style={styles.err}></Text>}
                <TextInput
                  value={newText}
                  style={styles.newText}
                  placeholder="Goal"
                  onChangeText={(e) => setNewText(e)}
                />
                <TextInput
                  value={newQuant}
                  style={styles.newFreqText}
                  placeholder="Frequency"
                  onChangeText={(e) => setNewQuant(e)}
                />
                <View style={styles.cancelAdd}>
                  <TouchableOpacity
                    style={styles.cancel}
                    onPress={() => {
                      slide(false);
                      setErr(false);
                    }}
                  >
                    <Text style={styles.cancelAddText}>cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.addGoal}
                    onPress={() => submit()}
                  >
                    <Text style={styles.cancelAddText}>Add</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.right}>
                <TouchableOpacity
                  style={styles.add}
                  onPress={() => slide(true)}
                >
                  <Text style={styles.removeText}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
        <TouchableOpacity
          style={styles.close}
          onPress={() => {
            setPopup(false);
            slide(false);
          }}
        >
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  add: {
    marginTop: 15,
    backgroundColor: 'rgb(6, 191, 166)',
    height: 40,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    alignSelf: 'flex-end',
  },
  addBox: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  addGoal: {
    backgroundColor: 'rgb(6, 191, 166)',
    height: 40,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  cancel: {
    backgroundColor: 'rgb(0, 0, 0)',
    height: 40,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  cancelAddText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Avenir Next'
  },
  cancelAdd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 180,
    alignSelf: 'center',
  },
  close: {
    position: 'absolute',
    backgroundColor: 'rgb(220, 220, 220)',
    width: 120,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    bottom: 40,
  },
  closeText: {
    fontSize: 22,
    fontFamily: 'Avenir Next'
  },
  container: {
    backgroundColor: 'white',
    marginTop: 130,
    marginLeft: Dimensions.get('window').width * 0.07,
    height: 480,
    width: Dimensions.get('window').width * 0.86,
    borderRadius: 36,
    alignItems: 'center',
    shadowOffset: {width: 0, height: -10},
    shadowColor: 'black',
    shadowOpacity: 0.4,
    shadowRadius: 20,
    padding: 30,
  },
  err: {
    color: 'red',
    fontSize: 16,
    height: 20,
    marginTop: 5,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Avenir-Medium'
  },
  goal: {
    flexDirection: 'row',
    height: 50,
    width: Dimensions.get('window').width * 0.7,
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goalText: {
    fontSize: 20,
    flexWrap: 'wrap',
    fontFamily: 'Avenir Next'
  },
  left: {
    justifyContent: 'center',
    width: Dimensions.get('window').width * 0.7,
  },
  right: {
    width: Dimensions.get('window').width * 0.7,
  },
  newFreqText: {
    borderColor: "rgb(220, 220, 220)",
    borderWidth: 1,
    width: Dimensions.get('window').width * 0.68,
    height: 56,
    borderRadius: 28,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 22,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 22,
    fontFamily: 'Avenir Next'
  },
  newText: {
    borderColor: "rgb(220, 220, 220)",
    borderWidth: 1,
    width: Dimensions.get('window').width * 0.68,
    height: 56,
    borderRadius: 28,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 22,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 22,
    marginTop: 5,
    fontFamily: 'Avenir Next'
  },
  noGoalText: {
    fontSize: 20,
    marginTop: 20,
    color: 'rgb(130, 130, 130)',
    marginLeft: Dimensions.get('window').width * 0.12,
    fontFamily: 'Avenir Next'
  },
  remove: {
    backgroundColor: 'rgb(255, 114, 110)',
    height: 40,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  removeText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Avenir Next'
  },
  popup: {
    backgroundColor: 'white',
  },
});

export default Popup;