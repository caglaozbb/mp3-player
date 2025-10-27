import './assets/main.css'
import { NavigationProvider } from './context/NavigationContext'
import { MusicProvider } from './context/MusicContext'
import ScreenManager from './components/ScreenManager'
import WheelController from './components/WheelController'

function App() {
  return (
    <NavigationProvider>
      <MusicProvider>
        <div id="app">
          <div className="screen">
            <ScreenManager />
          </div>
          <WheelController />
        </div>
      </MusicProvider>
    </NavigationProvider>
  )
}

export default App
