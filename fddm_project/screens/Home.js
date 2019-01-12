import React from 'react';
import {AsyncStorage, Text, View, ScrollView, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import {Button, List, ListItem, Card, SearchBar} from 'react-native-elements';
import {NavigationActions, NavigationEvents} from 'react-navigation';
import ActionButton from 'react-native-action-button';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import * as StorageService from '../services/StorageService';
import * as ThemeService from '../services/ThemeService';
import Events from '../services/EventService';
export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            todos: [],
            isModalVisible: false,
            title: '',
            body: '',
            search: '',
            arrayHolder: [],
            theme: ThemeService.getSelected()
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
            .then((todos) => this.setState({todos}))
            .catch(e => console.log(e));
    }
    reloadTheme(){
        this.setState({theme: ThemeService.getSelected()});
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

    componentDidMount(){
        this.events = [
            Events.subscribe('ReloadData', () => this.reloadData()), 
            Events.subscribe('ReloadTheme', () => this.reloadTheme())
        ];
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ flex: 1, flexDirection: 'column'}}>   
            <SearchBar
                lightTheme
                onChangeText={(text)=>{this.searchFilterFunction(text)}}
                containerStyle = {this.state.theme.styles.default}
                placeholderTextColor = {this.state.theme.styles.placeholder.color}
                placeholder='Type Here...' 
            />
                <ScrollView style={this.state.theme.styles.todo}>
                {
                    this.state.todos
                    .map((todo, index) => (
                        <ListItem
                            key={index}
                            title={todo.title}
                            onPress={() => (navigate('Details', {
                                title: todo.title,
                                body: todo.body,
                                reloadData: this.reloadData.bind(this),
                              }))}
                        />
                    ))
                }
                </ScrollView>
                <ActionButton buttonColor="rgba(231,76,60,1)">
                    <ActionButton.Item buttonColor='#9b59b6' title="New Todo" onPress={this.toggleModal}>
                        <Icon name="md-create" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#1abc9c' title="Edit List" onPress={() => navigate('EditList', {todos: this.state.todos, reloadData: this.reloadData.bind(this)})}>
                        <Icon name="md-done-all" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#1abc9c' title="Settings" onPress={() => navigate('Themes', {reloadTheme: this.reloadTheme.bind(this)})}>
                        <Icon name="md-done-all" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>
                <Modal isVisible={this.state.isModalVisible}>
                    <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'white',
                            width: 300,
                            height: 450}}>
                        <Text style={this.state.theme.header}>Add todo</Text>
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
const styles = StyleSheet.create({
    actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: 'white',
    },
  }); 