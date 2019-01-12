import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView} from 'react-native';
import {ListItem, CheckBox} from 'react-native-elements';
import * as StorageService from '../services/StorageService';
import {NavigationActions} from 'react-navigation';
import * as ThemeService from '../services/ThemeService'; 
import Events from '../services/EventService';
export default class EditList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            todos: [],
            marked: [],
            theme: ThemeService.getSelected()
        };
    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Atrás',
            title: 'Details',
            headerRight: (
                <Button
                    title='Delete'
                    onPress={() =>{
                        allTodos = navigation.getParam('todos', []);
                        markedTodos = navigation.getParam('marked', []);
                        unmarkedTodos = allTodos.filter((_, index) => {
                            return !markedTodos[index];
                        });
                        StorageService.setData('todos', unmarkedTodos).then(()=>{
                            Events.publish('ReloadData');
                            navigation.navigate('Home');
                        });
                    }}
                />
          ),
        };
    };
    componentDidMount(){
        todosAux = this.props.navigation.getParam('todos', []);
        markedAux = todosAux.map(_ => false);
        this.setState({todos: todosAux, marked: markedAux});
    }
    press = (index) =>{
        markedAux = this.state.marked;
        markedAux[index] = !markedAux[index];
        this.setState({marked: markedAux});
        this.props.navigation.setParams({marked: this.state.marked});
    }
    removeAll = () => {
        StorageService.setData('todos', []).then( ()=> {
            Events.publish('ReloadData');
        });
    }
    render(){
        return (
            <View style={{ flex: 1, flexDirection: 'column'}}>
                <ScrollView style={this.state.theme.styles.todo}>
                {
                    this.state.todos.map((todo, index) => (
                        <ListItem
                            key={index}
                            title={
                            <CheckBox
                                title={todo.title}
                                onPress={() => this.press(index)}
                                checked={this.state.marked[index]}
                            />
                            }
                        />
                    ))
                }
                </ScrollView>    
                {   this.state.marked.indexOf(true) == -1 &&
                    <Button 
                    title="Delete all"
                    onPress={this.removeAll}/>       
                } 
            </View>
        );
    }
}