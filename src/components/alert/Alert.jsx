import { useEffect} from 'react'
// import classes from './Alert.module.scss'
import './Alert.scss'

const Alert = ({type, msg, removeAlert}) => {
  
  useEffect(() => {
    const timeout = setTimeout(()=>{
      removeAlert()
    }, 3000)
    return () => clearTimeout(timeout)
  },)

  return (
    <p className={`alert alert-${type}`}>{msg}</p>
    // <p className={`${classes.alert} ${classes.alert-`${type}`}`}>{msg}</p>
  )
}

export default Alert