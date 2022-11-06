import React from 'react'

function Input(props) {
    const handleChange = (e) => {
        props.setQuestionData({...props.questionData, [e.target.name] : e.target.value})
    }
  return (
    <input name={props.name} value={props.questionData[props.name]} onChange={handleChange} className='my-2 outline-none  p-2 border-2 w-full' type={props.type} placeholder={props.placeholder} />
  )
}

export default Input