import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../Context.js';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Modal,
  TextInput,
  Picker
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

const NewGoal = () => {
  const {user, newGoalMod, setNewGoalMod, weekGoal, weekProg, monthGoal, monthProg, setResetDates} = useContext(Context);

  const [goal, setGoal] = useState('');
  const [quant, setQuant] = useState('');
  const [goalErr, setGoalErr] = useState(false);
  const [quantErr, setQuantErr] = useState(false);

  const restOfDays = () => {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const allDays = new Date(year, month, 0).getDate();
    const today = new Date().getDate();
    return allDays - today + 1;
  }

  const submit = async () => {
    setResetDates(true);
    setGoalErr(false);
    setQuantErr(false);
    let tod = moment(new Date());
    let end = moment().endOf('week');
    let restOfWeek = end.diff(tod, 'days') + 1;
    let restOfMonth = restOfDays();
    let quantNum = Number.parseInt(quant);
    const today = moment().format('MM-DD-YYYY');
    if (goal === '') {
      setGoalErr(true);
    } else if (!quantNum) {
      setQuantErr(true);
    } else {
      if (newGoalMod === 'Today') {
        firestore()
          .collection('Users')
          .doc(user.email)
          .collection('Goals')
          .add({
            task: goal,
            progress: 0,
            quantity: quantNum,
            frequency: today,
          });
      } else {
        firestore()
          .collection('Users')
          .doc(user.email)
          .collection('Goals')
          .add({
            task: goal,
            progress: 0,
            quantity: quantNum,
            frequency: newGoalMod.toLowerCase(),
          });
      }
      if (newGoalMod === 'Daily') {
        firestore()
          .collection('Users')
          .doc(user.email)
          .collection('Progress')
          .doc('Month')
          .set({
            goal: monthGoal + restOfMonth,
            progress: monthProg,
          });
        firestore()
          .collection('Users')
          .doc(user.email)
          .collection('Progress')
          .doc('Week')
          .set({
            goal: weekGoal + restOfWeek,
            progress: weekProg,
          })
      } else if (newGoalMod === 'Weekly') {
        firestore()
          .collection('Users')
          .doc(user.email)
          .collection('Progress')
          .doc('Week')
          .set({
            goal: weekGoal + 5,
            progress: weekProg,
          })
      } else if (newGoalMod === 'Monthly') {
        firestore()
          .collection('Users')
          .doc(user.email)
          .collection('Progress')
          .doc('Month')
          .set({
            goal: monthGoal + 10,
            progress: monthProg,
          })
      }
      setGoal('');
      setQuant('');
      setNewGoalMod(false)
    }
  };

  return (
    <Modal
      style={styles.popup}
      animationType="slide"
      transparent={true}
      visible={newGoalMod ? true : false}
    >
      <View style={styles.container}>
        <Text style={styles.goals}>New {newGoalMod} Goal</Text>
        <View style={styles.form}>
          {goalErr ?
            <Text style={styles.error}>Must enter goal</Text>
            : <View style={{marginBottom: 21}} />}
          <TextInput
            value={goal}
            style={styles.goalText}
            placeholder="Goal"
            onChangeText={(e) => setGoal(e)}
          />
          {quantErr ?
            <Text style={styles.error}>Must enter number greater than 0</Text>
            : <View style={{marginBottom: 21}} />}
          <TextInput
            value={quant}
            style={styles.quantityText}
            placeholder="Frequency"
            onChangeText={(e) => setQuant(e)}
          />
        </View>
        <View style={styles.buttonBox}>
          <TouchableOpacity
            style={styles.close}
            onPress={() => {
              setGoal('');
              setQuant('');
              setGoalErr(false);
              setQuantErr(false);
              setNewGoalMod(false);
            }}
          >
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.save}
            onPress={() => {
              submit();
            }}
          >
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width * 0.68,
  },
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
    fontFamily: 'Avenir Next',
  },
  container: {
    backgroundColor: 'white',
    marginTop: Dimensions.get('window').height * 0.22,
    marginLeft: Dimensions.get('window').width * 0.07,
    height: 390,
    width: Dimensions.get('window').width * 0.86,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowOffset: {width: 0, height: -10},
    shadowColor: 'black',
    shadowOpacity: 0.4,
    shadowRadius: 20,
    padding: 30,
  },
  error: {
    fontSize: 14,
    marginLeft: 8,
    marginBottom: 4,
    color: 'red',
  },
  form: {
    height: 200,
  },
  goals: {
    fontSize: 26,
    fontFamily: 'Avenir Next'
  },
  goalText: {
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
  popup: {
    backgroundColor: 'white',
  },
  save: {
    backgroundColor: 'rgb(6, 191, 166)',
    width: 120,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  saveText: {
    color: 'white',
    fontSize: 22,
    fontFamily: 'Avenir Next'
  },
  quantityText: {
    borderColor: "rgb(220, 220, 220)",
    borderWidth: 1,
    width: Dimensions.get('window').width * 0.68,
    height: 56,
    borderRadius: 28,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 22,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Avenir Next'
  }
});

export default NewGoal;