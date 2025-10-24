import { useNavigation } from '../context/NavigationContext'
import ScreenHeader from '../components/ScreenHeader'

const MainMenu = () => {
  const { selectedIndex, navigateTo } = useNavigation()

  const menuItems = [
    { label: 'Music', action: () => navigateTo('music') },
    { label: 'Extras', action: () => navigateTo('extras') },
    { label: 'Settings', action: () => navigateTo('settings') },
    { label: 'Shuffle Songs', action: () => console.log('Shuffle songs') },
    { label: 'Now Playing', action: () => navigateTo('nowPlaying') },
  ]

  return (
    <>
      <ScreenHeader title="iPod mini" />
      
      <ul className="menu">
        {menuItems.map((item, index) => (
          <li 
            key={index} 
            className={`${selectedIndex === index ? 'active' : ''} ${['Music', 'Extras', 'Settings'].includes(item.label) ? 'arrow' : ''}`}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </>
  )
}

export default MainMenu

