import { createContext, useContext, useState } from 'react'

const NavigationContext = createContext()

export const useNavigation = () => {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider')
  }
  return context
}

export const NavigationProvider = ({ children }) => {
  const [history, setHistory] = useState([{ screen: 'main' }])
  const [selectedIndex, setSelectedIndex] = useState(0)

  const currentScreen = history[history.length - 1]

  const navigateTo = (screen, data = {}) => {
    setHistory([...history, { screen, ...data }])
    setSelectedIndex(0)
  }

  const goBack = () => {
    if (history.length > 1) {
      setHistory(history.slice(0, -1))
      setSelectedIndex(0)
    }
  }

  const goToMain = () => {
    setHistory([{ screen: 'main' }])
    setSelectedIndex(0)
  }

  const moveUp = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev))
  }

  const moveDown = (maxIndex) => {
    setSelectedIndex((prev) => (prev < maxIndex ? prev + 1 : prev))
  }

  const value = {
    currentScreen,
    selectedIndex,
    navigateTo,
    goBack,
    goToMain,
    moveUp,
    moveDown,
    setSelectedIndex,
  }

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>
}

