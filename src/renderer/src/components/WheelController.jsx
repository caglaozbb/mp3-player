import { useNavigation } from '../context/NavigationContext'
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
        return 4 
      case 'albums':
        return 3 
      case 'songs':
        return 7 
      case 'themes':
        return 1 
      default:
        return 0
    }
  }

  const handleMenuClick = () => {
    goBack()
  }

  const handleUpClick = () => {
    moveUp()
  }

  const handleDownClick = () => {
    moveDown(getMaxIndex())
  }

  const handleCenterClick = () => {
    switch (currentScreen.screen) {
      case 'main':
        const mainItems = ['music', 'extras', 'settings', 'shuffle', 'nowPlaying']
        if (selectedIndex === 3) {
          console.log('Shuffle songs')
        } else {
          navigateTo(mainItems[selectedIndex])
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
        navigateTo('songs', { 
          title: `Artist ${selectedIndex + 1}`,
          songs: [] // In real app, filter songs by artist
        })
        break
      case 'albums':
        navigateTo('songs', { 
          title: `Album ${selectedIndex + 1}`,
          songs: [] // In real app, filter songs by album
        })
        break
      case 'songs':
        navigateTo('nowPlaying', { 
          song: {
            name: `Song ${selectedIndex + 1}`,
            artist: 'Artist Name',
            album: 'Album Name',
            duration: '3:45',
            currentTime: '0:00'
          }
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
      <div className="wheel-btn left" onClick={handleUpClick}>
        <img src={last} alt="up" />
      </div>
      <div className="wheel-btn right" onClick={handleDownClick}>
        <img src={next} alt="down" />
      </div>
      <div className="wheel-btn play">
        <img src={play} alt="play/pause" />
      </div>
      <div className="center-btn" onClick={handleCenterClick}></div>
    </div>
  )
}

export default WheelController

