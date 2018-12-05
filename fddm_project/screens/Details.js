import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import Home from './Home';
import Edit from './Edit';
import EditList from './EditList';
import Themes from './Themes';

export default class Details extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    
      static navigationOptions = {
        title: 'Details',
        headerBackTitle: 'Atrás'
      };
      
    render(){
        const { navigate } = this.props.navigation;

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Details</Text>
                <Button
                    title="Go to Edit"
                    onPress={() => navigate('Edit')}
                />        
            </View>
        );
    }
    
}