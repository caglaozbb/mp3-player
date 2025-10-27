import { useNavigation } from '../context/NavigationContext'
import { useMusic } from '../context/MusicContext'
import ScreenHeader from '../components/ScreenHeader'
import { useEffect, useRef } from 'react'

const AlbumsScreen = () => {
  const { selectedIndex, navigateTo } = useNavigation()
  const { albums } = useMusic()
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
      <ScreenHeader title="Albums" />
      
      <ul className="menu">
        {albums.map((album, index) => (
          <li 
            key={album.id} 
            ref={selectedIndex === index ? activeItemRef : null}
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

