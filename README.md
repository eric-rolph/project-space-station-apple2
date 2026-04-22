# Project: Space Station — Apple II Emulator

A modern, browser-based emulator portal for the classic 1987 Apple II game **Project: Space Station**, originally developed by Larry and David E. George. 

This project provides a fully playable version of the game directly in the browser, featuring a custom space-themed UI, disk swapping capabilities (Side A and Side B), and save/load state functionality.

## Features
- **In-Browser Play:** No installation or extra software required. Just open the page and play.
- **Custom Theming:** A dynamic, immersive space-themed UI featuring a starfield background, phosphor green terminal aesthetic, and authentic CRT styling.
- **Save/Load Functionality:** Persistent save states allowing you to pick up your game exactly where you left off.
- **Disk Management:** Seamlessly swap between Side A and Side B when prompted by the game.

## Technologies Used
- **Emulator Core:** [Apple2TS](https://github.com/chris-torrence/apple2ts) - A TypeScript-based Apple II emulator.
- **Hosting:** [Cloudflare Workers](https://workers.cloudflare.com)
- **Frontend:** Vanilla HTML/CSS/JS (TypeScript) with Vite.

## Local Development
1. Clone the repository.
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Build for production: `npm run build`
5. Deploy to Cloudflare Workers: `npm run deploy`

## Credits
- Emulated using [Apple2TS](https://github.com/chris-torrence/apple2ts).
- Game preservation provided by the [Internet Archive](https://archive.org).
- Original game by Larry and David E. George (1987).
