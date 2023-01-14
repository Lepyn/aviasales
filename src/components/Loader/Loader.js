import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import LoadingBar from 'react-top-loading-bar'
import classes from './Loader.module.scss'

const Loader = (props) => {
  const { isStop, packetTickets } = props
  const [loaderLabel, setLoaderLabel] = useState('Загружаем билеты...')
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!isStop) {
      setCount(count + 4)
    } else {
      setCount(100)
    }
  }, [isStop, packetTickets])

  const onLoaderFinished = () => {
    setLoaderLabel(null)
  }

  return (
    <div className={classes.loaderWrapper}>
      <LoadingBar containerClassName={classes.loader} height="6px" color="#2196F3" progress={count} shadow={false} onLoaderFinished={onLoaderFinished} />
      <span>{loaderLabel}</span>
    </div>
  )
}

Loader.defaultProps = {
  packetTickets: [],
}

Loader.propTypes = {
  isStop: PropTypes.bool.isRequired,
  packetTickets: PropTypes.arrayOf(PropTypes.object),
}

const mapStateToProps = ({ isStop, packetTickets }) => ({ isStop, packetTickets })

export default connect(mapStateToProps)(Loader)
