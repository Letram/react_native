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
export const updateData = async(initialValue, collection, newValue) => {
    let collectionData = await getData(collection);
    let indexAux = -1;
    for (let index = 0; index < collectionData.length; index++) {
        const todo = collectionData[index];
        if(todo.title == initialValue.title && todo.body == initialValue.body){
            indexAux = index;
            break;
        }
    }
    console.log(indexAux);
    collectionData[indexAux] = newValue;
    setData(collection, collectionData);
    Promise.resolve();
}