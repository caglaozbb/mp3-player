import { useState, useEffect } from 'react'
import ScreenHeader from '../components/ScreenHeader'
import styles from '../styles/ClockScreen.module.css'

const ClockScreen = () => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date) => {
    return date.toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

    const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <>
      <ScreenHeader title="Clock" />
      
      <div className={styles.content}>
        <div className={styles.time}>
          {formatTime(time)}
        </div>
        <div className={styles.date}>
          {formatDate(time)}
        </div>
      </div>
    </>
  )
}

export default ClockScreen

