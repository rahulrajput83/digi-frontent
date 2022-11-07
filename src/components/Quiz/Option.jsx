import React from 'react'

/* Option Functional Component */
function Option(props) {
 return (
    <label onClick={() => props.setChoosen(props.title)} className='cursor-pointer w-fit my-3 h-fit'>
        <input type='radio' readOnly checked={props.choosen === props.title} className='h-fit mx-6 cursor-pointer' name='option' />
            {props.title}
    </label>
  )
}

export default Option