import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import * as StorageService from '../services/StorageService';
import * as ThemeService from '../services/ThemeService';
import Events from '../services/EventService';
export default class Edit extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title: this.props.navigation.getParam('title'),
            body: this.props.navigation.getParam('body'),
            theme: ThemeService.getSelected()
        };
        this.props.navigation.setParams({titleAux: this.state.title, bodyAux: this.state.body});
    }
    
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Atrás',
            title: 'Edit',
            headerRight: (
                <Button
                title='Guardar'
                onPress={() => {
                    newTodo = {
                        title: navigation.getParam('titleAux'),
                        body: navigation.getParam('bodyAux'),
                    };
                    StorageService.updateData({title: navigation.getParam('title'), body: navigation.getParam('body')}, 'todos', newTodo).then( ()=> {
                        Events.publish('ReloadData');
                        navigation.navigate('Details', {title: navigation.getParam('titleAux'), body: navigation.getParam('bodyAux')});
                    });
                }}
                />
          ),
        };
      };
    
      handleChangeTitle = (newTitle) => {
        this.props.navigation.setParams({titleAux: newTitle});
        this.setState({title: newTitle});
      }
      handleChangeBody = (newBody) => {
        this.props.navigation.setParams({bodyAux: newBody});
        this.setState({body: newBody});
      }

      render() {

        return (
            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: this.state.theme.styles.primary.color}}>
            <View style={{backgroundColor: this.state.theme.styles.light.color, marginTop: 10}}>
                <FormLabel labelStyle={{margin: 10, fontSize: 20, color: this.state.theme.styles.dark.color}}>Title</FormLabel>
                <FormInput 
                    value={this.state.title} 
                    inputStyle={this.state.theme.styles.text}
                    name="title" 
                    onChangeText={this.handleChangeTitle} 
                />
                <FormLabel labelStyle={{margin: 10, fontSize: 20, color: this.state.theme.styles.dark.color}}>Body</FormLabel>
                <FormInput 
                    value={this.state.body} 
                    inputStyle={this.state.theme.styles.text}
                    name="body" 
                    onChangeText={this.handleChangeBody}
                />  
                </View>      
            </View>
        );
      }
    
    
}