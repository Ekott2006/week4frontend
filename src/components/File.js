import React from "react";
import {useParams} from "react-router-dom";

const File = () => {
    const {video_url: params} = useParams()
    const video_url = url => encodeURI("http://localhost:5000/files/" + url + params)
    const download = decodeURI(video_url("").split("Z")[1])

    return (
        <div>
            <h1> Video Selected </h1>
            <video src={video_url("video/")} controls/>
            <button><a href={video_url("")}> Link 1 </a></button>
            <button><a href={video_url("video/")} download={download} target="_blank" rel="noreferrer noopener"> Link 2</a> </button>
        </div>
    )
}

export default File
