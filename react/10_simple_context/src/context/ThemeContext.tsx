import React from 'react';

export interface ThemeType {
	color:string;
	backgroundColor:string;
}

export const themes = {
	dark:{
		color:"#ffffff",
		backgroundColor:"#595959"
	},
	light:{
		color:"#000000",
		backgroundColor:"#d4d4d4"
	}
}

const ThemeContext = React.createContext<ThemeType>(themes.dark);

ThemeContext.displayName = "ThemeContext";

export default ThemeContext;