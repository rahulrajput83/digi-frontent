import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from './Input'
import {useDispatch} from 'react-redux'


function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.email && data.password) {
      setError(false)
      setClicked(true);
      fetch('https://digi-assignment.herokuapp.com/signin',
        {
          method: 'Post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }
      )
        .then(res => res.json())
        .then((res) => {
          console.log(res);
          setClicked(false)
          if (res.name) {
            localStorage.setItem('userData', JSON.stringify(res));
            saveData(res)
            if(res.role === 'Admin') {
              return navigate("/");
            }
            else {
              return navigate(-1);
            }
          }
          else {
            setError(true)
            setErrorMessage(res.message)
          }
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

  const saveData = (res) => {
    let action = {
      type: "ADD_DATA",
      payload: {
        id: res.id,
        name: res.name,
        email: res.email,
        role: res.role,
        accessToken: res.accessToken,
      }
    };
    dispatch(action);
  }

  return (
    <div className='flex justify-end md:p-10 p-2'>

      <div className='shadow-lg w-full md:w-96 justify-center p-2 md:p-4 flex flex-col'>
        <span className='text-center font-medium text-xl'>Signin</span>
        <form className='w-full' onSubmit={handleSubmit}>
          <Input name='email' data={data} setData={setData} type='text' placeholder='Enter Email' />
          <Input name='password' data={data} setData={setData} type='password' placeholder='Enter Password' />
          <button disabled={clicked} type='submit' className='mt-4 hover:bg-blue-500 w-full p-2 bg-blue-600 text-white rounded flex justify-center items-center'>
            {clicked ? 'Please Wait...' : 'Submit'}
          </button>
        </form>
        {error ? <span className='mt-2 text-sm text-red-600'>{errorMessage}</span> : ''}
      </div>
    </div>
  )
}

export default Signin