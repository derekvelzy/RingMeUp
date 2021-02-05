import React, { useContext, useState, useRef, useEffect } from 'react';
import { Context } from './Context.js';
import { StyleSheet, Text, View, Animated, Dimensions, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import Main from './Dashboard/Main.js';
import Calendar from './Calendar/Calendar.js';
import Header from './Header/Header.js';
import OptionsModal from './Header/OptionsModal.js';
import Login from './Login/Login.js';
import MainLogin from './Login/Main.js';

export default function App() {
  const {user, setUser, page, animateInfoSlider, infoSlider, setInfoSlider, animate} = useContext(Context);

  const [slider, setSlider] = useState(false);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const sub = auth().onAuthStateChanged(onAuthStateChanged);
    return sub;
  }, [])

  if (user) {
    return (
      <View style={styles.container}>
        <Header />
        <Main />
        <OptionsModal />
      </View>
    )
  } else {
    return <MainLogin />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
