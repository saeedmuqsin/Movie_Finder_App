import React from 'react'
import ImageIcon from '@mui/icons-material/Image';

const MovieCard = (props) => {
  return (
    <div className='w-1/4 h-[385px] rounded-lg mx-4 my-3 py-4 px-3 bg-[#00000067] hover:scale-105'>
        {/* checking if movie data has a poster_image*/}

        { 
            props.movie["poster_path"] === null ? <div className='flex items-center p-5  bg-[#000] rounded-lg justify-center mb-5 h-66'><ImageIcon fontSize="large"/></div> :
            <a href={`/movie/${props.movie["id"]}`}>
                <img src={`https://image.tmdb.org/t/p/w500${props.movie["poster_path"]}`} alt="poster_image" className='w-full h-66'/>
            </a>
        }
        <div className="block">
            <a href={`/movie/${props.movie["id"]}`}>
                <h1 className="text-lg my-1 mx-1 font-bold hover:text-[#00b4d8]">{ props.movie['original_title'].substring(0, 40)} </h1>
            </a>
            <p className="text-xs text-gray-400 mx-1.5">{ props.movie['release_date'] }</p>
        </div>
        <p></p>
    </div>
  )
}

export default MovieCard
