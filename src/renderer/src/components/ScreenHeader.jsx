import batteryFull from '../assets/battery-full.png'

const ScreenHeader = ({ title, style }) => {
  return (
    <div className="screen-header" style={style}>
      {title}
      <img src={batteryFull} alt="battery-full" className="battery-icon"/>
    </div>
  )
}

export default ScreenHeader

