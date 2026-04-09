// Classic Debounce hook to work on latest search of the user by eliminating the old keystroke
import { useEffect, useState } from "react";

function useDebounce(value,delay){

    // this holds the "settled" version of the value, it only updates after the user stops typing for "delay" ms
    const [debouncedValue, setDebouncedValue] = useState(value)

    //Run this Effect if there is any change in the value means user has again started typing.
    useEffect(()=>{
        let timer = setTimeout(()=>{
            setDebouncedValue(value)
        },delay)

        // cleanup: cancel the previous timer every time value changes, debounce:- remove the previous work
        return ()=>clearTimeout(timer)
    },[value,delay])

    //return the debounced value
    return debouncedValue
}

export {
    useDebounce
}