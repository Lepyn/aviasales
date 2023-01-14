import classes from './NotFoundAlert.module.scss'

const NotFoundAlert = () => {
  return (
    <div className={classes.notFoundMessage}>
      <span>Рейсов, подходящих под заданные фильтры, не найдено!</span>
    </div>
  )
}

export default NotFoundAlert
