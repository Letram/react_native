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
        this.state = {
            title: this.props.navigation.getParam('title'),
            body: this.props.navigation.getParam('body')
        };
    }
    
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Atrás',
            title: 'Edit',
            headerRight: (
                <Text onPress={() => navigation.navigate('Details', {title: navigation.getParam('title'), body: navigation.getParam('body')})}>
                Ok
                </Text>
          ),
        };
      };

      getState = () => {
          return this.state;
      }
    
      handleChangeTitle = (newTitle) => {
        this.props.navigation.setParams({title: newTitle});
      }
      handleChangeBody = (newBody) => {
        this.props.navigation.setParams({body: newBody});
      }

      render() {

        const { navigation } = this.props;
        let title = navigation.getParam('title', 'No identificado el titulo');
        let body = navigation.getParam('body', 'No identificado el cuerpo');

        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <FormLabel>Title</FormLabel>
                <FormInput placeholder={title} name="title" onChangeText={this.handleChangeTitle} />
                <FormLabel>Body</FormLabel>
                <FormInput placeholder={body}  name="body" onChangeText={this.handleChangeBody}/>        
            </View>
        );
      }
    
    
}