import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../Context.js';
import { StyleSheet, Text, View, Animated, Dimensions, TouchableOpacity } from 'react-native';
import Goal from './Goal.js';
import NewGoal from './NewGoal.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

import firestore from '@react-native-firebase/firestore';

const Goals = () => {
  const {
    user,
    page,
    setPage,
    todayMove,
    dailyMove,
    weeklyMove,
    monthlyMove,
    setNewGoalMod,
  } = useContext(Context);

  const [today, setToday] = useState([]);
  const [daily, setDaily] = useState([]);
  const [weekly, setWeekly] = useState([]);
  const [monthly, setMonthly] = useState([]);

  useEffect(() => {
    if (user) {
      const mom = moment().format('MM-DD-YYYY');
      return firestore()
        .collection('Users')
        .doc(user.email)
        .collection('Goals')
        .onSnapshot((querySnapshot) => {
          const d = [];
          const w = [];
          const m = [];
          const t = [];
          let i = 0;
          querySnapshot.forEach((dox) => {
            i++;
            const dat = dox.data();
            let key = dox._ref._documentPath._parts[dox._ref._documentPath._parts.length - 1]
            if (dat.frequency === 'daily') {
              d.push(<Goal
                text={dat.task}
                day={i}
                progress={dat.progress}
                quantity={dat.quantity}
                frequency={dat.frequency}
                path={key}
                key={key}/>);
            } else if (dat.frequency === 'weekly') {
              w.push(<Goal
                text={dat.task}
                day={i}
                progress={dat.progress}
                quantity={dat.quantity}
                frequency={dat.frequency}
                path={key}
                key={key}/>);
            } else if (dat.frequency === 'monthly') {
              m.push(<Goal
                text={dat.task}
                day={i}
                progress={dat.progress}
                quantity={dat.quantity}
                frequency={dat.frequency}
                path={key}
                key={key}/>);
            } else if (dat.frequency === mom) {
              t.push(<Goal
                text={dat.task}
                day={i}
                progress={dat.progress}
                quantity={dat.quantity}
                frequency={dat.frequency}
                path={key}
                key={key}/>);
            }
          });
          setToday(t);
          setDaily(d);
          setWeekly(w);
          setMonthly(m);
        });
    }
  }, [user])

  return (
    <View style={styles.container}>
      <NewGoal />
      <Animated.View
        style={{
          width: Dimensions.get('window').width,
          alignItems: 'center',
          flexDirection: 'row',
          transform: [{translateX: todayMove}]
        }}
      >
        <View style={styles.goalTextBox}>
          <Text style={styles.goalText}>Today</Text>
        </View>
        <TouchableOpacity onPress={() => setNewGoalMod('Today')}>
          <Icon name="plus-circle" size={56} style={styles.icon} color="rgb(6, 191, 166)" />
        </TouchableOpacity>
      </Animated.View>
        {today}
      <Animated.View
        style={{
          width: Dimensions.get('window').width,
          alignItems: 'center',
          flexDirection: 'row',
          transform: [{translateX: dailyMove}]
        }}
      >
        <View style={styles.goalTextBox}>
          <Text style={styles.goalText}>Daily</Text>
        </View>
        <TouchableOpacity onPress={() => setNewGoalMod('Daily')}>
          <Icon name="plus-circle" size={56} style={styles.icon} color="rgb(6, 191, 166)" />
        </TouchableOpacity>
      </Animated.View>
        {daily}
      <Animated.View
        style={{
          width: Dimensions.get('window').width,
          alignItems: 'center',
          flexDirection: 'row',
          transform: [{translateX: weeklyMove}]
        }}
      >
        <View style={styles.goalTextBox}>
          <Text style={styles.goalText}>Weekly</Text>
        </View>
        <TouchableOpacity onPress={() => setNewGoalMod('Weekly')}>
          <Icon name="plus-circle" size={56} style={styles.icon} color="rgb(6, 191, 166)" />
        </TouchableOpacity>
      </Animated.View>
      {weekly}
      <Animated.View
        style={{
          width: Dimensions.get('window').width,
          alignItems: 'center',
          flexDirection: 'row',
          transform: [{translateX: monthlyMove}]
        }}
      >
        <View style={styles.goalTextBox}>
          <Text style={styles.goalText}>Monthly</Text>
        </View>
        <TouchableOpacity onPress={() => setNewGoalMod('Monthly')}>
          <Icon name="plus-circle" size={56} style={styles.icon} color="rgb(6, 191, 166)" />
        </TouchableOpacity>
      </Animated.View>
      {monthly}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    left: 0,
    backgroundColor: '#fff',
    alignItems: 'center',
    backgroundColor: 'rgb(245, 245, 255)',
    marginBottom: 50,
  },
  goalText: {
    fontSize: 30,
    color: 'white',
  },
  goalTextBox: {
    width: Dimensions.get('window').width,
    marginTop: 18,
    marginBottom: 6,
    alignItems: 'flex-end',
    backgroundColor: 'rgb(130, 217, 176)',
    padding: 10,
    paddingRight: 20,
    borderRadius: 28,
  },
  icon: {
    marginTop: 18,
    marginBottom: 6,
    marginLeft: 20,
  }
});

export default Goals;