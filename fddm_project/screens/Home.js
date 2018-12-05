import React from 'react';
import {Text, View, ScrollView} from 'react-native';
import {Button, List, ListItem, Card} from 'react-native-elements';
import {NavigationActions} from 'react-navigation';

import Details from './Details';
import Edit from './Edit';
import EditList from './EditList';
import Themes from './Themes';

export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            todos: [
                {
                    title: "Todo1",
                    body: "Cuerpo del amigo"
                }
            ]
        };
    }
    
      static navigationOptions = {
        title: 'Home',
      };

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                <Text>Home Screen</Text>
                <Button
                    title="Go to EditList"
                    onPress={() => navigate('EditList')}
                />
                <Button
                    title="Go to Themes"
                    onPress={() => navigate('Themes')}
                />    
                <ScrollView>
                {
                    this.state.todos.map((todo, index) => (
                        <Card
                            key={index}
                        >
                        <Text style={{marginBottom: 10}}>
                            {todo.title}
                        </Text>
                        <Button title='Enter Details' onPress={(todo) => (navigate('Details'))}/>
                        </Card>
                    ))
                }
                </ScrollView>
            </View>
        );
      }  

    
}