import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ThumbUpAlt, PlayArrow } from "@mui/icons-material";
import { Button } from "@/components/ui/button";
import { ScaleLoader } from "react-spinners";

const Moviepage = () => {
  const movie_id = useParams();
  const [movie_details, setDetails] = useState({});
  const [loading, setloading] = useState(true)
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${movie_id.id}?language=en-US`,
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Yjk2NTI2NjFiZTkxMGQ3MDFjOTM5NWQzYzI1ZGE2ZCIsIm5iZiI6MTcxNzAxMzUxNC4wNDgsInN1YiI6IjY2NTc4YzBhMzU4YTYwOTNlMGU0ZWJiNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4cEa_cXZTjPaDz11DYLtEemQcxNSl2t5jUAuA86DflQ",
    },
  };

  useEffect(() => {
    axios
      .request(options)
      .then((res) => {
        setDetails(res.data)
        setloading(false)
      }
    )
      .catch((err) => console.error(err));
  }, []);

//   setting for background image
  const movie_poster = `https://image.tmdb.org/t/p/w500${movie_details['poster_path']}`

  return (
    <>
     {
        loading === true ?  <ScaleLoader className="text-center mt-60 " color={"#00b4d8"}/> :
        
        <div className="container-fluid h-[100vh] bg-no-repeat bg-cover bg-center relative" style={{ backgroundImage: `url(${movie_poster})` }} >
        <div className="absolute top-0 w-full h-[100vh] bg-[#000000d2] flex items-center justify-center flex-wrap z-10">
            <img src={movie_poster} className="w-[350px] h-[450px] my-5 mx-4 rounded-lg" alt="" />
            <div className=" inline-block w-1/2 mx-5">
                <h1 className="text-white text-4xl my-6 font-bold"> { movie_details['original_title'] }</h1>
                <div className=" flex items-center">
                    <p className="p-2 mr-3.5 text-center border-2 w-auto bg-white rounded-md font-bold text-[#00b4d8] text-xs "> { movie_details["origin_country"].map((country)=>(country+" "))} </p>
                    {
                        movie_details.genres?.map((genre,index)=> (
                            <p className="mx-1" key={index}>{ genre['name'] }.</p>
                        ))
                    }
                </div>
                <p className="text-md text-white my-2.5">{ movie_details['overview'] }</p>
                <div className="flex items-center">
                    <p className="text-sm flex items-items font-bold">Release: {movie_details['release_date'] === "" ? "--":movie_details['release_date']}</p>  
                    <p className="text-sm font-bold mx-7.5">Status: { movie_details['status'] === "Released" ? <span className="bg-[#00b4d8] text-xs p-1.5 rounded-md mx-1.5">{ movie_details['status'] }</span>:<span className="p-1.5 bg-red-400 font-bold rounded-md text-xs mx-1.5">Not Released</span>}</p>       
                </div>

                <div className="flex items-center my-5">
                    <p className="text-lg my-1 inline-block" key={movie_id}><ThumbUpAlt className="mx-1 -mt-1 text-[#00b4d8]" fontSize="small" /> { movie_details["vote_count"] } ({movie_details["vote_average"]}%)</p>
                    {
                        Array.isArray(movie_details["production_companies"]) && movie_details["production_companies"].length > 0 ?
                        <div className="flex items-center mx-10">
                            { 
                                movie_details["production_companies"][0]["logo_path"] === ""? "":
                                <img className="w-[110px] h-[40px]" src={`https://image.tmdb.org/t/p/w500${movie_details["production_companies"][0]["logo_path"]}`} alt="" />
                            }
                            <div className="block">
                                <p className="mx-6">Company: <span className="mx-1 text-[#00b4d8] font-bold">{ movie_details["production_companies"][0].name }</span></p>
                                <p className="mx-6">Country: <span className="mx-1 text-[#00b4d8] font-bold">{ movie_details["production_companies"][0].origin_country }</span></p>
                            </div>
                        </div>
                        :null
                    }
                </div>
                {
                    movie_details['homepage'] !== "" ? 
                    <a href={`${movie_details["homepage"]}`}>
                        <Button className={"bg-[#00b4d8] hover:bg-white hover:text-[#00b4d8]"}>
                            <PlayArrow className="-mx-1" />
                            Offical site
                        </Button> 
                    </a> : null
                }
            </div>
        </div>
    </div>
     }
    </>
    
  );
};

export default Moviepage;
