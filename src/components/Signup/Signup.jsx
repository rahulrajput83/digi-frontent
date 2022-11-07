/* Imports */
import React from 'react'
import { useState } from 'react';
import Input from './Input'

/* Roles for Signup */
const roleData = ["Admin", "User"]

/* Signup Functional Component */
function Signup() {
  /* useStates */
  const [errorMessage, setErrorMessage] = useState('')
  const [showRole, setShowRole] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    role: ''
  })

  /* Arrow function triggers when form submitted. */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.name && data.email && data.password && data.role) {
      setError(false)
      setClicked(true);
      fetch('https://digi-assignment.herokuapp.com/signup',
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
          body: JSON.stringify(data)
        }
      )
        .then(res => res.json())
        .then((res) => {
          setClicked(false)
          console.log(res);
          setError(true)
          setErrorMessage(res.message)
        })
        .catch(() => {
          setClicked(false)
          setError(true);
          setErrorMessage('Error, please try again..')
        })
    }
    else {
      setError(true);
      setErrorMessage('Error, please try again..')
    }
  }

  
  return (
    <div className='flex justify-end md:p-10 p-2'>

      <div className='shadow-lg w-full md:w-96 justify-center p-2 md:p-4 flex flex-col'>
        <span className='text-center font-medium text-xl'>Signup</span>
        <form className='w-full' onSubmit={handleSubmit}>
          {/* Render Input component from './Input' with props. */}
          <Input name='name' data={data} setData={setData} type='text' placeholder='Enter Name' />
          <Input name='email' data={data} setData={setData} type='text' placeholder='Enter Email' />
          <Input name='password' data={data} setData={setData} type='password' placeholder='Enter Password' />
          <div onClick={() => setShowRole(!showRole)} className='my-4 outline-none cursor-pointer flex justify-between items-center p-2 border-2 w-full relative'>
            <span>{data.role ? data.role : 'Role'}</span>
            {showRole ? <div className='absolute flex flex-col bottom-0 translate-y-28 z-2 left-0 bg-white p-2 shadow-lg w-1/2'>
              {roleData.map((item, index) => {
                return <span className='w-full hover:bg-gray-200 p-2' onClick={() => setData({ ...data, role: item })} key={`role-${index}`}>{item}</span>
              })}
            </div> : null}
          </div>
          {/* Button to submite form data. */}
          <button disabled={clicked} type='submit' className='mt-4 hover:bg-blue-500 w-full p-2 bg-blue-600 text-white rounded flex justify-center items-center'>
            {clicked ? 'Please Wait...' : 'Submit'}
          </button>
        </form>
        {error ? <span className='mt-2 text-sm text-red-600'>{errorMessage}</span> : ''}
      </div>
    </div>
  )
}

export default Signup;