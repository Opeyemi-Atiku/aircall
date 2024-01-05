const Calls = ({calls}) => {
  return (
    <div>{ calls.map((call) => <h2>{call.from}</h2>) }</div>
  )
}
export default Calls