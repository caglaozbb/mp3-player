import { useNavigation } from '../context/NavigationContext'
import ScreenHeader from '../components/ScreenHeader'

const ArtistsScreen = () => {
  const { selectedIndex, navigateTo } = useNavigation()

  // Sample artist data
  const artists = [
    { id: 1, name: 'Artist 1', songs: ['Song 1', 'Song 2', 'Song 3'] },
    { id: 2, name: 'Artist 2', songs: ['Song 4', 'Song 5'] },
    { id: 3, name: 'Artist 3', songs: ['Song 6', 'Song 7', 'Song 8'] },
    { id: 4, name: 'Artist 4', songs: ['Song 9'] },
    { id: 5, name: 'Artist 5', songs: ['Song 10', 'Song 11'] },
  ]

  return (
    <>
      <ScreenHeader title="Artists" />
      
      <ul className="menu">
        {artists.map((artist, index) => (
          <li 
            key={artist.id} 
            className={`${selectedIndex === index ? 'active' : ''} arrow`}
          >
            {artist.name}
          </li>
        ))}
      </ul>
    </>
  )
}

export default ArtistsScreen

