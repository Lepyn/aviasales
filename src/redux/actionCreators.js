import {
  GET_SEARCH_ID,
  UPDATE_FILTRES_BTN,
  UPDATE_PACKET_TICKETS,
  TOGGLE_STOP,
  TICKETS_ERROR,
  UPDATE_TICKETS_COUNT,
  UPDATE_SORT_BTN,
  UPDATE_BOOL_LOADER,
} from './types'

export const updateSearchId = (searchId) => {
  return {
    type: GET_SEARCH_ID,
    payload: searchId,
  }
}

export const updateFiltresBtn = (newFiltres) => {
  return {
    type: UPDATE_FILTRES_BTN,
    payload: newFiltres,
  }
}

export const updateSortBtn = (sortButton) => {
  return {
    type: UPDATE_SORT_BTN,
    payload: sortButton,
  }
}

export const updatePacketTickets = (packetTickets) => ({
  type: UPDATE_PACKET_TICKETS,
  payload: packetTickets,
})

export const toggleStop = (booleanValue) => ({
  type: TOGGLE_STOP,
  payload: booleanValue,
})

export const ticketsError = (error) => ({
  type: TICKETS_ERROR,
  payload: error,
})

export const updateTicketCount = (count) => ({
  type: UPDATE_TICKETS_COUNT,
  payload: count,
})

export const updateBoolLoader = (stoping) => ({
  type: UPDATE_BOOL_LOADER,
  payload: stoping,
})
