import React, { useEffect, useState } from 'react'
import Table from './components/table'
import Statitics from './components/Statitics'
import Piechart from './components/Piechart'
import { Bar } from "react-chartjs-2"
import axios from "axios"
import './App.css'

import { Chart, LinearScale, BarElement, CategoryScale, Legend, Title, Tooltip } from 'chart.js'
Chart.register(
  LinearScale, BarElement, CategoryScale, Legend, Title, Tooltip
)



const App = () => {

  const [month, setMonth] = useState(2)
  const [input, setInput] = useState("")
  const [total, setTotal] = useState(0)
  const [sold, setSold] = useState(0)
  const [unsold, setUnsold] = useState(0)
  const [barGraph, setBarGraph] = useState([])
  const [piechartdata, setPiechartdata] = useState([])
  const [transactions, setTransactions] = useState([])
  const sortedTransactions = transactions.filter((each) => {
    return each.title.toLowerCase().includes(input.toLowerCase()) || each.description.includes(input) || each.price.toString().includes(input)
  })

  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 10
  const lastIndex = currentPage * recordsPerPage
  const firstIndex = lastIndex - recordsPerPage
  const records = sortedTransactions.slice(firstIndex, lastIndex)

  const npage = Math.ceil(transactions.length / recordsPerPage)
  const numbers = [...Array(npage + 1).keys()].slice(1)





  console.log(month)
  console.log(input)

  const OnChangeEvent = (e) => {
    setInput(e.target.value)
  }




  useEffect(() => {
    axios.get(`http://localhost:5000/list-transactions?month=${month}`)
      .then((res) => {
        console.log(res.data)
        setTransactions(res.data)
      })
      .catch((err) => {
        console.log(err)
      })

  }, [month])


  useEffect(() => {
    axios.get(`http://localhost:5000/statistics?month=${month}`)
      .then((res) => {
        setTotal(res.data.totalSaleAmount)
        setSold(res.data.totalSoldItems)
        setUnsold(res.data.totalNotSoldItems)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [month])

  useEffect(() => {
    axios.get(`http://localhost:5000/bar-chart?month=${month}`)
      .then((res) => {
        const object = res.data
        const values = Object.keys(object).map(key => object[key])
        setBarGraph(values)
        console.log(values)
      })
  }, [month])


  useEffect(() => {
    axios.get(`http://localhost:5000/pie-chart-api?month=${month}`)
      .then((res) => {
        console.log("pie-chartttt", res.data)
        setPiechartdata(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [month])

  const labels = ["0-100", "101-200", "201-300", "301-400", "401-500", "501-600", "601-700", "701-800", "801-900", "901-above"]
  const data = {
    labels,
    datasets: [
      {
        label: "Sold Items in Price Range",
        data: barGraph,
        backgroundColor: "yellowgreen"
      }
    ]
  }



  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const changePage = (id) => {
    setCurrentPage(id)
  }

  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1)
    }
  }



  return (
    <div className='dashboard'>
      <div className='head'>Transaction <br/> Dashboard</div>
      <div className='searchContainer'>
        <input type='search' className='search' placeholder='Enter Title' onChange={(e) => OnChangeEvent(e)} />
        <select className='select' onClick={(e) => setMonth(e.target.value)}>
          <option value={0}>Jan</option>
          <option value={1}>Feb</option>
          <option value={2} selected>Mar</option>
          <option value={3}>April</option>
          <option value={4}>May</option>
          <option value={5}>Jun</option>
          <option value={6}>Jul</option>
          <option value={7}>Aug</option>
          <option value={8}>Sep</option>
          <option value={9}>Oct</option>
          <option value={10}>Nov</option>
          <option value={11}>Dec</option>
        </select>
      </div>

      <Table sortedTransactions={records} />

      <div className='actions'>
        <div>
          <p className='p'>Page No: {currentPage}</p>
        </div>

        <nav>
          <ul className='pagination'>
            <li className='page-item'>
              <a href='#' className='page-link' onClick={prePage}>Prev</a>
            </li>
            {
              numbers.map((n, i) => (
                <li className={`page-item ${currentPage === n ? "active" : ""}`} key={i}>
                  <a href='#' className='page-link' onClick={() => changePage(n)}>
                    {n}
                  </a>
                </li>
              ))
            }
            <li className='page-item'>
              <a href='#' className='page-link' onClick={nextPage}>Next</a>
            </li>
          </ul>
        </nav>

        <div>
          <p className='p2'>Per Page: {10}</p>
        </div>

      </div>

      <Statitics sold={sold} unsold={unsold} total={total} month={month} />

      <div className='barchart'>
        <h1>Bar Chart Stats of {parseInt(month) + 1} month</h1>
        <Bar data={data} />
      </div>

      <div className='pie'>
        <Piechart data={piechartdata} month={month} />
      </div>
    </div>
  )
}

export default App