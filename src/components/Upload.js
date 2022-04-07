import React, { useState } from "react";
import "../css/Upload.css"
import axios from "axios";
import { Link } from "react-router-dom";

const Upload = () => {
    const [progress, setProgress] = useState()
    const [disabled, setDisabled] = useState(false)
    const [filename, setFilename] = useState()

    const handleSubmit = (event) => {
        event.preventDefault()

        const form = document.getElementsByTagName("form")[0]
        const formData = new FormData(form)
        console.log(formData);
        setDisabled(true)
        axios.post("/files/", formData, {
            onUploadProgress: data => {
                console.log(data.loaded / data.total * 100 + "%")
                setProgress(Math.round(data.loaded / data.total * 100))
            }
        })
            .then(res => {
                axios.get("/files/all")
                    .then(res => setFilename(res.data))
            })
            .catch(err => console.log(err))
    }


    return (
        <div>
            <h1> Upload Files Here</h1>
            <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
                <input type="file" name="fileUpload" />
                <button type="submit" disabled={disabled}>File Upload</button>
            </form>
            {progress && <div id="myProgress" style={{ width: "50%" }}>
                <div id="myBar" style={{ width: progress + "%" }}>{progress + "%"}</div>
            </div>}
            {progress === 100 && <h1> Completed Upload </h1>}
            {progress === 100 && setDisabled(false)}
            <div>
                <h1> Files </h1>
                <div className="App">
                    <ul>
                        {filename && filename.map(file => {
                            return (
                                <li key={file._id}><Link to={'/' + file.name}>{file.name}</Link></li>
                            )
                        }
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Upload
