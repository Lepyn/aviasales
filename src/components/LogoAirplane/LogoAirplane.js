import classes from './LogoAirplane.module.scss'
import logo from '../../img/logo.svg'

const Header = () => {
  return (
    <header className={classes.header}>
      <div>
        <a>
          <img src={logo} alt="logo" />
        </a>
      </div>
    </header>
  )
}

export default Header
