import { useNavigation } from '../context/NavigationContext'
import { useMusic } from '../context/MusicContext'
import ScreenHeader from '../components/ScreenHeader'

const SettingsMenu = () => {
  const { selectedIndex } = useNavigation()
  const { volume, shuffle } = useMusic()

  const menuItems = [
    { label: 'Volume', value: `${Math.round(volume * 100)}%` },
    { label: 'Shuffle', value: shuffle ? 'On' : 'Off' },
  ]

  return (
    <>
      <ScreenHeader title="Settings" />
      
      <ul className="menu">
        {menuItems.map((item, index) => (
          <li 
            key={index} 
            className={selectedIndex === index ? 'active' : ''}
          >
            <span>{item.label}</span>
            <span className="muted">{item.value}</span>
          </li>
        ))}
      </ul>
    </>
  )
}

export default SettingsMenu

