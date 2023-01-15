import { connect } from 'react-redux'
import classes from './FiltresTickets.module.scss'
import PropTypes from 'prop-types'
import { updateSortBtn } from '../../redux/actionCreators'

const FiltresTickets = (props) => {
  const { sortButtons, updateSortBtn } = props
  const buttons = sortButtons.map(({ label, name, isActive }) => {
    let activedBtnStyle

    if (isActive) {
      activedBtnStyle = classes.active
    }

    const onClickBtn = () => {
      const updateSort = [...sortButtons].map((el) => {
        // if (el.name === name) {
        //   el.isActive = true
        // } else {
        //   el.isActive = false
        // }
        el.isActive = el.name === name
        return el
      })
      updateSortBtn(updateSort)
    }

    return (
      <div key={name} onClick={onClickBtn} onKeyDown={onClickBtn} role="button" tabIndex={0} className={activedBtnStyle}>
        {label}
      </div>
    )
  })
  return <div className={classes.sortButtons}>{buttons}</div>
}
const mapStateToProps = ({ sortButtons, updateSortBtn }) => ({ sortButtons, updateSortBtn })

const mapDispathToProps = (dispatch) => ({
  updateSortBtn: (newSortBtn) => dispatch(updateSortBtn(newSortBtn)),
})

FiltresTickets.defaultProps = {
  sortButtons: [],
}

FiltresTickets.propTypes = {
  sortButtons: PropTypes.arrayOf(PropTypes.object),
  updateSortBtn: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispathToProps)(FiltresTickets)
