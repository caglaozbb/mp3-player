import { useNavigation } from '../context/NavigationContext'
import ScreenHeader from '../components/ScreenHeader'

const SettingsMenu = () => {
  const { selectedIndex } = useNavigation()

  const menuItems = [
    { label: 'Volume', value: '50%' },
    { label: 'Shuffle', value: 'Off' },
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

