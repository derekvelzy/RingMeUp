import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../Context.js';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Modal } from 'react-native';

const Popup = () => {
  const {popup, setPopup} = useContext(Context);

  return (
    <Modal
      style={styles.popup}
      animationType="slide"
      transparent={true}
      visible={popup}
    >
      <View style={styles.container}>
        <Text style={styles.goals}>Goals</Text>
        <TouchableOpacity
          style={styles.close}
          onPress={() => setPopup(false)}
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
    marginTop: Dimensions.get('window').height * 0.25,
    marginLeft: Dimensions.get('window').width * 0.07,
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
    backgroundColor: 'white',
  }
});

export default Popup;