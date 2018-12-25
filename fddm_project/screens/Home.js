import React from 'react';
import {AsyncStorage, Text, View, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import {Button, List, ListItem, Card, SearchBar} from 'react-native-elements';
import {NavigationActions, NavigationEvents} from 'react-navigation';
import Modal from 'react-native-modal';
import Details from './Details';
import Edit from './Edit';
import EditList from './EditList';
import Themes from './Themes';
import * as StorageService from '../services/StorageService';

export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            todos: [],
            isModalVisible: false,
            title: '',
            body: '',
            search: '',
            arrayHolder: []
        };
        StorageService.getData('todos').then(todos => {
            this.setState({'todos': todos, 'arrayHolder': todos});
        });
    }
    
    static navigationOptions = {
        title: 'Home',
    };
      
    reloadData(){
        StorageService.getData('todos')
        .then(todos => {
            this.setState({'todos': todos});
        })
        .catch(e => console.log(e));
    }
    toggleModal = () =>{
        this.setState({isModalVisible: !this.state.isModalVisible});
    }
    addTodo = () =>{
        todo = {
            title: this.state.title,
            body: this.state.body
        }
        this.setState({title: '', body: ''});
        currentTodos = this.state.todos;
        currentTodos.push({title: this.state.title, body: this.state.body});
        this.setState({todos: currentTodos, isModalVisible: !this.state.isModalVisible});
        StorageService.setData('todos', this.state.todos);
        this.props.navigation.navigate('Details', {title: todo.title, body: todo.body, reloadData: this.reloadData.bind(this)})
    }
    searchFilterFunction = text => {  
        const newData = this.state.arrayHolder.filter(item => {      
            const itemData = `${item.title.toUpperCase()}   
            ${item.title.toUpperCase()} ${item.title.toUpperCase()}`;
      
            const textData = text.toUpperCase();
            
            return itemData.indexOf(textData) > -1;    
        });    
        this.setState({ todos: newData });  
    };
    
    componentWillMount(){
        this.props.navigation.addListener('didFocus', this.reloadData);
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>   
            <SearchBar
                lightTheme
                onChangeText={(text)=>{this.searchFilterFunction(text)}}
                onClear={()=>{}}
                placeholder='Type Here...' 
            />
                <ScrollView>
                {
                    this.state.todos
                    .map((todo, index) => (
                        <ListItem
                            key={index}
                            title={todo.title}
                            onPress={() => (navigate('Details', {
                                title: todo.title,
                                body: todo.body,
                                reloadData: this.reloadData.bind(this)
                              }))}
                        />
                    ))
                }
                </ScrollView>
                <Button
                    title="Go to EditList"
                    onPress={() => navigate('EditList', {todos: this.state.todos, reloadData: this.reloadData.bind(this)})}
                />
                <Button
                    title="Go to Themes"
                    onPress={() => navigate('Themes')}
                /> 
                <Button
                    title="Add Todo"
                    onPress={this.toggleModal}
                /> 
                <Modal isVisible={this.state.isModalVisible}>
                    <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'white',
                            width: 300,
                            height: 450}}>
                        <Text>Add todo</Text>
                        <TextInput
                        onChangeText={(text) => this.setState({title: text})}
                        value={this.state.title}
                        placeholder="Title..."></TextInput>
                        <TextInput
                        onChangeText={(text) => this.setState({body: text})}
                        value={this.state.body}
                        placeholder="Body..."></TextInput>
                        <Button
                        title="Add Todo"
                        onPress={this.addTodo}
                        /> 
                        <TouchableOpacity
                        onPress={this.toggleModal}>
                            <Text>Dismiss</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        );
      }  
}