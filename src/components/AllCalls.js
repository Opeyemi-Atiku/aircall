import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxArchive } from '@fortawesome/free-solid-svg-icons'
import Call from './Call'
const AllCalls = ({ calls, archiveAll, onArchive, callsCount }) => {
    const countCall = (from) => {
        let count = 0
        calls.forEach(call => {
            if(call?.from === from) count++    
        });

        return count
    }

    return (
        <div>
            <div style={{zIndex: 2}} className={"active"}>
                <div className='d-flex'>
                    <h2>All Calls</h2>
                    <button onClick={archiveAll} className='btn shadow'><FontAwesomeIcon className='btn-icon' icon={faBoxArchive} /> Archive all calls</button>
                </div>
                <hr/>
                {callsCount < 1 ? <p className='no-calls'>No calls available</p> : ''}
                {calls.map((call, index) => (call?.from && call?.is_archived === false ? <Call countCall={countCall} onArchive={onArchive} key={call?.id} call={call} /> : ''))}
            </div>
        </div>
    )
}
export default AllCalls