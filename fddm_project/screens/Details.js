import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import {Text, Header} from 'react-native-elements';
import {NavigationActions} from 'react-navigation';
import Edit from './Edit';
import * as ThemeService from '../services/ThemeService'; 
import Events from '../services/EventService';
export default class Details extends React.Component{
    constructor(props){
        super(props);
        this.state = {theme: ThemeService.getSelected()};
    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Atrás',
            title: 'Details',
        };
      };

    render(){
        const { navigation } = this.props;
        const title = navigation.getParam('title', 'No identificado el titulo');
        const body = navigation.getParam('body', 'No identificado el cuerpo');
        return (
                <View style={{ flex: 1, flexDirection: 'column', backgroundColor: this.state.theme.styles.primary.color }}>
                    <Text h3 style={this.state.theme.styles.text}>{title}</Text>
                    <Text style={this.state.theme.styles.text}>{body}</Text>
                    <Button
                        title="Edit todo."
                        color={this.state.theme.styles.dark.color}
                        onPress={() => navigation.navigate('Edit', {title, body})}
                    />     
                </View>   
        );
    }
    
}