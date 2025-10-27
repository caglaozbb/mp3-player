import { useNavigation } from '../context/NavigationContext'
import { useMusic } from '../context/MusicContext'
import ScreenHeader from '../components/ScreenHeader'
import { useEffect, useRef } from 'react'

const ArtistsScreen = () => {
  const { selectedIndex, navigateTo } = useNavigation()
  const { artists } = useMusic()
  const activeItemRef = useRef(null)

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
      <ScreenHeader title="Artists" />
      
      <ul className="menu">
        {artists.map((artist, index) => (
          <li 
            key={artist.id}
            ref={selectedIndex === index ? activeItemRef : null}
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

