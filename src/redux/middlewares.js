/*eslint-disable */
import { updatePacketTickets, toggleStop } from './actionCreators'

const _baseURL = 'https://aviasales-test-api.kata.academy'

export const getKey = async () => {
  const { searchId } = await fetch(`${_baseURL}/search/`).then((res) => {
    if (!res.ok) {
      throw new Error(`error fetch URL ${`${_baseURL}search`}, response status ${res.status}`)
    }
    return res.json()
  })

  return searchId
}

export const getTicketsDate = async (searchId) => {
  try {
    return await fetch(`${_baseURL}/tickets?searchId=${searchId}`).then((res) => {
      if (res.status === 500) {
        throw new Error(`error fetch URL ${_baseURL}, response status ${res.status}`)
      }
      return res.json()
    })
  } catch {
    return {
      tickets: [],
    }
  }
}

export const getPacketTickets = (searchId) => (dispatch) => {
  getTicketsDate(searchId).then(({ stop, tickets }) => {
    dispatch(updatePacketTickets(tickets))
    if (stop) {
      dispatch(toggleStop(stop))
    }
  })
}