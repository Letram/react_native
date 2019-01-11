import React from 'react';
import themes from '../themes/themes';

class ThemeService{
    static selected = themes[0];

    static getSelectedStyleSheet(){
        return this.selected;
    }

    static swapStyleSheet(name){
        this.selected = themes.filter(theme => theme.name == name)[0];
    }

    static getThemes(){
        return themes;
    }
}

export const getSelected = () =>{
    return ThemeService.getSelectedStyleSheet();
}
export const swap = (name) =>{
    ThemeService.swapStyleSheet(name);
}
export const getAll = () => {
    return ThemeService.getThemes();
}