'use client'
import { useEffect, useRef, useState } from 'react'

const page = () => {

    const [time, setTime] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [inputVal, setInputVal] = useState({
        hh: "",
        mm: "",
        ss: ""
    })
    const intervalRef = useRef(null)

    const normalizeTime = (nextInput) => {
        const totalSeconds =
            Number(nextInput.hh || 0) * 3600 +
            Number(nextInput.mm || 0) * 60 +
            Number(nextInput.ss || 0)

        const hh = Math.floor(totalSeconds / 3600)
        const mm = Math.floor((totalSeconds % 3600) / 60)
        const ss = totalSeconds % 60

        return {
            hh: String(hh),
            mm: String(mm),
            ss: String(ss)
        }
    }

    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [])

    const handleChange = (e) => {
        const key = e.target.placeholder.toLowerCase()
        const value = e.target.value

        setInputVal((prev) =>
            normalizeTime({
                ...prev,
                [key]: value
            })
        )
    }

    const handleStart = () => {
        if (isRunning) return

        const totalSeconds =
            Number(inputVal.ss || 0) +
            Number(inputVal.mm || 0) * 60 +
            Number(inputVal.hh || 0) * 3600

        if (totalSeconds <= 0) return

        if (intervalRef.current) {
            clearInterval(intervalRef.current)
        }

        setIsRunning(true)
        setTime(totalSeconds)

        intervalRef.current = setInterval(() => {
            setTime((prev) => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current)
                    intervalRef.current = null
                    setIsRunning(false)
                    return 0
                }

                return prev - 1
            })
        }, 1000)
    }



    const handleReset = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }
        setTime(0)
        setIsRunning(false)
        setInputVal({
            mm: "",
            hh: "",
            ss: ""
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
