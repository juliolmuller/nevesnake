<h1 align="center">
  :snowman: Neves Snake Game
</h1>

<p align="center">
  <a href="#trophy-lessons-learned">Lessons Learned</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-technologies--resources">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#hammer-setting-up-the-environment">Environment Setup</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#zap-features-implementations">Features</a>
</p>

<p align="center">
  <img src="https://img.shields.io/static/v1?labelColor=000000&color=008000&label=created%20at&message=May%202019" alt="Creation Date" />

  <img src="https://img.shields.io/github/last-commit/juliolmuller/jcalc?label=updated%20at&labelColor=000000&color=008000" alt="Update Date" />

  <img src="https://img.shields.io/github/v/tag/juliolmuller/jcalc?label=latest%20version&labelColor=000000&color=008000" alt="Latest Version" />

  <img src="https://img.shields.io/static/v1?labelColor=000000&color=008000&label=PRs&message=welcome" alt="Pull Requests Welcome" />

  <img src="https://img.shields.io/github/license/juliolmuller/jcalc?labelColor=000000&color=008000" alt="Project License" />
</p>

![Neves Snake Game screenshot](./src/assets/images/app-overview.jpg)

A simple Snake game developed in HTML5 Canvas and JavaScript, in order to demonstrate a custom **queue** structure using JavaScript, besides having some fun. The process was initially proposed as a college assignment, but stll maintained by me, with rare updates.

There are 2 types of food: The **BLUE** one increases the snake size, adding a block to the end of its body, and the **RED** one removes its very first  block. Both foods, however, always scores +1.

[Check out the application running!](https://juliolmuller.github.io/nevesnake/)

## :trophy: Lessons Learned

- Modeling browser applications with Canvas API;
- Creating movement effects across a 2D board;
- Implementing C-like structures in JavaScript syntax;
- Creating JavaScript classes;
- Configure Webpack 5;

## :rocket: Technologies & Resources

**Frontend:**
- HTML & JavaScript
- Babel, ESlint and Webpack

**Development:**
- Visual Studio Code
- Node.js routines

## :hammer: Setting up the Environment

Make sure to have **Node.js 10+** installed in your machine and its **npm** available in the command line, then use the following routines:

```bash
$ npm install     # Download dependencies
$ npm start       # Run development server
$ npm run build   # Build files for production
```

## :zap: Features Implementations

- [x] Single-player game;
- [x] Vintage UI;
- [x] Easter-Egg included;
- [x] Keyboard navigation;
- [x] Sound effects;
