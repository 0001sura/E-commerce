import React, { useState } from 'react'

const Login = () => {

  const [currentState, setCurrentState] = useState('Sign up');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-500' >
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
            <p className='prata-regular text-3xl'>{currentState}</p>
            <hr className='border-none mt-2 h-[1.5px] w-8 bg-gray-800' />
      </div>
     {currentState==='Login' ? '' : <input type="text" className='w-full px-3 py-2 border border-gray-400 rounded' placeholder='Name' required/>} 
      <input type="email" className='w-full px-3 py-2 border border-gray-400 rounded' placeholder='Email' required/>
      <input type="password" className='w-full px-3 py-2 border border-gray-400 rounded' placeholder='Password' required/>
      <div className='w-full flex justify-between text-sm mt-0'>
            <p className='cursor-pointer hover:text-black'>Forgot your password?</p>
            {
              currentState === 'Login'
              ? <p onClick={()=>setCurrentState('Sign up')} className='cursor-pointer hover:text-black' >Create account</p>
              : <p onClick={()=>setCurrentState('Login')} className='cursor-pointer hover:text-black' >Login Here</p>
            }
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4' type='submit'> {currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
    </form>
  )
}

export default Login