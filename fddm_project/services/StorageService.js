import React from 'react';
import {AsyncStorage} from 'react-native';

export const getData = async(value) =>{
    try {
        const result = await AsyncStorage.getItem(value);
        if (result !== null) {
          // We have data!!
            parsed = JSON.parse(result);
            Promise.resolve(parsed);
            //this.setState({todos: parsed});
        }
       } catch (error) {
         // Error retrieving data
         console.log(error);
       }
}
export const setData = async(name, value) =>{
    try {
        AsyncStorage.setItem(name, JSON.stringify(value));
    } catch (error) {
        // Error saving data
        console.log(error);
    }
}