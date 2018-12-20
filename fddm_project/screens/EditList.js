import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView} from 'react-native';
import {ListItem, CheckBox} from 'react-native-elements';
import Home from './Home';
import Details from './Details';
import Edit from './Edit';
import Themes from './Themes';
import {getData, setData} from '../services/StorageService';
import {NavigationActions} from 'react-navigation';

export default class EditList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            todos: [],
            marked: []
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
                        console.log(unmarkedTodos);
                        //setData('todos', unmarkedTodos);
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
    render(){
        return (
            <View style={{ flex: 1, flexDirection: 'column'}}>
                <ScrollView>
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
            </View>
        );
    }
}