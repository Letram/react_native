import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

import Home from './Home';
import Details from './Details';
import EditList from './EditList';
import Themes from './Themes';

export default class Edit extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Atrás',
            title: 'Edit',
        };
      };

    
      render() {
        const { navigation } = this.props;
        const title = navigation.getParam('title', 'No identificado el titulo');
        const body = navigation.getParam('body', 'No identificado el cuerpo');

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <FormLabel>Title</FormLabel>
            <FormInput value={title}/>
                <Text>Edit</Text>
                <Button
                    title="Go to Details"
                    onPress={() => navigation('Details')}
                />         
            </View>
        );
      }
    
    
}