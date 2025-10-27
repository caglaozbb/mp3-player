# 🎵 iPod MP3 Player

An Electron application with React that mimics the classic iPod design and functionality.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build:win    # Windows
npm run build:mac    # macOS
npm run build:linux  # Linux
```


## ✨ Features

- **iPod-style Navigation**: Classic wheel controls
- **Music Player**: Howler.js integration with real-time progress
- **Multiple Screens**: Main menu, music menu, artists, albums, songs
- **Theme Support**: Pink and blue themes
- **Clock Screen**: Real-time clock display

## 🎵 Music System

Add songs to `MusicContext.jsx`:

```javascript
const songs = [
  {
    id: 1,
    name: 'Song Name',
    artist: 'Artist Name',
    album: 'Album Name',
    file: new URL('../assets/songs/song.mp3', import.meta.url).href
  }
]
```

Place MP3 files in `src/renderer/src/assets/songs/`

## 🎮 Controls

- **Center Button**: Select/confirm
- **Play Button**: Play/pause music
- **Left/Right**: Navigate lists
- **Menu Button**: Go back

## 🚀 Development

1. Create component in `screens/` folder
2. Add case to `ScreenManager.jsx`
3. Use `NavigationContext` for navigation


**Built with ❤️ using Electron, React, and Howler.js**