import React from 'react';

import './base/variables.css';

import { Startpage } from "./Startpage/Startpage"
import * as Settings from "./Startpage/Settings/settingsHandler"

const App = () => {

	//Apply colors
	const colorSettings = Settings.getValue("colors");
	if (colorSettings) {
		var root = document.documentElement;
		const parsedColorSettings = JSON.parse(colorSettings);
		Object.keys(parsedColorSettings).forEach(key => {
			root.style.setProperty(key, parsedColorSettings[key]);
		});
	}

	return <Startpage />;
}

export default App;