import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import {Text, Header} from 'react-native-elements';
import {NavigationActions} from 'react-navigation';

import Home from './Home';
import Edit from './Edit';
import EditList from './EditList';
import Themes from './Themes';

export default class Details extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Atrás',
            title: 'Details',
            headerRight: (
                <Button
                    title='Edit'
                    onPress={() => navigation.navigate('Edit', {
                        title: navigation.getParam('title', 'No identificado el titulo'),
                        body: navigation.getParam('body', 'No identificado el titulo')
                    })}
                />
          ),
        };
      };

    render(){
        const { navigation } = this.props;
        const title = navigation.getParam('title', 'No identificado el titulo');
        const body = navigation.getParam('body', 'No identificado el cuerpo');
        return (
            <View>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <Text h3>{title}</Text>
                    <Text>{body}</Text>
                    <Button
                        title="Go to Edit"
                        onPress={() => navigation('Edit')}
                    />     
                </View>   
            </View>
        );
    }
    
}