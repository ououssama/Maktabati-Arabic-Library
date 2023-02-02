import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import BackOfficeUI from './Pages/BackOffice';
import AddBook from './Pages/AddContent/AddBookPage'
import AddAudio from './Pages/AddContent/AddAudioPage'
import AddVideo from './Pages/AddContent/AddVideoPage';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FrontOffice } from './Pages/FrontOffice';
import Login from './Pages/login';
import ViewContent from './Pages/contentSections/ViewContent';
// import UpdateBook from './Pages/UpdateContent/UpdateBookContent';
import AllBooksContent from './Pages/AllContents/AllBooks';
import AllAudioContent from './Pages/AllContents/AllAudios';
import AllVideoContent from './Pages/AllContents/AllVideos';
import AllContents from './Pages/AllContents/AllContents';
import Update from './Pages/UpdateContent/UpdateContent';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<FrontOffice />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:user" element={<FrontOffice />} />
        <Route path='/view/:type/:id' element={<ViewContent />} />
        <Route path="/:user/dashbord" element={<BackOfficeUI />} />
        <Route path="/:user/Book" element={<AddBook />} />
        <Route path="/:user/Audio" element={<AddAudio />} />
        <Route path="/:user/Video" element={<AddVideo />} /> */}

        <Route path="/" element={<FrontOffice />} />
        <Route path="/:user" element={<FrontOffice />} />
        <Route path='/:user/Books' element={<AllBooksContent />} />
        <Route path='/:user/Audios' element={<AllAudioContent />} />
        <Route path='/:user/Videos' element={<AllVideoContent />} />
        <Route path='/:user/AllContents' element={<AllContents />} />
        {/* <Route path='/:user/Video' element={ } />
        <Route path='/:user/Audio' element={} /> */}
        <Route path="/:user/dashbord" element={<BackOfficeUI />} />
        <Route path="/:user/Book" element={<AddBook />} />
        <Route path="/:user/Audio" element={<AddAudio />} />
        <Route path="/:user/Video" element={<AddVideo />} />
        <Route path="/login" element={<Login />} />
        <Route path='/:user/View/:type/:id' element={<ViewContent />} />
        <Route path='/:user/dashbord/Update/:type/:id' element={<Update />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode >
);


