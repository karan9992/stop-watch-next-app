'use client'
import { useState } from 'react'

const page = () => {

    const [time, setTime] = useState(0)
    const [inputVal, setInputVal] = useState({
        hh: 0,
        mm: 0,
        ss: 0
    })


    const handleChange = (e) => {
        setInputVal((prev) => ({
            ...prev,
            [e.target.placeholder.toLowerCase()]: e.target.value
        }))

        setInputVal(prev => {

            let newSS = prev.ss % 60;
            let newMM = parseInt(prev.ss / 60)
            console.log("before nM", newMM)
            newMM += prev.mm
            console.log("afeter nM", newMM)


            let newHH = parseInt(newMM / 60)
            newMM = parseInt(newMM % 60)

            newHH += prev.hh
            console.log(newHH, newMM, newSS)

            return {
                hh: newHH,
                mm: newMM,
                ss: newSS
            }

        })

    }

    const handleStart = () => {

        setTime(Number(inputVal.ss + inputVal.mm * 60 + inputVal.hh * 60 * 60))

        const interval = setInterval(() => {
            setTime((prev) => {
                const nextTime = prev - 1
                console.log("Time", nextTime)

                if (nextTime <= 0) {
                    clearInterval(interval)
                    return 0
                }

                return nextTime
            })
        }, 1000)
    }



    const handleReset = () => {
        setTime(0)
        setInputVal({
            mm: 0,
            hh: 0,
            ss: 0
        })
    }

    return (
        <div className='flex  flex-1 justify-center items-center '>
            <div className="border p-4 rounded-xl w-full max-w-2xl">

                <h1 className='text-center font-semibold text-3xl text-blue-500'>Stop Watch </h1>
                <div className="border mt-16 my-6 text-center p-2">
                    {time}
                </div>

                <div className=" w-full  p-1 flex gap-4">
                    <input type="number" value={inputVal.hh} className="border p-2 rounded text-center flex-1 min-w-0" placeholder="HH" onChange={handleChange} />
                    :<input type="number" value={inputVal.mm} className="border p-2 rounded text-center flex-1 min-w-0" placeholder="MM" onChange={handleChange} />
                    :<input type="number" value={inputVal.ss} className="border p-2 rounded text-center flex-1 min-w-0" placeholder="SS" onChange={handleChange} />
                </div>

                <div className=" mt-6 p-1 flex justify-around">
                    <button className='p-2 px-12 bg-green-500 hover:bg-green-700 rounded text-2xl transition-transform duration-75 active:scale-95'
                        onClick={handleStart}>Start</button>
                    <button className='bg-red-600 hover:bg-red-700 p-2 px-12 rounded text-2xl transition-transform duration-75 active:scale-95'
                        onClick={handleReset}>Reset</button>
                </div>
            </div>

        </div>
    )
}

export default page
