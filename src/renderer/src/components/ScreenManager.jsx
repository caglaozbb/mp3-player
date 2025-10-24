import { useNavigation } from '../context/NavigationContext'
import MainMenu from '../screens/MainMenu'
import MusicMenu from '../screens/MusicMenu'
import ExtrasMenu from '../screens/ExtrasMenu'
import SettingsMenu from '../screens/SettingsMenu'
import ArtistsScreen from '../screens/ArtistsScreen'
import AlbumsScreen from '../screens/AlbumsScreen'
import SongsScreen from '../screens/SongsScreen'
import NowPlayingScreen from '../screens/NowPlayingScreen'
import ClockScreen from '../screens/ClockScreen'
import ThemesScreen from '../screens/ThemesScreen'

const ScreenManager = () => {
  const { currentScreen } = useNavigation()

  const renderScreen = () => {
    switch (currentScreen.screen) {
      case 'main':
        return <MainMenu />
      case 'music':
        return <MusicMenu />
      case 'extras':
        return <ExtrasMenu />
      case 'settings':
        return <SettingsMenu />
      case 'artists':
        return <ArtistsScreen />
      case 'albums':
        return <AlbumsScreen />
      case 'songs':
        return <SongsScreen />
      case 'nowPlaying':
        return <NowPlayingScreen />
      case 'clock':
        return <ClockScreen />
      case 'themes':
        return <ThemesScreen />
      default:
        return <MainMenu />
    }
  }

  return renderScreen()
}

export default ScreenManager

