import React, { useContext, useState } from 'react';
import { Context } from '../Context.js';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Header = () => {
  const {page, setPage, animateInfoSlider, setInfoSlider, setMod} = useContext(Context);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {
            // animateInfoSlider(false);
            // setInfoSlider(true);
            setMod(true);
        }}>
          <Icon name="sliders" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Ring Me Up</Text>
        <View style={styles.filler} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(130, 217, 176)',
    alignItems: 'center',
  },
  header: {
    height: 100,
    width: Dimensions.get('window').width * 0.9,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    padding: 10
  },
  filler: {
    width: 24,
  },
  title: {
    fontSize: 30,
    color: 'white'
  }
});

export default Header;