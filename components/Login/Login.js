import React, { useContext, useState, useRef } from 'react';
import { Context } from '../Context.js';
import { StyleSheet, Text, View, Animated, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import Svg, {Circle, Path} from 'react-native-svg';

const Login = ({screenFlipLogin}) => {
  const {login, signup, incorrect, setIncorrect, loginErr, setLoginErr} = useContext(Context);

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      {loginErr ? <Text style={styles.err}>Incorrect email or password</Text> : <Text style={styles.err}></Text>}
      <View style={styles.form}>
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
        <TouchableOpacity
          style={styles.login}
          onPress={() => login(email, pass)}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.back}
          onPress={() => {
            screenFlipLogin(1);
            setLoginErr(false);
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
    backgroundColor: 'rgb(220, 220, 220)',
    height: 50,
    width: 130,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    fontSize: 18,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  err: {
    height: 20,
    color: 'red',
  },
  form: {
    alignItems: 'center',
  },
  input: {
    width: 250,
    height: 50,
    backgroundColor: 'rgb(230, 230, 230)',
    borderRadius: 25,
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 20,
  },
  login: {
    marginTop: 30,
    backgroundColor: 'rgb(130, 217, 176)',
    height: 50,
    width: 130,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    color: 'white',
    fontSize: 22,
  },
  title: {
    color: 'rgb(130, 217, 176)',
    fontSize: Dimensions.get('window').height * 0.05,
    marginBottom: 30,
  }
});

export default Login;