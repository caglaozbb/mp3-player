import { useNavigation } from '../context/NavigationContext'
import ScreenHeader from '../components/ScreenHeader'

const SongsScreen = () => {
  const { selectedIndex, navigateTo, currentScreen } = useNavigation()

  // Get songs from context or use default list
  const songs = currentScreen.songs || [
    { id: 1, name: 'Song 1', artist: 'Artist 1', duration: '3:45' },
    { id: 2, name: 'Song 2', artist: 'Artist 1', duration: '4:12' },
    { id: 3, name: 'Song 3', artist: 'Artist 2', duration: '3:20' },
    { id: 4, name: 'Song 4', artist: 'Artist 2', duration: '5:01' },
    { id: 5, name: 'Song 5', artist: 'Artist 3', duration: '2:58' },
    { id: 6, name: 'Song 6', artist: 'Artist 3', duration: '4:33' },
    { id: 7, name: 'Song 7', artist: 'Artist 4', duration: '3:15' },
    { id: 8, name: 'Song 8', artist: 'Artist 5', duration: '4:05' },
  ]

  const title = currentScreen.title || 'Songs'

  return (
    <>
      <ScreenHeader title={title} />
      
      <ul className="menu">
        {songs.map((song, index) => (
          <li 
            key={song.id} 
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

