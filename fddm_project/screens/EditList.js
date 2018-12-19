import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView} from 'react-native';
import {ListItem, CheckBox} from 'react-native-elements';
import Home from './Home';
import Details from './Details';
import Edit from './Edit';
import Themes from './Themes';

export default class EditList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            marked: [],
            todos: []
        };
    }
      static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Atrás',
            title: 'Details',
        };
      };
    componentDidMount(){
        console.log(this.props);
        todosAux = this.props.navigation.getParam('todos', []);
        markedAux = todosAux.map(todo => false);
        this.setState({todos: todosAux, marked: markedAux});
    }

    press = () =>{
        markedAux = this.state.marked;
        markedAux[index] = !markedAux[index];
        this.setState({marked: markedAux});
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
                                onPress={this.press}
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