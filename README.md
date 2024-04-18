# CoverTrax Song Finder

Group 4 Project 1:

- Hersey Lane
- Michael Ferguson
- Hunter Rozier

## Description

For our group project, we decided to create an application that would allow users to search up popular songs and find covers that other artists have made of that song. We wanted to apply simple yet effective user functionality within the page to ensure a seamless search process from song to song. The user's search is first sent to the Spotify API where various information about the original song, along with covers or other similarly named songs, is pulled and populated on the page. That fetch is then used tto return a unique song ID that enables our second API, the MusixMatch API, to send a request for the lyrics of that song. With one simple song name, or even part of the name, our user can find up to 9 different versions of the same song.

## Table of Contents

- [Code Source](#code-source-within-this-repo)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Code Source Within This Repo

The HTML code within this repo can be found at [./index.html](index.html)

The various JavaScript files can be found at [./assets/js](./assets/js)

The basic CSS styling sheet can be found at [./assets/styles.css](./assets/styles.css)

## Usage

The live deployment of this project can be found at [https://h-lane.github.io/CoverTrax/](https://h-lane.github.io/CoverTrax/)

![alt text](./assets/images/CoverTrax%20Image.png)

## Credits

- University of Richmond Coding Bootcamp
- Spotify API used under permissions from [developer.spotify.com](https://developer.spotify.com/documentation/web-api)
- MusixMatch API used under permissions from [developer.musixmatch.com](https://developer.musixmatch.com/)
- UiKit CSS framework used with permission from [getuikit.com](https://getuikit.com/docs/introduction)

## License

This project is openly available for use under the MIT license
