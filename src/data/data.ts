import pic_1 from "./pictures/pic_1.jpg";
import pic_2 from "./pictures/pic_2.jpg";
import pic_3 from "./pictures/pic_3.jpg";
import pic_4 from "./pictures/pic_4.jpg";
import pic_5 from "./pictures/pic_5.jpg";
import pic_6 from "./pictures/pic_6.jpg";
import pic_7 from "./pictures/pic_7.jpg";
import pic_8 from "./pictures/pic_8.png";

export type dataElem = {
	label: string,
	value: string,
}

export type linkGroup = {
	title: string;
	links: dataElem[];
}

/*
──────▄▌▐▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀​▀▀▀▀▀▀▌
───▄▄██▌█ BEEP BEEP
▄▄▄▌▐██▌█ GAY PORN DELIVERY
███████▌█▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄​▄▄▄▄▄▄▌
▀(@)▀▀▀▀▀▀▀(@)(@)▀▀▀▀▀▀▀▀▀▀▀▀▀​▀▀▀▀(@)▀
*/
export const links: linkGroup[] = [
	{
		title: "Reddit",
		links: [
			{
				label: "r/startpages (haha thats u)",
				value: "https://www.reddit.com/r/startpages/",
			},
			{
				label: "r/unixporn",
				value: "https://www.reddit.com/r/unixporn/",
			},
			{
				label: "r/rainmeter",
				value: "https://www.reddit.com/r/rainmeter/",
			},
			{
				label: "r/AnimalsBeingDerps (ﾉ◕ヮ◕)ﾉ*:・ﾟ✧",
				value: "https://www.reddit.com/r/AnimalsBeingDerps/",
			},
		]
	},
	{
		title: "3D Modelling",
		links: [
			{
				label: "Blender",
				value: "https://www.blender.org/",
			},
			{
				label: "BlenderGuru",
				value: "https://www.blenderguru.com/",
			},
			{
				label: "Poliigon",
				value: "https://www.poliigon.com/",
			},
			{
				label: "Blender tutorial",
				value: "https://www.youtube.com/watch?v=NyJWoyVx_XI&list=PLjEaoINr3zgEq0u2MzVgAaHEBt--xLB6U",
			},
			{
				label: "The other Blender tutorial",
				value: "https://www.youtube.com/watch?v=bpvh-9H8S1g&list=PL8eKBkZzqDiU-qcoaghCz04sMitC1yx6k&index=1",
			},
		]
	},
	{
		title: "Design",
		links: [
			{
				label: "PixlrX",
				value: "https://pixlr.com/x/",
			},
			{
				label: "AI Image Enlarger",
				value: "https://bigjpg.com/en",
			},
			{
				label: "Img to Svg Converter",
				value: "https://picsvg.com/",
			},
			{
				label: "FontAwesome",
				value: "https://fontawesome.com/icons",
			},
		]
	},
	{
		title: "Music",
		links: [
			{
				label: "i wanna be a cowboy",
				value: "https://www.youtube.com/watch?v=8zWz92f_HGs",
			},
			{
				label: "let the bodies hit the floor",
				value: "https://www.youtube.com/watch?v=b--VKaCB9u0",
			},
			{
				label: "Nobody Kanna Cross It",
				value: "https://www.youtube.com/watch?v=2wqTnwJGvtc",
			},
			{
				label: "Smug Dancin",
				value: "https://www.youtube.com/watch?v=eNZ9Od1jQ4Q",
			},
			{
				label: "Utamaru - The Sanctified Mind Cover",
				value: "https://www.youtube.com/watch?v=MHlJKLlS07U",
			},
		]
	},
	{
		title: "Sauce",
		links: [
			{
				label: "JS Library - React",
				value: "https://reactjs.org/",
			},
			{
				label: "CSS Writing Library - EmotionJS",
				value: "https://emotion.sh/docs/introduction",
			},
			{
				label: "Pictures - DeathAndMilk",
				value: "https://www.instagram.com/deathandmilk_/",
			},
			{
				label: "Icons - FontAwesome",
				value: "https://fontawesome.com/icons",
			},
			{
				label: "Text Flicker - CodeMyUI",
				value: "https://codemyui.com/crt-screen-text-flicker-animation-in-pure-css/",
			},
			{
				label: "Wave Animation - mburakerman",
				value: "https://codepen.io/mburakerman/pen/eRZZEv",
			},
			{
				label: "About me t(ಠ益ಠt)",
				value: "/",
			},
			{
				label: "Da real sauce ԅ(♡﹃♡ԅ)",
				value: "https://www.youtube.com/watch?v=qr89xoZyE1g",
			},
			{
				label: "Even more real sauce ( ͡° ͜ʖ ͡°)",
				value: "https://www.youtube.com/watch?v=VLhJOd_TFiI",
			},
		]
	},
]

export const images: dataElem[] = [
	{ label: "pic_1", value: pic_1 },
	{ label: "pic_2", value: pic_2 },
	{ label: "pic_3", value: pic_3 },
	{ label: "pic_4", value: pic_4 },
	{ label: "pic_5", value: pic_5 },
	{ label: "pic_6", value: pic_6 },
	{ label: "pic_7", value: pic_7 },
	{ label: "pic_8", value: pic_8 },
];

export const searchEngines: dataElem[] = [
	{
		label: "DuckDuckGo",
		value: "duckduckgo.com/",
	},
	{
		label: "Google",
		value: "google.com/search",
	},
	{
		label: "Qwant",
		value: "qwant.com/",
	},
];

export type colorsType = {
	[key: string]: string
}

export const colors: colorsType = {
	"--bg-color": "rgb(46, 46, 46)",
	"--default-color": "rgb(230, 230, 230)",
	"--accent-color": "rgb(255, 180, 230)",
	"--accent-color2": "rgb(180, 255, 230)",
}