import React from 'react';
import {AsyncStorage} from 'react-native';

export const getData = async(value) =>{
    try {
        const result = await AsyncStorage.getItem(value);
        if (result !== null) {
          // We have data!!
            parsed = JSON.parse(result);
            console.log(parsed);
            return parsed;
            //this.setState({todos: parsed});
        }
       } catch (error) {
         // Error retrieving data
         console.log(error);
       }
}
export const setData = async(name, value) =>{
    console.log({name, value});
    try {
        AsyncStorage.setItem(name, JSON.stringify(value));
    } catch (error) {
        // Error saving data
        console.log(error);
    }
}
export const updateData = async(index, collection, value) => {
    let collectionData = await getData(collection);
    collectionData[index] = value;
    setData(collection, collectionData);
    Promise.resolve();
}