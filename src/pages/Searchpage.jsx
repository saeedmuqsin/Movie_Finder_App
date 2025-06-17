import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ScaleLoader } from "react-spinners";
import MovieCard from "@/components/MovieCard";
import GppBadIcon from '@mui/icons-material/GppBad';

const Searchpage = () => {
  const params = useParams();
  const [searched_result, setResult] = useState({});
  const [loading, setLoading] = useState(true);

  // connected to the TMDB api to make request
  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Yjk2NTI2NjFiZTkxMGQ3MDFjOTM5NWQzYzI1ZGE2ZCIsIm5iZiI6MTcxNzAxMzUxNC4wNDgsInN1YiI6IjY2NTc4YzBhMzU4YTYwOTNlMGU0ZWJiNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4cEa_cXZTjPaDz11DYLtEemQcxNSl2t5jUAuA86DflQ",
    },
     params: {
        query: `${params.title}`
      },
  };

  useEffect(() => {
    axios
      .request(options)
      .then((res) => {
          setResult(res.data["results"]);
          setLoading(false)
        })
        .catch((err) => console.error(err));
    }, []);

    console.log(searched_result)
    // console.log(loading)
  return (
    <div className="container p-5 w-full block mx-auto">
    
      { 
        loading ? <ScaleLoader className="text-center mt-60 " color={"#c"}/> : 
        <>
            {/* <h2 className="text-4xl mt-10 text-center font-bold"> Results for "{params.title}"</h2> */}
            <div className="flex items-center justify-around flex-wrap p-5 my-4 w-4/5 mx-auto">
                { searched_result.length > 0 ? 
                  <>
                    {searched_result.map((movie, index) => (
                      <MovieCard movie={movie} key={index} />
                    ))}
                  </> : <div className="block z-30 p-5 w-full mt-24 text-center" >
                    <GppBadIcon  className="text-[#00b4d8]" fontSize="large"/>
                    <h1 className="text-3xl mt-5 mb-6 font-black">
                      No result found.
                    </h1>
                    <a href="/" className="py-2 px-4 rounded-lg bg-[#00b4d8] mt-20 text-sm">Search Again</a>
                  </div>
                }
            </div> 
        </>
      
      }
    </div>
  );
};

export default Searchpage;
