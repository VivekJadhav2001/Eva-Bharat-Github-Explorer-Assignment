
//function for seaching user by query(userName)
async function searchUsers(query){
    try {
        //Calling github API with userName and returning the data
        const res = await fetch(`https://api.github.com/search/users?q=${query}`)
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);

        //convert Response in json format
        const data = await res.json()

        //Return the data of the user
        return data
    } catch (error) {
        console.log(error.message,"Error While Searching User")
        //Error state will be handling
        throw error;
    }
}

//function for getting User Repo's using query(userName)
async function getUserRepos(username, page = 1, perPage = 5) {
  try {
    //sort=updated is for latest repos & direction=desc is for newest first
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPage}&sort=updated&direction=desc`
    )

    const data = await res.json()
    return data
  } catch (error) {
    console.log(error.message)
  }
}


export {
    searchUsers,
    getUserRepos
}