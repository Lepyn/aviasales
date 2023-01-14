import { useEffect } from 'react'
import classes from './App.module.scss'
import TransferList from '../TransferList/TransferList'
import FiltresTickets from '../FiltresTickets/FiltresTickets'
import LogoAirplane from '../LogoAirplane/LogoAirplane'
import TicketList from '../TicketList/TicketList'
import Loader from '../Loader/Loader'
import PropTypes from 'prop-types'
import { getKey, getPacketTickets } from '../../redux/middlewares'
import { updateSearchId, ticketsError } from '../../redux/actionCreators'
import { connect } from 'react-redux'

const App = (props) => {
  const { updateSearchId, getPacketTickets, packetTickets, error, isStop, searchId, ticketsError } = props

  useEffect(() => {
    getKey()
      .then((searchId) => {
        updateSearchId(searchId)
        getPacketTickets(searchId)
      })
      .catch((error) => {
        if (error === 500) ticketsError(error)
      })
  }, [])

  useEffect(() => {
    if (error === null && isStop === false) {
      getPacketTickets(searchId)
    }
  }, [packetTickets, error, searchId])

  return (
    <div className={classes.app}>
      <LogoAirplane />
      <main className={classes.main}>
        {!error ? <Loader /> : null}
        <TransferList />
        <FiltresTickets />
        <TicketList />
      </main>
    </div>
  )
}
const mapStateToProps = ({ error, isStop, searchId, packetTickets }) => ({ error, isStop, searchId, packetTickets })

const mapDispathToProps = (dispatch) => ({
  getPacketTickets: (packetTickets) => dispatch(getPacketTickets(packetTickets)),
  updateSearchId: (searchId) => dispatch(updateSearchId(searchId)),
  ticketsError: (error) => dispatch(ticketsError(error)),
})

App.defaultProps = {
  packetTickets: [],
  error: false,
  isStop: false,
  searchId: '',
}

App.propTypes = {
  packetTickets: PropTypes.arrayOf(PropTypes.object),
  updateSearchId: PropTypes.func.isRequired,
  getPacketTickets: PropTypes.func.isRequired,
  ticketsError: PropTypes.func.isRequired,
  error: PropTypes.bool,
  isStop: PropTypes.bool,
  searchId: PropTypes.string,
}

export default connect(mapStateToProps, mapDispathToProps)(App)
