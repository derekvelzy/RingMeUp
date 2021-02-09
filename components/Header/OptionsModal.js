import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../Context.js';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import Modal from 'react-native-modal'

const OptionsModal = () => {
  const {user, mod, setMod, logout} = useContext(Context);

  return (
    <Modal
      style={styles.popup}
      // animationType="slide"
      backdropOpacity={0.25}
      animationOut="slideOutLeft"
      animationIn="slideInLeft"
      transparent={true}
      isVisible={mod}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.logout}
          onPress={() => logout()}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.close}
          onPress={() => setMod(false)}
        >
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
    flexDirection: 'row',
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    height: 80,
    width: 320,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowOffset: {width: 0, height: -10},
    shadowColor: 'black',
    shadowOpacity: 0.4,
    shadowRadius: 20,
    padding: 30,
  },
  goals: {
    fontSize: 26,
  },
  logout: {
    backgroundColor: 'rgb(130, 217, 176)',
    width: 120,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  logoutText: {
    color: 'white',
    fontSize: 22,
    fontFamily: 'Avenir Next',
  },
  popup: {
    // backgroundColor: 'white',
    marginTop: 100,
    marginLeft: Dimensions.get('window').width * 0.07,
    position: 'absolute'
  }
});

export default OptionsModal;