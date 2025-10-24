import { useNavigation } from '../context/NavigationContext'
import ScreenHeader from '../components/ScreenHeader'

const MusicMenu = () => {
  const { selectedIndex, navigateTo } = useNavigation()

  const menuItems = [
    { label: 'Artists', action: () => navigateTo('artists') },
    { label: 'Albums', action: () => navigateTo('albums') },
    { label: 'Songs', action: () => navigateTo('songs') },
  ]

  return (
    <>
      <ScreenHeader title="Music" />
      
      <ul className="menu">
        {menuItems.map((item, index) => (
          <li 
            key={index} 
            className={`${selectedIndex === index ? 'active' : ''} arrow`}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </>
  )
}

export default MusicMenu

