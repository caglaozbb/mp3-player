import { useNavigation } from '../context/NavigationContext'
import { useMusic } from '../context/MusicContext'
import { useMemo } from 'react'
import ScreenHeader from '../components/ScreenHeader'
import styles from '../styles/NowPlayingScreen.module.css'

const NowPlayingScreen = () => {
  const { currentScreen } = useNavigation()
  const { songs, currentSong, currentTime, duration, isPlaying } = useMusic()

  const song = currentSong || currentScreen.song || {
    name: 'No Song Playing',
    artist: 'Unknown',
    album: 'Unknown'
  }

  const totalSongs = songs.length
  const currentSongIndex = songs.findIndex(s => s.id === song.id) + 1 || 1

  const formatTime = (timeInSeconds) => {
    if (!timeInSeconds && timeInSeconds !== 0) return '0:00'
    
    const seconds = Math.floor(Math.abs(timeInSeconds))
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const progressPercentage = useMemo(() => {
    return duration > 0 ? (currentTime / duration) * 100 : 0
  }, [duration, currentTime])

  const formattedCurrentTime = useMemo(() => formatTime(currentTime), [currentTime])
  const formattedDuration = useMemo(() => formatTime(duration), [duration])

  return (
    <>
      <ScreenHeader title="Now Playing"/>
            
      <div className={styles.container}>
        <div className={styles.trackInfo}>
          {currentSongIndex} of {totalSongs}
        </div>
        
        <div className={styles.content}>
          <div className={styles.albumCover}>
            {song.coverArt ? (
              <img src={song.coverArt} alt={song.name} className={styles.coverImage} />
            ) : (
              <div className={styles.coverPlaceholder}>
                {song.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          
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
            <span>{formattedCurrentTime}</span>
            <span>{formattedDuration}</span>
          </div>
        </div>
        
        {/* <div className={styles.playingStatus}>
          {isPlaying ? '▶ Playing' : '⏸ Paused'}
        </div> */}
        
      </div>
    </>
  )
}

export default NowPlayingScreen
