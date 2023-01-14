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

export const initialState = {
  filterItems: [
    { label: 'Все', name: 'all', isCheck: true },
    { label: 'Без пересадок', name: '0', isCheck: true },
    { label: '1 пересадка', name: '1', isCheck: true },
    { label: '2 пересадки', name: '2', isCheck: true },
    { label: '3 пересадки', name: '3', isCheck: true },
  ],
  sortButtons: [
    { name: 'cheap', label: 'Самый дешевый', isActive: true },
    { name: 'quick', label: 'Самый быстрый', isActive: false },
    { name: 'optimal', label: 'Оптимальный', isActive: false },
  ],
  searchId: '',
  packetTickets: [],
  ticketsCount: 5,
  isStop: false,
  error: null,
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FILTRES_BTN:
      return {
        ...state,
        filterItems: action.payload,
      }
    case GET_SEARCH_ID:
      return {
        ...state,
        searchId: action.payload,
      }
    case UPDATE_PACKET_TICKETS:
      return {
        ...state,
        packetTickets: [...state.packetTickets, ...action.payload],
      }
    case TOGGLE_STOP:
      return {
        ...state,
        isStop: action.payload,
      }
    case TICKETS_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case UPDATE_TICKETS_COUNT:
      return {
        ...state,
        ticketsCount: action.payload,
      }
    case UPDATE_SORT_BTN:
      return {
        ...state,
        sortButtons: action.payload,
      }
    case UPDATE_BOOL_LOADER:
      return {
        ...state,
        isStop: action.payload,
      }
    default:
      return state
  }
}
export default rootReducer
