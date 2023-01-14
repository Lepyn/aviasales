/* eslint-disable */
import React from 'react'
import Ticket from '../Ticket/Ticket'
import PropTypes from 'prop-types'
import classes from './TicketList.module.scss'
import { updateTicketCount } from '../../redux/actionCreators'
import { connect } from 'react-redux'
import { nanoid } from 'nanoid'
import ErrorAlert from '../ErrorAlert/ErrorAlert'
import NotFoundAlert from '../NotFoundAlert/NotFoundAlert'

const TicketList = (props) => {
  const { packetTickets, filterItems, sortButtons, error, ticketsCount, updateTicketCount } = props

  const selectedFilterArr = filterItems.map((el) => (el.isCheck ? Number(el.name) : null)).filter((item) => item !== null)

  const newPacketTickets = packetTickets.map((el) => {
    const sumMin = el.segments[0].duration + el.segments[1].duration
    el.sumMin = sumMin
    const sumTimeAndPrice = el.sumMin + el.price
    el.sumTimeAndPrice = sumTimeAndPrice
    return el
  })

  const filtrationArr = newPacketTickets.filter((item) => {
    const transfersThere = item.segments[0].stops.length

    const transfersBack = item.segments[1].stops.length

    if (selectedFilterArr.includes(transfersThere) && selectedFilterArr.includes(transfersBack)) {
      return item
    }
  })

  const sorting = (arr, name) => {
    switch (name) {
      case 'cheap':
        arr.sort((a, b) => (a.price > b.price ? 1 : -1))
        break
      case 'quick':
        arr.sort((a, b) => (a.sumMin > b.sumMin ? 1 : -1))
        break
      case 'optimal':
        arr.sort((a, b) => (a.sumMinAndPrace > b.sumMinAndPrace ? 1 : -1))
        break
      default:
        return []
    }

    return arr
  }
  const sortValueStr = sortButtons.find((el) => el.isActive).name

  const startedTicketsPack = sorting(filtrationArr, sortValueStr).map((el, i) => {
    if (i < ticketsCount) {
      return <Ticket key={nanoid(5)} ticket={el}></Ticket>
    }
  })

  const showMore = () => {
    updateTicketCount(ticketsCount + 5)
  }

  const alertNotFound = !filtrationArr.length && !error ? <NotFoundAlert /> : null

  const errorShow = error !== null ? <ErrorAlert /> : null
  //  if (startedTicketsPack.length !== 0) { }
  return (
    <>
      <div className={classes.flight_list}>
        {startedTicketsPack}
        {startedTicketsPack.length !== 0 && (
          <button className={classes.button} type="button" onClick={showMore}>
            Показать еще 5 билетов!
          </button>
        )}

        {alertNotFound}
        {errorShow}
      </div>
    </>
  )
}
const mapStateToProps = ({ packetTickets, filterItems, sortButtons, error, ticketsCount }) => ({
  packetTickets,
  filterItems,
  sortButtons,
  error,
  ticketsCount,
})

const mapDispathToProps = (dispatch) => ({
  updateTicketCount: (count) => dispatch(updateTicketCount(count)),
})

TicketList.defaultProps = {
  packetTickets: [],
  error: null,
}

TicketList.propTypes = {
  packetTickets: PropTypes.arrayOf(PropTypes.object),
  filterItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortButtons: PropTypes.arrayOf(PropTypes.object).isRequired,
  error: PropTypes.object,
  ticketsCount: PropTypes.number.isRequired,
}

export default connect(mapStateToProps, mapDispathToProps)(TicketList)
