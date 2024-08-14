import React from 'react'

const Statitics = ({ total, sold, unsold, month }) => {
  return (
    <div className='statitics'>
      <h2 style={{marginBottom: '15px'}}>Statistics {parseInt(month) + 1} month</h2>
      <div className='subStatistics'>
        <div>
          <p>Total Sale</p>
          <p>Total sold items </p>
          <p>Total not sold items</p>
        </div>
        <div>
          <p>{total}</p>
          <p>{sold}</p>
          <p>{unsold}</p>
        </div>
      </div>
    </div>
  )
}

export default Statitics