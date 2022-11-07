import React from 'react'

/* Input Functional Component */
function Input(props) {
    const handleChange = (e) => {
        props.setData({...props.data, [e.target.name] : e.target.value})
    }
  return (
    <input name={props.name} onChange={handleChange} className='my-4 outline-none  p-2 border-2 w-full' type={props.type} placeholder={props.placeholder} />
  )
}

export default Input