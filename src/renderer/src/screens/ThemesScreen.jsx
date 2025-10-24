import { useNavigation } from '../context/NavigationContext'
import { useState, useEffect } from 'react'
import ScreenHeader from '../components/ScreenHeader'

const ThemesScreen = () => {
  const { selectedIndex } = useNavigation()
  const [activeTheme, setActiveTheme] = useState('default')

  useEffect(() => {
    const updateTheme = () => {
      const currentTheme = document.body.classList.contains('theme-blue') ? 'blue' : 'default'
      setActiveTheme(currentTheme)
    }
    
    updateTheme()
    
    window.addEventListener('themeChanged', updateTheme)
    
    return () => {
      window.removeEventListener('themeChanged', updateTheme)
    }
  }, [])

  const themes = [
    { id: 'default', name: 'Pink iPod' },
    { id: 'blue', name: 'Blue iPod' },
  ]

  return (
    <>
      <ScreenHeader title="Themes" />
      
      <ul className="menu">
        {themes.map((theme, index) => (
          <li 
            key={theme.id} 
            className={selectedIndex === index ? 'active' : ''}
          >
            <span>{theme.name}</span>
            {activeTheme === theme.id && <span>✓</span>}
          </li>
        ))}
      </ul>
    </>
  )
}

export default ThemesScreen

