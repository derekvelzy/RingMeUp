import React, { useContext, useState, useRef } from 'react';
import { Context } from '../Context.js';
import { StyleSheet, Text, View, Animated, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import Svg, {Circle, Path} from 'react-native-svg';

const Signup = ({screenFlipLogin}) => {
  const {login, signup, signupErr, setSignupErr} = useContext(Context);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [checkPass, setCheckPass] = useState('');
  const [checkErr, setCheckErr] = useState(false);

  const check = () => {
    clear();
    if (pass === checkPass && pass !== '' && name !== '' && email !== '') {
      signup(name, email, pass)
    } else {
      setCheckErr(true);
    }
  }

  const clear = () => {
    setCheckErr(false);
    setSignupErr(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      {signupErr || checkErr ?
        signupErr ?
        <Text style={styles.err}>Existing email</Text> : <Text style={styles.err}>Must enter valid name and password</Text>

       : <Text style={styles.err}></Text>}
      <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={(e) => setName(e)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(e) => setEmail(e)}
          />
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Password"
            value={pass}
            onChangeText={(e) => setPass(e)}
          />
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Re-enter Password"
            value={checkPass}
            onChangeText={(e) => setCheckPass(e)}
          />
          <TouchableOpacity
            style={styles.signup}
            onPress={() => check()}
          >
            <Text style={styles.signupText}>Signup</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.back}
            onPress={() => {
              screenFlipLogin(1);
              clear();
            }}
          >
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  back: {
    marginTop: 20,
    backgroundColor: 'black',
    height: 50,
    width: 130,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    color: 'white',
    fontSize: 18,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(130, 217, 176)',
    height: Dimensions.get('window').height,
  },
  err: {
    marginTop: 20,
    marginBottom: -15,
    height: 20,
    color: 'red',
  },
  form: {
    marginTop: 20,
    alignItems: 'center',
  },
  input: {
    width: 250,
    height: 45,
    backgroundColor: 'rgb(250, 250, 250)',
    borderRadius: 25,
    marginTop: 7,
    marginBottom: 7,
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 20,
  },
  signup: {
    marginTop: 20,
    backgroundColor: 'rgb(250, 250, 250)',
    height: 50,
    width: 130,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupText: {
    fontSize: 22,
  },
  svg: {
    position: 'absolute',
    top: 0,
    marginTop: -160,
  },
  title: {
    // marginTop: Dimensions.get('window').height * 0.1,
    color: 'white',
    fontSize: Dimensions.get('window').height * 0.04,
  }
});

export default Signup;