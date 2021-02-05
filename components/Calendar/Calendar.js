import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { Context } from '../Context.js';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import Svg, {Circle, Path} from 'react-native-svg';
import Dates from './Dates.js';
import Popup from './Popup.js';

const Calendar = ({screenFlip}) => {
  const {page, setPage} = useContext(Context);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <TouchableOpacity style={styles.viewDash} onPress={() => screenFlip(true)}>
          <Text>View Dashboard</Text>
        </TouchableOpacity>
      </View>
      <Svg style={styles.svg} width={Dimensions.get('window').width} height="220" viewBox={`0 0 1800 300`}>
        <Path
          fill="rgb(130, 217, 176)"
          d="M0,-300
            L0,0
            Q900,-270 1800,0
            L1800,-300
            Z" />
        </Svg>
      <Dates />
      <Popup />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    backgroundColor: 'rgb(245, 245, 255)'
  },
  svg: {
    alignSelf: 'center',
    marginTop: -20,
    zIndex: -1,
  },
  top: {
    width: Dimensions.get('window').width,
    backgroundColor: 'rgb(130, 217, 176)',
    height: Dimensions.get('window').width * 0.21 + 215,
    alignItems: 'center',
  },
  viewDash: {
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 22,
    width: 140,
    alignItems: 'center',
  }
});

export default Calendar;