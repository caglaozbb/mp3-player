import { createContext, useContext, useState, useRef, useEffect } from 'react'
import { Howl } from 'howler'
import * as mm from 'music-metadata'

const MusicContext = createContext()

export const useMusic = () => {
  const context = useContext(MusicContext)
  if (!context) {
    throw new Error('useMusic must be used within MusicProvider')
  }
  return context
}

export const MusicProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.5) 
  const [shuffle, setShuffle] = useState(false) 
  const [songs, setSongs] = useState([])
  const [isLoadingSongs, setIsLoadingSongs] = useState(true)
  const soundRef = useRef(null)
  const animationRef = useRef(null)
  const playedSongsRef = useRef([])

  useEffect(() => {
    let isMounted = true 
    
    const loadSongsMetadata = async () => {
      if (!isMounted) return
      setIsLoadingSongs(true)
      
      const songFiles = [
        { file: 'zehir.mp3' },
        { file: 'ruya.mp3' },
        { file: 'snap.mp3' },
        { file: 'gabriela.mp3' },
        { file: 'mia.mp3' },
        { file: 'creep.mp3' },
        { file: 'nosuprises.mp3' },
        { file: 'letithappen.mp3' },
        { file: 'theless.mp3' }
      ]

      const loadedSongs = []

      for (let i = 0; i < songFiles.length; i++) {
        const fileName = songFiles[i].file
        const fileUrl = new URL(`../assets/songs/${fileName}`, import.meta.url).href
        
        const response = await fetch(fileUrl)
        const blob = await response.blob()
        const metadata = await mm.parseBlob(blob)
        
        let coverArt = null
        if (metadata.common.picture?.[0]) {
          const picture = metadata.common.picture[0]
          let binary = ''
          for (let i = 0; i < picture.data.length; i++) {
            binary += String.fromCharCode(picture.data[i])
          }
          const base64 = btoa(binary)
          coverArt = `data:${picture.format};base64,${base64}`
        }
        
        const song = {
          id: i + 1,
          name: metadata.common.title || fileName.replace('.mp3', ''),
          artist: metadata.common.artist || 'Unknown Artist',
          album: metadata.common.album || 'Unknown Album',
          year: metadata.common.year || null,
          genre: metadata.common.genre?.[0] || null,
          file: fileUrl,
          duration: metadata.format.duration || 0,
          coverArt
        }
        
        loadedSongs.push(song)
      }

      if (!isMounted) return
      
      setSongs(loadedSongs)
      setIsLoadingSongs(false)
    }

    loadSongsMetadata()
    
    return () => {
      isMounted = false
    }
  }, [])

  const artists = [...new Set(songs.map(song => song.artist))].map((artistName, index) => ({
    id: index + 1,
    name: artistName,
    songs: songs.filter(song => song.artist === artistName)
  }))

  const albums = [...new Set(songs.map(song => song.album))].map((albumName, index) => {
    const albumSongs = songs.filter(song => song.album === albumName)
    return {
      id: index + 1,
      name: albumName,
      artist: albumSongs[0]?.artist || 'Unknown',
      songs: albumSongs
    }
  })

  useEffect(() => {
    const updateTime = () => {
      if (soundRef.current) {
        const isCurrentlyPlaying = soundRef.current.playing()
        const seek = soundRef.current.seek()
        
        if (isCurrentlyPlaying && typeof seek === 'number') {
          setCurrentTime(seek)
          animationRef.current = requestAnimationFrame(updateTime)
        }
      }
    }

    if (isPlaying && soundRef.current) {
      updateTime()
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying])

  const loadSong = (song, autoPlay = false) => {
    if (soundRef.current) {
      soundRef.current.unload()
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }

    setCurrentSong(song)
    setIsPlaying(false)
    setCurrentTime(0)
    
    const sound = new Howl({
      src: [song.file],
      html5: false,
      preload: true,
      autoplay: false, 
      volume: volume,
      onload: function() {
        const dur = sound.duration()
        setDuration(typeof dur === 'number' && dur > 0 ? dur : 0)
        
        if (autoPlay && !sound.playing()) {
          setTimeout(() => {
            sound.play()
          }, 100)
        }
      },
      onloaderror: function() {
        setIsPlaying(false)
      },
      onplayerror: function() {
        setIsPlaying(false)
      },
      onend: function() {
        setIsPlaying(false)
        setCurrentTime(0)
      },
      onplay: function() {
        setIsPlaying(true)
      },
      onpause: function() {
        setIsPlaying(false)
      },
      onstop: function() {
        setIsPlaying(false)
      }
    })

    soundRef.current = sound
  }

  const togglePlay = () => {
    if (!soundRef.current) return

    if (isPlaying) {
      soundRef.current.pause()
    } else {
      soundRef.current.play()
    }
  }

  const seekTo = (time) => {
    if (soundRef.current) {
      soundRef.current.seek(time)
      setCurrentTime(time)
    }
  }

  const changeVolume = (newVolume) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume))
    setVolume(clampedVolume)
    if (soundRef.current) {
      soundRef.current.volume(clampedVolume)
    }
  }

  const toggleShuffle = () => {
    setShuffle(!shuffle)
    playedSongsRef.current = []
  }

  const playNext = () => {
    if (!currentSong) return
    
    let nextSong
    
    if (shuffle) {
      playedSongsRef.current.push(currentSong.id)
      
      if (playedSongsRef.current.length >= songs.length) {
        playedSongsRef.current = [currentSong.id]
      }
      
      const unplayedSongs = songs.filter(s => !playedSongsRef.current.includes(s.id))
      
      const randomIndex = Math.floor(Math.random() * unplayedSongs.length)
      nextSong = unplayedSongs[randomIndex]
    } else {
      const currentIndex = songs.findIndex(s => s.id === currentSong.id)
      const nextIndex = (currentIndex + 1) % songs.length
      nextSong = songs[nextIndex]
    }
    
    const shouldAutoPlay = isPlaying
    loadSong(nextSong, shouldAutoPlay)
  }

  const playPrevious = () => {
    if (!currentSong) return
    
    const currentIndex = songs.findIndex(s => s.id === currentSong.id)
    const prevIndex = currentIndex - 1 < 0 ? songs.length - 1 : currentIndex - 1
    const prevSong = songs[prevIndex]
    
    const shouldAutoPlay = isPlaying
    loadSong(prevSong, shouldAutoPlay)
  }

  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unload()
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  const value = {
    songs,
    artists,
    albums,
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    shuffle,
    isLoadingSongs,
    loadSong,
    togglePlay,
    seekTo,
    changeVolume,
    toggleShuffle,
    playNext,
    playPrevious
  }

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>
}

