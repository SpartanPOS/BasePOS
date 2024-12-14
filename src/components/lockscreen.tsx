'use client'

import { useState } from "react";
import {SRP, SrpClient} from 'fast-srp-hap'
import type { FormEvent } from "react";
import Error from "next/error";
import { NextResponse } from "next/server";

/** 
 * lockscreen for when there is no session available
 * @returns reactdom
 */
const Lockscreen: React.FC<{}>  =  ()  =>  {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [entry, setEntry] = useState("")
  
    function handleSubmit(e: FormEvent) {
      e.preventDefault()
      setError('')
  
      try {
        const initResponse = fetch('/api/employee/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ "pin": entry  })
        })

        console.log("test")
  
        if (!initResponse) {
          console.error("response not okay")
          throw "invalid response from server";
        }

      } catch (err) {
        setError((err as string))
      }
      }  

    const keyEnter = (val: "delete" | number) => {

        if (val == "delete") {
            setEntry(entry.slice(0, -1))
            return
        }

        setEntry( entry + val);
    }

    const keySubmit = () => {
        console.log("test")

    }

    const toggleToolbar = () => {
        console.log("test")
    }

    return (
        <>
                <div id="root">
                    <h1 id="title">Hello World</h1>
                    <div id="store-logo"></div>
                    <form onSubmit={handleSubmit} id="formDiv">
                        <div id="errField"></div>
                        <div id="chars">{entry}</div>
                        <div id="pin-keys">

                            <div className="pin-key" onClick={() => {keyEnter(1)}}>1</div>
                            <div className="pin-key" onClick={() => {keyEnter(2)}}>2</div>
                            <div className="pin-key" onClick={() => {keyEnter(3)}}>3</div>
                            <div className="pin-key" onClick={() => {keyEnter(4)}}>4</div>
                            <div className="pin-key" onClick={() => {keyEnter(5)}}>5</div>
                            <div className="pin-key" onClick={() => {keyEnter(6)}}>6</div>
                            <div className="pin-key" onClick={() => {keyEnter(7)}}>7</div>
                            <div className="pin-key" onClick={() => {keyEnter(8)}}>8</div>
                            <div className="pin-key" onClick={() => {keyEnter(9)}}>9</div>
                            <div className="pin-key" onClick={() => {keyEnter('delete')}}>⌫</div>
                            <div className="pin-key" onClick={() => { keyEnter(0)}}>0</div>
                            <button type="submit" className="pin-key" >✅</button>

                        </div>
                    </form>
                    
                </div>
                <div id="toolbar">
                    <div id="pullout-arrow" onClick={() => { toggleToolbar()}}></div>
                    <div id="toolbar-content" className="hide">
                        <div>Home</div>
                        <div>Profile</div>
                        <div>Settings</div>
                    </div>

                </div>
        </>
    )
}

export default Lockscreen;
