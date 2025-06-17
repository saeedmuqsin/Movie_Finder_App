import React, { useState } from 'react'
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Homepage = () => {
    const [Query, setQuery] = useState("");
  return (
    <>
        <div className="container p-5 mx-auto mt-20 w-4/5 block text-center">
            <LocalMoviesIcon className='p-3 rounded-lg text-center bg-[#00b4d8]' sx={{ width: "62px", height: "62px"}}/>
            <h2 className="text-5xl text-center p-3">Movie <span className="text-[#00b4d8] font-bold">Finder</span></h2>
            <p className='text-lg my-1.5'>Discover movies, TV shows, and series with detailed information and ratings.</p>
            <form action={`search/${Query}`} method='GET'>
                <Input  className={"w-1/2 mx-auto block mt-7 mb-3.5 focus:border-[#00b4d8]"}  placeholder="Search for movies,TV shows and series" onChange={(e)=> setQuery(e.target.value) } required/>
                <Button type="submit" className={"bg-[#00b4d8] px-6 hover:bg-[#ffff] hover:text-[#00b4d8]"}>Search</Button>
            </form>
        </div>
    </>
  )
}

export default Homepage