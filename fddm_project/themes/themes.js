import react from 'react';
import {StyleSheet} from 'react-native';

const alt = StyleSheet.create({
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    justifyContent: "flex-start",
  },
    content: {
      fontSize: 25,
      color: 'red',
    },
    button: {
      alignItems: 'center',
      backgroundColor: '#0f90b6',
      paddingHorizontal: 40,
      borderRadius: 25,
      width: 150,
      height: 50,
      overflow: 'hidden',
      margin: 10,
      justifyContent: "center",

    },
    dismiss: {
      alignItems: 'center',
      backgroundColor: '#e0e1e1',
      paddingHorizontal: 40,
      borderRadius: 25,
      width: 150,
      height: 50,
      overflow: 'hidden',
      margin: 10,
      justifyContent: "center",

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
    },
    label: {
      margin: 10,
      fontSize: 23,
      color: '#810c41',
    },
    light: {color: '#e0e1e1'},
    dark: {color: '#0f90b6'},
    primary: {color: '#bbc3c4'},
    secondary: {color: '#98a1a3'},
    text: {color: '#0e4a5a'}
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
      justifyContent: "flex-start",
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
      alignItems: 'center',
      backgroundColor: '#673a59',
      paddingHorizontal: 40,
      borderRadius: 25,
      width: 150,
      height: 50,
      overflow: 'hidden',
      margin: 10,
      justifyContent: "center",
    },
    dismiss:{      
      alignItems: 'center',
      backgroundColor: '#d8cbc6',
      paddingHorizontal: 40,
      borderRadius: 25,
      width: 150,
      height: 50,
      overflow: 'hidden',
      margin: 10,
      justifyContent: "center",
    },
    label: {
      margin: 10,
      fontSize: 23,
      color: '#f68e2c',
    },
    footer: {
      fontSize: 30,
      fontWeight: 'bold',
      margin: 10,
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
    },
    light: {color: '#d8cbc6'},
    dark: {color: '#673a59'},
    primary: {color: '#97637f'},
    secondary: {color: '#b899a1'},
    text: {color: '#261623'}
});

export default [{name: 'Amethyst', styles: def}, {name: 'Sapphire', styles: alt}];