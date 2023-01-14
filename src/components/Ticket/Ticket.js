import React from 'react'
import classes from './Ticket.module.scss'
import { format } from 'date-fns'
import PropTypes from 'prop-types'

const Ticket = ({ ticket }) => {
  const { price, segments, carrier } = ticket

  const segmentsZero = segments[0]
  const segmentsOne = segments[1]

  const dateTimeFormat = (duration) => {
    return `${Math.trunc(duration / 60)}ч ${duration % 60}м`
  }

  const transferTimeFormat = (data, duration) => {
    const startDate = format(new Date(data), 'HH:mm')
    const endDate = format(new Date(new Date(data).getTime() + duration * 60000), 'HH:mm')
    return `${startDate} - ${endDate}`
  }
  const formPrise = (num) => String(num).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')

  const transfersNumFormat = (transfer) => {
    const textForms = ['ПЕРЕСАДКА', 'ПЕРЕСАДКИ', 'ПЕРЕСАДОК']
    let form = ''
    if (transfer >= 4) form += textForms[2]
    if (transfer > 1 && transfer <= 4) form += textForms[1]
    if (transfer === 1) form += textForms[0]

    return transfer ? `${transfer} ${form}` : ' '
  }

  const plugImg = `https://www.ixbt.com/img/x780x600/n1/news/2022/10/3/16678931921848256_large.jpg`
  const logoCompanyURL = `//pics.avs.io/99/36/${carrier}.png`
  const logoCompany = carrier ? logoCompanyURL : plugImg

  return (
    <div className={classes.ticket}>
      <header className={classes.ticket__header}>
        <h2 className={classes.ticket__price}> {formPrise(price)}₽</h2>
        <img className={classes.ticket__logo} style={{ width: 110, height: 36 }} src={logoCompany} />
      </header>
      <div className={classes.info}>
        <div className={classes.info__cities}>
          {`${segmentsZero.origin} - ${segmentsZero.destination}`}
          <span className={classes.info__cities__time}>{transferTimeFormat(segmentsZero.date, segmentsZero.duration)}</span>
        </div>
        <div className={classes.info__way}>
          В пути
          <span className={classes.info__way__hour}>{dateTimeFormat(segmentsZero.duration)}</span>
        </div>
        <div className={classes.info__transfer}>
          {transfersNumFormat(segmentsZero.stops.length)}
          <span className={classes.info__transfer__place}>{segmentsZero.stops.join(', ')}</span>
        </div>
      </div>
      <div className={classes.info}>
        <div className={classes.info__cities}>
          {`${segmentsOne.origin} - ${segmentsOne.destination}`}
          <span className={classes.info__cities__time}>{transferTimeFormat(segmentsOne.date, segmentsOne.duration)}</span>
        </div>
        <div className={classes.info__way}>
          В пути
          <span className={classes.info__way__hour}>{dateTimeFormat(segmentsOne.duration)}</span>
        </div>
        <div className={classes.info__transfer}>
          {transfersNumFormat(segmentsOne.stops.length)}
          <span className={classes.info__transfer__place}>{segmentsOne.stops.join(', ')}</span>
        </div>
      </div>
    </div>
  )
}

Ticket.propTypes = {
  ticket: PropTypes.object.isRequired,
}

export default Ticket
