import React from 'react';

import './base/variables.css';

import { Startpage } from "./Startpage/Startpage"
import * as Settings from "./Startpage/Settings/settingsHandler"

const App = () => {

	//Apply colors
	var root = document.documentElement;
	try {
		const colors = Settings.Design.get()?.colors;
		if (colors)
			Object.keys(colors).forEach(key => {
				root.style.setProperty(key, colors[key]);
			});
	} catch { }

	return <Startpage />;
}

export default App;