import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../Context.js';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import Modal from 'react-native-modal'

const OptionsModal = () => {
  const {mod, setMod, logout} = useContext(Context);

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
        <Text style={styles.goals}>Options</Text>
        <TouchableOpacity
          style={styles.close}
          onPress={() => logout()}
        >
          <Text style={styles.closeText}>Logout</Text>
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
  },
  container: {
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    height: Dimensions.get('window').height * 0.5,
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
  goals: {
    fontSize: 26,
  },
  popup: {
    // backgroundColor: 'white',
    marginTop: 100,
    marginLeft: Dimensions.get('window').width * 0.07,
    position: 'absolute'
  }
});

export default OptionsModal;