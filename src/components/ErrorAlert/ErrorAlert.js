import classes from './ErrorAlert.module.scss'

const ErrorAlert = function () {
  return (
    <div className={classes['error-message']}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Flat_cross_icon.svg/512px-Flat_cross_icon.svg.png" alt="error" />
      <span>Error!</span>
    </div>
  )
}

export default ErrorAlert
