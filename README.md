![logo](https://github.com/PrettyCoffee/fluidity/blob/main/public/logo192.png)

# Fluidity - An accordion based startpage
Here you can find the startpage I created for my browser :)

If you have any problems or miss a feature, create an issue and I will take a look at it! Of course, if you want to add a feature yourself you can just create a fork and contribute ;)

## Showcase
### The startpage in action
I created a [reddit post](https://www.reddit.com/r/startpages/comments/m82izg/my_new_startpage_any_ideas_for_names/) on r/startpages. There you can see a short video where I show all available features.

You can also just take a look at the [Live Demo](https://prettycoffee.github.io/fluidity/).

### Themes
![Default theme](https://github.com/PrettyCoffee/fluidity/blob/main/docs/default-theme.png)
![Dark Souls theme](https://github.com/PrettyCoffee/fluidity/blob/main/docs/DarkSouls-theme.png)
![Pop!OS theme](https://github.com/PrettyCoffee/fluidity/blob/main/docs/pop!os-theme.png)
**If you created a theme and want to see it here, hit me up!**

## Usage
You can apply startpages by using several methods. To keep it simple, I will only cover one (the easiest) here:
1. Download a New Tab Override Plugin (e.g. [Chrome](https://chrome.google.com/webstore/detail/new-tab-redirect/icpgjfneehieebagbmdbhnlpiopdcmna) | [Firefox](https://addons.mozilla.org/en-US/firefox/addon/new-tab-override/))
1. Open the Plugins Settings
1. Paste `https://prettycoffee.github.io/fluidity/` into the text field to set it up as your startpage

## Local Setup
If you do not want to rely on my github page, thats totally okay!
You can set it up locally yourself with the following steps:
1. Switch into the gh-pages branch
1. Download / Clone the repository files
1. Set it up like explained in [usage](#usage), but instead of the link use the filepath to the `/index.html` file.

If you have a github account you can of course also just fork the repo and create a github page yourself ;)

## Docker setup
If you are familiar with Docker, you can use the provided docker file which will build the app and deploy it with nginx.

You can use the following commands to deploy a container:

```bash
# build
$ docker build ./ -t fluidity

# run
$ docker run -d --name fluidity -p 8080:80 fluidity
```

It will be deployed on port 8080. (`http:\\localhost:8080`)

## Advanced: Changing the code
Since this project is programmed with React and TypeScript, you will first need to set it up:

0. (Download and install [nodejs](https://nodejs.org/en/) if you dont have it)
1. Clone the git repository, this time use the main branch
1. Open a terminal in the project folder (If you execute the command `ls` here, there should be a package.json)
1. Execute `npm i` to install all dependencies
1. Execute `npm run start` to validate that everything ids working. A browser tab with the URL `http://localhost:3000` and the startpage should open.
1. Now you can change the code, for example write your own default values into `/src/data/data.ts`
1. Compile the project by executing `npm run build` if everything is done
1. Your startpage is now located in the `/build/` folder
1. Optional: If you host it with github pages yourself, you can use the command `npm run deploy` to push a fresh build into the gh-pages branch

## Sources

* [Pictures - DeathAndMilk](https://www.instagram.com/deathandmilk_/)
* [Icons - FontAwesome](https://fontawesome.com/icons)
* [Text Flicker - CodeMyUI](https://codemyui.com/crt-screen-text-flicker-animation-in-pure-css/)
* [Wave Animation - mburakerman](https://codepen.io/mburakerman/pen/eRZZEv)
