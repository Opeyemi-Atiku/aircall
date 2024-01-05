import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxArchive } from '@fortawesome/free-solid-svg-icons'
import Call from './Call'
const ArchivedCalls = ({ calls, unArchiveAll, onUnArchive}) => {
    const countCall = (from) => {
        let count = 0
        calls.forEach(call => {
            if(call.from === from) count++    
        });

        return count
    }

    return (
        <div>
            <div style={{zIndex: 2}} className={"active"}>
                <div className='d-flex'>
                    <h2>Archive</h2>
                    <button onClick={unArchiveAll} className='btn shadow'><FontAwesomeIcon className='btn-icon' icon={faBoxArchive} /> Unarchive calls</button>
                </div>
                <hr/>
                {calls.map((call, index) => (call.from && call.is_archived === true ? <Call countCall={countCall} onArchive={onUnArchive} key={call.id} call={call} /> : ''))}
            </div>
        </div>
    )
}
export default ArchivedCalls