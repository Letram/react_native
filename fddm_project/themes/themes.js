import react from 'react';
import {StyleSheet} from 'react-native';

const alt = StyleSheet.create({
    header: {
      fontSize: 35,
      color: 'red',
    },
    content: {
      fontSize: 25,
      color: 'red',
    },
    button: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'red',
      paddingHorizontal: 40,
      borderRadius: 25,
      width: 300,
      height: 50,
      overflow: 'hidden',
      margin: 10,
    },
    footer: {
      color: 'red',
      fontSize: 35,
      fontWeight: 'bold',
      margin: 20,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    todo: {
      backgroundColor: 'orange',
      color: 'white',
    },
    placeholder: {
      color: 'white',
    }

  });
const def = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    header: {
      fontSize: 30,
      fontWeight: 'bold',
      margin: 10,
    },
    body: {
      margin: 10,
      alignItems: 'center',
    },
    content: {
      fontSize: 20,
    },
    strong: {
      fontWeight: 'bold',
    },
    button: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#4DC7A4',
      paddingHorizontal: 40,
      borderRadius: 25,
      width: 300,
      height: 50,
      overflow: 'hidden',
      margin: 10,
    },
    label: {
      margin: 10,
      fontSize: 23,
      color: '#FFF',
    },
    footer: {
      fontSize: 30,
      fontWeight: 'bold',
      margin: 10,
    },
    default: {
      backgroundColor: '#4DC7A4',
    },
    red: {
      backgroundColor: 'red',
    },
    todo: {
      backgroundColor: 'yellow',
      color: 'black',
    },
    placeholder: {
      color: 'blue',
    }

});

export default [{name: 'default', styles: def}, {name: 'alternative', styles: alt}];