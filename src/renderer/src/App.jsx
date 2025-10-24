import './assets/main.css'
import { NavigationProvider } from './context/NavigationContext'
import ScreenManager from './components/ScreenManager'
import WheelController from './components/WheelController'

function App() {
  return (
    <NavigationProvider>
      <div id="app">
        <div className="screen">
          <ScreenManager />
        </div>
        <WheelController />
      </div>
    </NavigationProvider>
  )
}

export default App
