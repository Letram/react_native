import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class Themes extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    
      static navigationOptions = {
        title: 'Themes',
        headerBackTitle: 'Atrás'
      };

      render(){
        const { navigate } = this.props.navigation;

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Themes</Text>         
            </View>
        );
      }
    
}