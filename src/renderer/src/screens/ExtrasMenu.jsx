import { useNavigation } from '../context/NavigationContext'
import ScreenHeader from '../components/ScreenHeader'

const ExtrasMenu = () => {
  const { selectedIndex, navigateTo } = useNavigation()

  const menuItems = [
    { label: 'Clock', action: () => navigateTo('clock') },
    { label: 'Themes', action: () => navigateTo('themes') },
  ]

  return (
    <>
      <ScreenHeader title="Extras" />
      
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

export default ExtrasMenu

