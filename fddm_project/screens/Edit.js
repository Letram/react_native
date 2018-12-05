import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import Home from './Home';
import Details from './Details';
import EditList from './EditList';
import Themes from './Themes';

export default class Edit extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    
      static navigationOptions = {
        title: 'Edit',
        headerBackTitle: 'Cancelar'
      };
    
      render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Edit</Text>
                <Button
                    title="Go to Details"
                    onPress={() => navigate('Details')}
                />         
            </View>
        );
      }
    
    
}