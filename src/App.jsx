import React, { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setLength]= useState(8)
  const [numberAllowed, setNumberAllowed]= useState(false)
  const [charAllowed, setCharAllowed]= useState(false)
  const [password, setPassword]= useState('')

  const passwordRef= useRef(null)

  const copyPass= useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,99)
    window.navigator.clipboard.writeText(password)

  },[password])
  const passwordGenerator = useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed)
      str+="0123456789"
    if(charAllowed)
      str+="!@#$%^&*()_+"

    if(numberAllowed && charAllowed)
      str+="0123456789"+"!@#$%^&*()_+"

    for (let i = 1; i <= length; i++) {
      let char=Math.floor(Math.random()*str.length )
      pass += str.charAt(char)
      
    }
    setPassword(pass)
  }, [length,numberAllowed,charAllowed,setPassword])

  useEffect(()=>{ passwordGenerator()},[length,numberAllowed,charAllowed,passwordGenerator])
  return (
    <>
      <div className="flex flex-col my-8 mx-2 p-auto shadow-md rounded-lg  text-pink-950 bg-gray-500 justify-center"> 
        <h1 className="text-2xl font-bold text-center">Password Generator</h1>
        <div className="flex justify-center">
            <input type='text' 
            value={password}
            placeholder='Password'
            className='rounded-l-lg my-2 p-2'
            readOnly
            ref={passwordRef}
            > </input>

            <button className='bg-pink-900 text-white py-2 px-1 outline-none '
             onClick={copyPass }>
               copy</button>
        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
              />
              <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                  setNumberAllowed((prev) => !prev);
              }}
          />
          <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
              <input
                  type="checkbox"
                  defaultChecked={charAllowed}
                  id="characterInput"
                  onChange={() => {
                      setCharAllowed((prev) => !prev )
                  }}
              />
              <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
