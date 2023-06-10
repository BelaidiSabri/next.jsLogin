const Input = ({label,id,onChange,error,...inputProps}) => {
  return (
    <div>
        <label htmlFor="">{label}</label>
        <input {...inputProps} onChange={onChange}/>
        <p>{error}</p>
    </div>
  )
}
export default Input