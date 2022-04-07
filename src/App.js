import React from 'react';
import './App.css';
import Upload from "./components/Upload";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import File from "./components/File";
import All from "./components/All";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route element={<Upload />} path="/" />
                <Route element={<All />} path="/all" />
                <Route element={<File />} path="/:video_url" />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
