import { useNavigation } from '../context/NavigationContext'
import ScreenHeader from '../components/ScreenHeader'

const AlbumsScreen = () => {
  const { selectedIndex, navigateTo } = useNavigation()

  // Sample album data
  const albums = [
    { id: 1, name: 'Album 1', artist: 'Artist 1', songs: ['Song 1', 'Song 2'] },
    { id: 2, name: 'Album 2', artist: 'Artist 2', songs: ['Song 3', 'Song 4'] },
    { id: 3, name: 'Album 3', artist: 'Artist 3', songs: ['Song 5', 'Song 6'] },
    { id: 4, name: 'Album 4', artist: 'Artist 1', songs: ['Song 7', 'Song 8'] },
  ]

  return (
    <>
      <ScreenHeader title="Albums" />
      
      <ul className="menu">
        {albums.map((album, index) => (
          <li 
            key={album.id} 
            className={`${selectedIndex === index ? 'active' : ''} arrow`}
          >
            {album.name}
          </li>
        ))}
      </ul>
    </>
  )
}

export default AlbumsScreen

