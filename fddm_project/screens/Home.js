import React from 'react';
import {Text, View, ScrollView} from 'react-native';
import {Button, List, ListItem, Card, SearchBar} from 'react-native-elements';
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
                },
                {
                    title: "Todo2",
                    body: "Cuerpo del amigo"
                }
            ]
        };
        this.arrayholder = this.state.todos;
    }
    
      static navigationOptions = {
        title: 'Home',
      };
      
    searchFilterFunction = text => {    
        const newData = this.arrayholder.filter(item => {      
          const itemData = `${item.title.toUpperCase()}   
          ${item.title.toUpperCase()} ${item.title.toUpperCase()}`;
      
           const textData = text.toUpperCase();
            
           return itemData.indexOf(textData) > -1;    
        });    
      
        this.setState({ todos: newData });  
      };
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
                    this.state.todos.map((todo, index) => (
                        <ListItem
                            key={index}
                            title={todo.title}
                            onPress={() => (navigate('Details', {
                                title: todo.title,
                                body: todo.body
                              }))}
                        />
                    ))
                }
                </ScrollView>
                <Button
                    title="Go to EditList"
                    onPress={() => navigate('EditList')}
                />
                <Button
                    title="Go to Themes"
                    onPress={() => navigate('Themes')}
                /> 
            </View>
        );
      }  

    
}