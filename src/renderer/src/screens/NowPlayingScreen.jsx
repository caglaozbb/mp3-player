import { useNavigation } from '../context/NavigationContext'
import ScreenHeader from '../components/ScreenHeader'
import styles from '../styles/NowPlayingScreen.module.css'

const NowPlayingScreen = () => {
  const { currentScreen } = useNavigation()

  // Sample data - replace with real data from your music player
  const song = currentScreen.song || {
    name: 'Bohemian Rhapsody',
    artist: 'Queen',
    album: 'A Night at the Opera',
    duration: 354, 
    currentTime: 78 
  }

  const totalSongs = 240
  const currentSongIndex = 18

  const formatTime = (time) => {
    if (!time && time !== 0) return '0:00'
    
    let seconds = time
    
    if (typeof time === 'string' && time.includes(':')) {
      const parts = time.split(':')
      const mins = parseInt(parts[0]) || 0
      const secs = parseInt(parts[1]) || 0
      seconds = mins * 60 + secs
    } else {
      seconds = parseInt(time) || 0
    }
    
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getDuration = () => {
    if (!song.duration) return 100
    if (typeof song.duration === 'string' && song.duration.includes(':')) {
      const parts = song.duration.split(':')
      return (parseInt(parts[0]) || 0) * 60 + (parseInt(parts[1]) || 0)
    }
    return parseInt(song.duration) || 100
  }

  const getCurrentTime = () => {
    if (!song.currentTime && song.currentTime !== 0) return 0
    if (typeof song.currentTime === 'string' && song.currentTime.includes(':')) {
      const parts = song.currentTime.split(':')
      return (parseInt(parts[0]) || 0) * 60 + (parseInt(parts[1]) || 0)
    }
    return parseInt(song.currentTime) || 0
  }

  const durationSeconds = getDuration()
  const currentSeconds = getCurrentTime()
  const progressPercentage = durationSeconds > 0 ? (currentSeconds / durationSeconds) * 100 : 0

  return (
    <>
      <ScreenHeader title="Now Playing" style={{ fontSize: '20px' }} />
            
      <div className={styles.container}>
        <div className={styles.trackInfo}>
          {currentSongIndex} of {totalSongs}
        </div>
        
        <div className={styles.content}>
          <div className={styles.albumCover}></div>
          
          <div className={styles.details}>
            <div className={styles.songTitle}>{song.name}</div>
            <div className={styles.artistName}>{song.artist}</div>
            <div className={styles.albumName}>{song.album}</div>
          </div>
        </div>
        
        <div className={styles.progressSection}>
          <div className={styles.progressBarContainer}>
            <div 
              className={styles.progressBar} 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className={styles.timeDisplay}>
          <span>{formatTime(song.currentTime)}</span>
          <span>{formatTime(song.duration)}</span>
        </div>
        </div>
        
      </div>
    </>
  )
}

export default NowPlayingScreen
