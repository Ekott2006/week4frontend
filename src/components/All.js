import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

const All = () => {
    const [filename, setFilename] = useState()
    const fetchData = async () => await axios.get("/files/all")

    useEffect( () => {
        fetchData().then(r => setFilename(r.data))
    }, [])

    const handleDelete = deleteFile => {
        console.log(deleteFile.name)
        const deleteData = async () => axios.delete(`/files/delete/${deleteFile.name}`)
        deleteData().then(r => console.log(r))
        fetchData().then(r => setFilename(r.data))
    }

        return (
                <div>
                    <button><Link to={"/"} > Go Back </Link></button>
                    <h1> Files </h1>
                    <div className="App">
                        <ul>
                            {filename && filename.map(file =>
                        {
                            return (
                                        <li key={file._id}>
                                            <Link to={'/' + file.name}>{file.name.split("Z")[1]}</Link>
                                            <button onClick={_ => handleDelete(file)}>Delete</button>
                                        </li>

                            )
                        }
                    )}
                        </ul>
                    </div>
                </div>
            )

}

export default All