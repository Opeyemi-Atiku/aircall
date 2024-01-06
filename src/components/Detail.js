import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
const Detail = () => {
    const { id } = useParams()
    const  navigate  = useNavigate()
    const [ call, setCall ] = useState({})
      const BASE_URL = 'https://cerulean-marlin-wig.cyclic.app/'

    useEffect(() => {
        const getCall = async () => {
            const dataFromServer = await fetchCall()
            setCall(dataFromServer)
        }
        getCall()
    }, [])

    

    const fetchCall = async () => {
        const res = await fetch(`${BASE_URL}/activities/${id}`)
        const data = await res.json()
        return data
    }

    return (
        <div>
            <div style={{zIndex: 2}} className={"active"}>
                <div className='d-flex'>
                    <button onClick={() => navigate(-1)} className='btn shadow'>Go back</button>
                    <h2>Call Detail</h2>
                </div>
                <hr/>
                <div className='callDetail shadow' style={{padding: '20px'}}>
                    <p>From: { call?.from }</p>
                    <p>Via: {call?.via}</p>
                    <p>Duration: {call?.duration}</p>
                    <p>Type: {call?.call_type}</p>
                    <p>Direction: {call?.direction}</p>
                    <p>To: {call?.to}</p>
                </div>
            </div>
        </div>
    )
}
export default Detail