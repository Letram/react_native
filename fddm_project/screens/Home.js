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
                containerStyle = {{backgroundColor: this.state.theme.styles.primary.color}}
                placeholderTextColor = {this.state.theme.styles.text.color}
                placeholder='Type Here...' 
            />
                <ScrollView style={{backgroundColor: this.state.theme.styles.primary.color}}>
                {
                    this.state.todos
                    .map((todo, index) => (
                        <ListItem
                            key={index}
                            title={todo.title}
                            titleStyle={{color: this.state.theme.styles.text.color}}
                            containerStyle={{backgroundColor: this.state.theme.styles.secondary.color}}
                            onPress={() => (navigate('Details', {
                                title: todo.title,
                                body: todo.body,
                              }))}
                        />
                    ))
                }
                </ScrollView>
                <ActionButton buttonColor="rgba(231,76,60,1)">
                    <ActionButton.Item buttonColor='#9b59b6' title="New Todo" onPress={this.toggleModal}>
                        <Icon name="md-create" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#1abc9c' title="Edit List" onPress={() => navigate('EditList', {todos: this.state.todos})}>
                        <Icon name="md-done-all" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#b3f3f4' title="Settings" onPress={() => navigate('Themes')}>
                        <Icon name="md-settings" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>
                <Modal 
                onBackdropPress={() => this.setState({ isModalVisible: false })}
                isVisible={this.state.isModalVisible}>
                    <View style={this.state.theme.styles.container}>
                        <View style={{justifyContent:"flex-start"}}>
                            <Text style={this.state.theme.styles.header}>Add Todo</Text>
                        </View>
                        <TextInput
                        onChangeText={(text) => this.setState({title: text})}
                        style={this.state.theme.styles.text}
                        value={this.state.title}
                        placeholder="Title..."></TextInput>
                        <TextInput
                        onChangeText={(text) => this.setState({body: text})}
                        style={{color: this.state.theme.styles.text.color}}
                        value={this.state.body}
                        placeholder="Body..."></TextInput>
                        <TouchableOpacity
                        style={this.state.theme.styles.button}
                        onPress={this.addTodo}>
                            <Text style={this.state.theme.styles.light}>Add Todo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        style={this.state.theme.styles.dismiss}
                        onPress={this.toggleModal}>
                            <Text style={this.state.theme.styles.dark}>Dismiss</Text>
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
    modal: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: 300,
        height: 450}
  }); 