import React, { useEffect } from 'react'
import classes from './TransferList.module.scss'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateFiltresBtn } from '../../redux/actionCreators'

const TransferList = function (props) {
  const { filterItems, updateFiltresBtn } = props

  let countSelectedFilters = 0

  const filters = [...filterItems].map(({ label, name, isCheck }) => {
    if (isCheck) {
      countSelectedFilters += 1
    }

    const onChange = (event) => {
      const newArrFilters = [...filterItems]

      if (name === 'all' && isCheck === false) {
        newArrFilters.map((el) => {
          el.isCheck = true
          return el
        })
      }
      if (name === 'all' && isCheck === true) {
        newArrFilters.map((el) => {
          el.isCheck = false
          return el
        })
      }
      if (name !== 'all') {
        newArrFilters.map((el) => {
          if (el.name === name) {
            el.isCheck = event.target.checked
            if (!event.target.checked) {
              countSelectedFilters -= 1
            }
          }
          if (el.name === 'all') {
            el.isCheck = false
          }
          return el
        })
      }

      if (countSelectedFilters === 3 && name !== 'all') {
        newArrFilters.map((el) => {
          el.isCheck = true
          return el
        })
      }
      updateFiltresBtn(newArrFilters)
    }

    return (
      <li key={name}>
        <label className={classes['checkbox-label']}>
          <input type="checkbox" className={classes['checkbox-input']} checked={isCheck} onChange={onChange} />
          <span className={classes['check-box']} />
          {label}
        </label>
      </li>
    )
  })

  return (
    <div className={classes.filters}>
      <div>Количество пересадок</div>
      <ul>{filters}</ul>
    </div>
  )
}
const mapStateToProps = ({ filterItems }) => ({ filterItems })

const mapDispathToProps = (dispatch) => ({
  updateFiltresBtn: (newFilters) => dispatch(updateFiltresBtn(newFilters)),
})

TransferList.propTypes = {
  filterItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateFiltresBtn: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispathToProps)(TransferList)
