import { useNavigation } from '../context/NavigationContext'
import { useMusic } from '../context/MusicContext'
import ScreenHeader from '../components/ScreenHeader'
import { useEffect, useRef } from 'react'

const SongsScreen = () => {
  const { selectedIndex, navigateTo, currentScreen } = useNavigation()
  const { songs: musicSongs } = useMusic()
  const activeItemRef = useRef(null)

  const songs = currentScreen.songs || musicSongs

  const title = currentScreen.title || 'Songs'

  useEffect(() => {
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      })
    }
  }, [selectedIndex])

  return (
    <>
      <ScreenHeader title={title} />
      
      <ul className="menu">
        {songs.map((song, index) => (
          <li 
            key={song.id}
            ref={selectedIndex === index ? activeItemRef : null}
            className={selectedIndex === index ? 'active' : ''}
          >
            {song.name}
          </li>
        ))}
      </ul>
    </>
  )
}

export default SongsScreen

