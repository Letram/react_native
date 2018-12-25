import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import * as StorageService from '../services/StorageService';
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
        this.props.navigation.setParams({titleAux: this.state.title, bodyAux: this.state.body});
    }
    
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Atrás',
            title: 'Edit',
            headerRight: (
                <Button
                title='Ok'
                onPress={() => {
                    newTodo = {
                        title: navigation.getParam('titleAux'),
                        body: navigation.getParam('bodyAux'),
                    };
                    StorageService.updateData({title: navigation.getParam('title'), body: navigation.getParam('body')}, 'todos', newTodo).then( ()=> {
                        navigation.state.params.reloadData();
                        navigation.navigate('Details', {title: newTodo.title , body: newTodo.body})
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
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <FormLabel>Title</FormLabel>
                <FormInput value={this.state.title} name="title" onChangeText={this.handleChangeTitle} />
                <FormLabel>Body</FormLabel>
                <FormInput value={this.state.body}  name="body" onChangeText={this.handleChangeBody}/>        
            </View>
        );
      }
    
    
}