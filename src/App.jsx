import { useState, useCallback, useEffect, useRef } from 'react'

import './App.css'

function App() {
  const [length, setlength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("");


  //useRaf hook
  const passwordRef = useRef(null);

  {/* password genterator ----- */ }
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijklmnpqrstuvwxyz";

    if (numberAllowed) {
      str += "0123456789";
    }

    if (charAllowed) {
      str += "!@#$%^&*()_+-={}[]|'<>/?";

    }

    {/* build a random password and share to setPassword -> password ----- */ }
    for (let i = 0; i < length; i++) {


      let char = Math.floor((Math.random() * str.length) + 1); {/*give the index--- */ }
      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator()
  }, [length, charAllowed, numberAllowed, passwordGenerator]);

  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select();

    window.navigator.clipboard.writeText(password)
  },
    [password])


  return (
    <>

      <center >
        <h1
          className=' width-full  p-4 text-3xl text-bold text-center text-white tracking-wide transition duration-200 ease-in-out bg-green-400 rounded-md shadow-lg wp-4 w- scale-40 hover:scale-105 hover:bg-green-600' >
          Password Generator</h1>


        <div
          className=' p-4 mt-40 w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-green-500 bg-green-100 ' >
          <div
            className='flex shadow-lg rounded-lg overflow-hidden mb-4 mt-3  ' >
            <input type="text"
              value={password}
              className='outline-none w-full py-1 px-3'
              placeholder='Password'
              readOnly
              ref={passwordRef}
            />
            <button
              onClick={copyPasswordToClipBoard()}
              className='px-3 py-0.5 shrink-0 outline-none text-xl bg-green-700 text-center text-white uppercase shadow-lg cursor-pointer hover:scale-105 '
            >copy</button>
          </div>
          <div
            className="flex text-sm gap-x-2 ">
            <div
              className='flex items-center gap-x-1'>
              <input
                type="range"
                name=""
                id=""
                min={6}
                max={100}
                className='cursur-pointer'
                onClick={(e) => { setlength(e.target.value) }}
              />
              <label htmlFor="" className='text-sm shadow-lg rounded-lg p-1' >Length : {length}</label>
            </div>
            <div
              className=' flex items-center gap-x-1'>
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id='numberInput'
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="numberInput"
                className='text-sm shadow-lg rounded-lg p-1'
              >Numbers</label>
            </div>
            <div
              className=' flex items-center gap-x-1'>
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id='characterInput'
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="characterInput"
                className='text-sm shadow-lg rounded-lg p-1'
              >Character</label>
            </div>
          </div>
        </div>

      </center>

    </>
  )
}

export default App
