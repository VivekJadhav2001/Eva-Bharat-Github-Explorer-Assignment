//this Hook is reponsible for search input and debounce it and return the loading and error state

import { useEffect, useState } from "react"
import { useDebounce } from "./useDebounce.js"
import { searchUsers } from "../services/github.js"

function useGithubUsers(query){
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    //getting the debounced value and the delay is 400ms of inActivinty by User
    const debouncedQuery = useDebounce(query,400)

    async function fetchUsers(){
        setLoading(true)
        setError(null)

        try {
            const data = await searchUsers(debouncedQuery)
            setUsers(data.items || [])
        } catch (error) {
            setUsers([])
            setError(error.message)
        } finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        // don't search if input is empty
        if(!debouncedQuery.trim()){
            setUsers([])
            return
        }

        fetchUsers()
    },[debouncedQuery]) // only re-runs when debounced value settles

    return {users, loading, error}
}

export{
    useGithubUsers
}