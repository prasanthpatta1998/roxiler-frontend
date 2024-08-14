import React from 'react'
import './components.css'

const Table = ({ sortedTransactions }) => {
  return (
    <div className='container2'>
      <table border="1" >
        <tr>
          <th>Id</th>
          <th>Title</th>
          <th>Description</th>
          <th>Price</th>
          <th>Category</th>
          <th>Sold</th>
          <th>Image</th>
        </tr>
        {
          sortedTransactions?.map((each) => [
            <tr>
              <td>{each?.id}</td>
              <td>{each?.title}</td>
              <td>{each?.description}</td>
              <td>{each?.price}</td>
              <td>{each?.category}</td>
              <td>{each?.sold ? "Yes" : "No"}</td>
              <td><img src={each.image} className='imgs' alt="img" /></td>
            </tr>
          ])
        }

      </table>
    </div>
  )
}

export default Table