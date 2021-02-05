import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../Context.js';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import moment from 'moment';

export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const Dates = () => {
  const {setPopup} = useContext(Context);
  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    generateCal();
  }, [])

  const generateCal = () => {
    const today = [moment().startOf('month').format('d'), new Date().getMonth(), new Date().getFullYear()];
    const emptyDays = [];
    for (let i = 0; i < today[0]; i += 1) {
      emptyDays.push(
        <View style={styles.emptyDate} key={i + 32}>
          <Text />
        </View>);
    }

    let yearMonthLater = today[2];
    let monthLater = today[1] + 1;
    if (monthLater === 12) {
      yearMonthLater = yearMonthLater + 1;
      monthLater = 0;
    }

    const daysInTheMonth = [];
    for (let i = 1; i <= (new Date(yearMonthLater, monthLater, 0).getDate()); i += 1) {
      daysInTheMonth.push(
      <TouchableOpacity style={styles.dateBox} key={i} onPress={() => setPopup(true)}>
        <View style={styles.date}>
          <Text style={{fontSize: 16}}>{i}</Text>
        </View>
        <View style={styles.number}>
          <Text style={{color: 'white'}}>2</Text>
        </View>
      </TouchableOpacity>);
    }
    const total = emptyDays.concat(daysInTheMonth);

    const rows = [];
    let row = [];
    for (let i = 0; i < total.length; i += 1) {
      if (i % 7 !== 0) {
        row.push(total[i]);
      } else {
        rows.push(row);
        row = [];
        row.push(total[i]);
      }
      if (i === total.length - 1) {
        rows.push(row);
      }
    }
    let k = 0;
    const cal = rows.map((r) => {
      k++;
      return <View style={styles.row} key={k}>{r}</View>
    });
    setCalendar(cal);
  }

  return (
    <View style={styles.container}>
       <Text style={styles.title}>{months[new Date().getMonth()]} {new Date().getFullYear()}</Text>
      <View style={styles.border}>
        {calendar}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  border: {
    backgroundColor: 'rgba(245, 255, 255, 0.75)',
    borderRadius: 30,
    padding: 10,
  },
  container: {
    alignItems: 'center',
    position: 'absolute',
    marginTop: Dimensions.get('window').height * 0.05 + 40,
  },
  date: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  dateBox: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width * 0.1,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: 'rgb(230, 230, 230)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  emptyDate: {
    width: Dimensions.get('window').width * 0.1,
    height: Dimensions.get('window').width * 0.1,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  number: {
    marginBottom: 7,
    width: Dimensions.get('window').width * 0.07,
    height: Dimensions.get('window').width * 0.07,
    backgroundColor: 'rgb(6, 191, 166)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  title: {
    color: 'white',
    fontSize: 26,
    marginBottom: 10,
  },
});

export default Dates;