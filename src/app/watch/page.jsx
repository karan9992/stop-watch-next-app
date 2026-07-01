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

    const formatTime = (totalSeconds) => {
        const hh = Math.floor(totalSeconds / 3600)
        const mm = Math.floor((totalSeconds % 3600) / 60)
        const ss = totalSeconds % 60

        return `${String(hh).padStart(2, '0')} : ${String(mm).padStart(2, '0')} : ${String(ss).padStart(2, '0')}`
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
        <div className='flex flex-1 justify-center items-center px-4 py-10 font-mono'>
            <div className="w-full max-w-2xl rounded-2xl border border-slate-700/80 bg-neutral-950/90 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur">

                <h1 className='text-center text-4xl font-semibold  text-indigo-300 drop-shadow-[0_0_18px_rgba(56,189,248,0.45)]'>Stop Watch</h1>
                <div className="relative mt-16 my-6 overflow-hidden rounded-2xl border border-slate-700 bg-gradient-to-b from-neutral-950 via-neutral-900 to-black px-6 py-8 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_30px_rgba(15,23,42,0.8)]">
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_35%,rgba(255,255,255,0.06)_50%,transparent_65%)]" />
                    <div className="relative  text-5xl font-semibold text-neutral-100 tabular-nums sm:text-6xl">
                        {formatTime(time)}
                    </div>
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
