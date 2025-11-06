# 🎵 iPod MP3 Player

A nostalgic and functional desktop MP3 player built with Electron + Vite + React, featuring a classic iPod-inspired interface, clickable wheel controls, and a complete music library system.

---

## 🌟 Overview

iPod MP3 Player is a cross-platform desktop application that recreates the iconic iPod experience with modern technology. It combines the beloved iPod navigation system with powerful music playback features, automatic metadata extraction, and customizable themes.

---

## 🎬 Demo

![iPod MP3 Player Demo](src/renderer/src/assets/mp3Player.gif)

---

## 🎯 Features

**Classic iPod Navigation**: Authentic click wheel interface with center button, menu, play/pause, and skip controls

**Music Library Management**: Browse by Artists, Albums, or Songs with automatic organization

**Automatic Metadata Extraction**: Reads ID3 tags from MP3 files including title, artist, album, year, genre, and album art

**Now Playing Screen**: Beautiful display with album artwork, progress bar, and track information

**Shuffle Mode**: Random playback with smart track management to avoid repeats

**Volume Control**: Adjustable volume with visual feedback in settings

**Theme Support**: Switch between default pink and blue themes with matching button icons

**Clock Screen**: Real-time clock display in the Extras menu

**Progress Tracking**: Real-time playback progress with formatted time display

**Multiple Navigation Screens**: Main Menu, Music Menu, Artists, Albums, Songs, Now Playing, Settings, Themes, Extras, and Clock

---

## 🗂 Application Flow

**Main Menu**: Access Music, Extras, Settings, Shuffle toggle, or Now Playing

**Music Menu**: Browse by Artists, Albums, or All Songs

**Library Navigation**: Select an artist or album to view filtered song lists

**Song Selection**: Choose a song to start playback and view Now Playing screen

**Now Playing**: View album art, track info, progress bar, and control playback

**Settings**: Adjust volume and toggle shuffle mode

**Themes**: Switch between pink and blue color schemes

**Extras**: Access Clock screen and Theme selector

---

## 💻 Technology Stack

**Frontend**: React 19 with modern hooks and context API

**Audio Engine**: Howler.js for cross-platform audio playback

**Metadata**: music-metadata library for ID3 tag extraction

**Framework**: Electron with electron-vite for hot reloading

**Build Tool**: Vite for fast development and optimized builds

**Styling**: CSS Modules for component-scoped styles

---

## ⚙️ Requirements

- Node.js 20.19.0 or higher
- npm package manager

## 🚀 Installation

```bash
git clone https://github.com/caglaozbb/mp3-player.git
cd mp3-player
npm install
```

## 🏃‍♂️ Usage

### Development Mode

```bash
npm run dev
```

Run with hot reloading and development tools enabled.

### Production Mode

```bash
npm start
```

Preview the production build locally.

## 🛠 Build Commands

**Development:**

```bash
npm run dev
```

Run with hot reloading

**Preview Production Build:**

```bash
npm start
```

**Build Production:**

```bash
npm run build
```

**Platform-specific Builds:**

```bash
npm run build:win   # Windows
npm run build:mac   # macOS
npm run build:linux # Linux
```
---

## 🎮 Controls

**Center Button**: Select/confirm navigation or play selected song

**Menu Button**: Go back to previous screen

**Play/Pause Button**: Toggle playback of current song

**Left/Previous Button**: 
  - Navigate up in lists
  - Previous track when in Now Playing
  - Decrease volume in Settings

**Right/Next Button**: 
  - Navigate down in lists
  - Next track when in Now Playing
  - Increase volume in Settings

---

## 🎵 Adding Music

Place your MP3 files in `src/renderer/src/assets/songs/`

The app automatically:
- Extracts metadata (title, artist, album, year, genre)
- Reads embedded album artwork
- Organizes songs by artist and album
- Displays all information in the library

To add songs programmatically, edit `MusicContext.jsx`:

```javascript
const songFiles = [
  { file: 'your-song.mp3' },
  // Add more songs here
]
```
---

## 🖥 Platform Support

Developed and tested on macOS. Cross-platform compatibility expected thanks to Electron.

---

## 📂 Project Structure

```
mp3-player/
├── src/
│   ├── main/              # Electron main process
│   ├── preload/           # Preload scripts
│   └── renderer/          # React application
│       └── src/
│           ├── assets/    # Images, songs, styles
│           ├── components/ # Reusable components
│           ├── context/   # React Context providers
│           ├── screens/   # Screen components
│           └── styles/    # CSS Modules
├── build/                 # Build assets
└── out/                   # Compiled output
```

---
## 📝 Development

1. Create new screen components in `screens/` folder
2. Add screen case to `ScreenManager.jsx`
3. Use `NavigationContext` for navigation
4. Use `MusicContext` for music operations

**Built with ❤️ using Electron, React, Howler.js, and music-metadata**
