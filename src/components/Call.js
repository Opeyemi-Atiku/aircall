import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneSlash, faVoicemail, faPhone, faBoxArchive } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Call = ({ call, countCall, onArchive }) => {
    const d = new Date(call.created_at)
    const fullDate = d.toLocaleString('en-us',{month:'long', day: '2-digit', year:'numeric'})
    const time = d.toLocaleString('en-us',{hour: '2-digit', minute: '2-digit'})
    return (
        <>
            <div className="date">
                <span className='text'>{ fullDate }</span>
                <div className='line'></div>
            </div>
            
            <div
                className={`call shadow`}
            >
                    
                <div>
                    {call.call_type === 'missed' && <FontAwesomeIcon className='icon color-red' icon={faPhoneSlash} /> }
                    {call.call_type === 'answered' && <FontAwesomeIcon className='icon color-green' icon={faPhone} /> }
                    {call.call_type === 'voicemail' && <FontAwesomeIcon className='icon' icon={faVoicemail} /> }
                </div>
                <Link to={`/call/${call.id}`}>
                    <div className='number'>
                        <p>
                            <span>{ call.from } </span>{countCall(call.from) > 1 && <span className='numberLabel'>{countCall(call.from)}</span>}
                        </p>
                        <p className={`type ${call.call_type === 'missed'? 'color-red' : ''}`}>
                            {call.call_type}
                        </p>
                    </div>
                </Link>
                <div className='time'>
                    <FontAwesomeIcon onClick={() => onArchive(call)} className='btn-icon' icon={faBoxArchive} /><br /><br />
                    <span>{ time }</span>
                </div>
            </div>
        </>
    )
}
export default Call