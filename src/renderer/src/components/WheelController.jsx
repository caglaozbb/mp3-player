import { useNavigation } from '../context/NavigationContext'
import { useMusic } from '../context/MusicContext'
import menu from '../assets/MENU.png'
import last from '../assets/last.png'
import next from '../assets/next.png'
import play from '../assets/play.png'

const WheelController = () => {
  const { 
    currentScreen, 
    selectedIndex, 
    navigateTo, 
    goBack, 
    moveUp, 
    moveDown 
  } = useNavigation()

  const { songs, artists, albums, volume, shuffle, loadSong, togglePlay, playNext, playPrevious, changeVolume, toggleShuffle } = useMusic()

  const getMaxIndex = () => {
    switch (currentScreen.screen) {
      case 'main':
        return 4 
      case 'music':
        return 2 
      case 'extras':
        return 1 
      case 'settings':
        return 1 
      case 'artists':
        return artists.length - 1
      case 'albums':
        return albums.length - 1
      case 'songs':
        return currentScreen.songs ? currentScreen.songs.length - 1 : songs.length - 1
      case 'themes':
        return 1 
      default:
        return 0
    }
  }

  const handlePlayClick = () => {
    togglePlay()
  }

  const handleNextClick = () => {
    if (currentScreen.screen === 'settings' && selectedIndex === 0) {
      changeVolume(volume + 0.05) 
      return
    }
    
    if (currentScreen.screen === 'nowPlaying') {
      playNext()
    } else {
      moveDown(getMaxIndex())
    }
  }

  const handlePrevClick = () => {
    if (currentScreen.screen === 'settings' && selectedIndex === 0) {
      changeVolume(volume - 0.05)
      return
    }
    
    if (currentScreen.screen === 'nowPlaying') {
      playPrevious()
    } else {
      moveUp()
    }
  }

  const handleMenuClick = () => {
    goBack()
  }

  const handleCenterClick = () => {
    switch (currentScreen.screen) {
      case 'main':
        const mainItems = ['music', 'extras', 'settings', 'shuffle', 'nowPlaying']
        if (selectedIndex === 3) {
          toggleShuffle()
        } else {
          navigateTo(mainItems[selectedIndex])
        }
        break
      case 'settings':
        if (selectedIndex === 1) {
          toggleShuffle()
        }
        break
      case 'music':
        const musicItems = ['artists', 'albums', 'songs']
        navigateTo(musicItems[selectedIndex])
        break
      case 'extras':
        const extrasItems = ['clock', 'themes']
        navigateTo(extrasItems[selectedIndex])
        break
      case 'artists':
        const selectedArtist = artists[selectedIndex]
        navigateTo('songs', { 
          title: selectedArtist.name,
          songs: selectedArtist.songs
        })
        break
      case 'albums':
        const selectedAlbum = albums[selectedIndex]
        navigateTo('songs', { 
          title: selectedAlbum.name,
          songs: selectedAlbum.songs
        })
        break
      case 'songs':
        const songList = currentScreen.songs || songs
        const selectedSong = songList[selectedIndex]
        loadSong(selectedSong, false)
        navigateTo('nowPlaying', { 
          song: selectedSong
        })
        break
      case 'themes':
        const themes = ['default', 'blue']
        const selectedTheme = themes[selectedIndex]
        if (selectedTheme === 'blue') {
          document.body.classList.add('theme-blue')
        } else {
          document.body.classList.remove('theme-blue')
        }
        window.dispatchEvent(new Event('themeChanged'))
        break
      default:
        break
    }
  }

  return (
    <div className="wheel">
      <div className="wheel-btn menu-btn" onClick={handleMenuClick}>
        <img src={menu} alt="menu" />
      </div>
      <div className="wheel-btn left" onClick={handlePrevClick}>
        <img src={last} alt="previous" />
      </div>
      <div className="wheel-btn right" onClick={handleNextClick}>
        <img src={next} alt="next" />
      </div>
      <div className="wheel-btn play" onClick={handlePlayClick}>
        <img src={play} alt="play/pause" />
      </div>
      <div className="center-btn" onClick={handleCenterClick}></div>
    </div>
  )
}

export default WheelController

