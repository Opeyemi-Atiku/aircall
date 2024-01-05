import { useState, useEffect } from 'react'
import { Route, Routes, Link, useLocation } from 'react-router-dom'
import AllCalls from './components/AllCalls'
import ArchivedCalls from './components/ArchivedCalls'
import Detail from './components/Detail'

function App() {
  const [ calls, setCalls ] = useState([])

  const location = useLocation()
  const BASE_URL = 'https://cerulean-marlin-wig.cyclic.app/'

  useEffect(() => {
    const getCalls = async () => {
      const callsFromServer = await fetchCalls()
      setCalls(callsFromServer)
    }

    getCalls()
  }, [])

  // Fetch Calls
  const fetchCalls = async () => {
    let res = null
    try{
      res = await fetch(`${BASE_URL}/activities`)
    }
    catch(error) {
      console.log(error)
    }
    const data = await res.json()
    return data
  }

  const archiveAll = async () => {
    calls.forEach((call) => {
      try{
        fetch(`${BASE_URL}/activities/${call.id}`, {
          method: 'PATCH',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({...call, is_archived: true})
        })
      }
      catch (error) {
        console.log(error)
      }
    })
    const data = await fetchCalls()
    setCalls(data)
  }

  const unArchiveAll = async () => {
    calls.forEach((call) => {
      try{
        fetch(`${BASE_URL}/activities/${call.id}`, {
          method: 'PATCH',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({...call, is_archived: false})
        })
      }
      catch (error) {
        console.log(error)
      }
    })

    const data = await fetchCalls()
    setCalls(data)
  }
  const archiveCall = async (call) => {
    try {
      fetch(`${BASE_URL}/activities/${call.id}`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({...call, is_archived: true})
      })
    }
    catch(error) {
      console.log(error)
    }
    

    const data = await fetchCalls()
    setCalls(data)
  }

  const unArchiveCall = async (call) => {
    try {
      fetch(`${BASE_URL}/activities/${call.id}`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({...call, is_archived: false})
      })
    }
    catch(error) {
      console.log(error)
    }

    const data = await fetchCalls()
    setCalls(data)
  }

  const countArchive = () => {
    let count = 0
    calls.forEach((call) => {
      if(call.is_archived === true && call.from) count++
    })
    return count
  }

  const allCallsCount = () => {
    let count = 0
    calls.forEach((call) => {
      if(call.from && call.is_archived === false) count++
    })
    return count
  }

  return (
      <section className="tabs">
        <menu>
          <ul>
            <Link to='/'>
              <li 
                className={`tab ${location.pathname === '/' || location.pathname.includes('/call') ? 'active' : ''}`}
                style={{ zIndex: 2 }}
              >
                Activity <span className='numberLabel'>{allCallsCount()}</span>
              </li>
            </Link>
            <Link to='/archived-calls'>
              <li 
                className={`tab ${location.pathname === '/archived-calls' && 'active'}`}
                style={{ zIndex: 1 }}
              >
                  Archived Calls <span className='numberLabel'>{countArchive()}</span>
              </li>
            </Link>
          </ul>
        </menu>
        <Routes>
          <Route path='/' element={<AllCalls archiveAll={archiveAll} onArchive={archiveCall} calls={calls}/>} />
          <Route path='/archived-calls' element={<ArchivedCalls unArchiveAll={unArchiveAll} onUnArchive={unArchiveCall} calls={calls}/>} />
          <Route path='/call/:id' element={<Detail />} />
        </Routes>
      </section>
  );
}

export default App;





