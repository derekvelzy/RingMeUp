import React, { createContext, useState, useRef, useEffect } from 'react';
import { Animated, Dimensions } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Goal from './Dashboard/Goal.js';
import moment from 'moment';

export const Context = createContext(null);

const ConfigProvider = ({children}) => {
  const [user, setUser] = useState('');
  const [page, setPage] = useState('dashboard');
  const [infoSlider, setInfoSlider] = useState(false);
  const [popup, setPopup] = useState(false);
  const [mod, setMod] = useState(false);
  const [newGoalMod, setNewGoalMod] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  const [daily, setDaily] = useState([]);
  const [weekly, setWeekly] = useState([]);
  const [monthly, setMonthly] = useState([]);
  const [weekGoal, setWeekGoal] = useState(0);
  const [weekProg, setWeekProg] = useState(0);
  const [monthGoal, setMonthGoal] = useState(0);
  const [monthProg, setMonthProg] = useState(0);

  const animate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    getDate();
  }, [])

  const getDate = async () => {
    const today = moment().format();
    console.log(today);
    // firestore()
    //   .collection('Users')
    //   .doc(user.email)
    //   .collection('Progress')
    //   .doc('Month')
  }

  useEffect(() => {
    if (user) {
      return firestore()
        .collection('Users')
        .doc(user.email)
        .collection('Progress')
        .doc('Week')
        .onSnapshot((querySnapshot) => {
          setWeekGoal(querySnapshot._data.goal);
          setWeekProg(querySnapshot._data.progress)
        })
    }
  }, [])

  useEffect(() => {
    if (user) {
      return firestore()
        .collection('Users')
        .doc(user.email)
        .collection('Progress')
        .doc('Month')
        .onSnapshot((querySnapshot) => {
          setMonthGoal(querySnapshot._data.goal);
          setMonthProg(querySnapshot._data.progress);
        })
    }
  }, [])

  useEffect(() => {
    if (user) {
      return firestore()
        .collection('Users')
        .doc(user.email)
        .collection('Goals')
        .onSnapshot((querySnapshot) => {
          const d = [];
          const w = [];
          const m = [];
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
            }
          });
          setDaily(d);
          setWeekly(w);
          setMonthly(m);
        });
    }
  }, [user])

  const svgShrink = animate.interpolate({
    inputRange: [0, 320],
    outputRange: [1, 0.01],
    extrapolate: 'clamp',
  })

  const svgMove = animate.interpolate({
    inputRange: [0, 320],
    outputRange: [0, -120],
    extrapolate: 'clamp',
  })

  const todayMove = animate.interpolate({
    inputRange: [0, 150],
    outputRange: [-Dimensions.get('window').width * 0.66, -Dimensions.get('window').width * 0.26],
    extrapolate: 'clamp',
  });

  const dailyMove = animate.interpolate({
    inputRange: [150, 300],
    outputRange: [-Dimensions.get('window').width * 0.68, -Dimensions.get('window').width * 0.26],
    extrapolate: 'clamp',
  });

  const weeklyMove = animate.interpolate({
    inputRange: [300, 450],
    outputRange: [-Dimensions.get('window').width * 0.6, -Dimensions.get('window').width * 0.26],
    extrapolate: 'clamp',
  })

  const monthlyMove = animate.interpolate({
    inputRange: [450, 600],
    outputRange: [-Dimensions.get('window').width * 0.58, -Dimensions.get('window').width * 0.26],
    extrapolate: 'clamp',
  })

  const chartShrink = animate.interpolate({
    inputRange: [0, 140],
    outputRange: [1, 0.5],
    extrapolate: 'clamp',
  })

  const chartUp = animate.interpolate({
    inputRange: [80, 210],
    outputRange: [20, -60],
    extrapolate: 'clamp',
  })

  const labelUp = animate.interpolate({
    inputRange: [80, 210],
    outputRange: [20, -130],
    extrapolate: 'clamp',
  })

  const animateInfoSlider = (pos) => {
    return Animated.parallel([
      Animated.timing(animate, {
        toValue: pos ? 0 : 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const login = async (email, pass) => {
    try {
      await auth().signInWithEmailAndPassword(email, pass);
    } catch (e) {
      setIncorrect(true);
      console.log('error logging in', e);
    }
  };

  const signup = async (name, email, pass) => {
    try {
      await auth().createUserWithEmailAndPassword(email, pass);
      await firestore()
        .collection('Users')
        .doc(email.toLowerCase())
        .set({name})
        .then(() => {
          console.log('user added!');
        });
    } catch (e) {
      // setSignupError(true);
      console.log('error signing up', e);
    }
  };

  const logout = async () => {
    setMod(false);
    try {
      await auth().signOut();
    } catch (e) {
      console.log('error logging out', e);
    }
  };

  return (
    <Context.Provider
      value={{
        login,
        signup,
        logout,
        user,
        setUser,
        page,
        setPage,
        animateInfoSlider,
        infoSlider,
        setInfoSlider,
        animate,
        svgShrink,
        svgMove,
        todayMove,
        dailyMove,
        weeklyMove,
        monthlyMove,
        chartShrink,
        chartUp,
        labelUp,
        popup,
        setPopup,
        mod,
        setMod,
        newGoalMod,
        setNewGoalMod,
        daily,
        weekly,
        monthly,
        weekGoal,
        setWeekGoal,
        weekProg,
        setWeekProg,
        monthGoal,
        setMonthGoal,
        monthProg,
        setMonthProg
      }}>
      {children}
    </Context.Provider>
  );
};

export default ConfigProvider;
