import React from 'react';
import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./provider/PrivateRoute";
import FeedPage from "./pages/FeedPage";
import UploadPage from "./pages/UploadPage";
import SignupPage from "./pages/SignupPage";
import StoryUploadPage from "./pages/StoryUploadPage";

// TODO: 필요한 컴포넌트들을 import 하세요

function App() {
    return (
        <div>
         <BrowserRouter>
             <Routes>
                 <Route path="/" element={<Navigate to="/login" replace />} />
                 <Route path="/login" element={<LoginPage />} />
                 <Route path="/signup" element={<SignupPage />} />
                 <Route path="/feed"
                        element={
                     <PrivateRoute>
                         <FeedPage />
                     </PrivateRoute>}
                 />
                 <Route path="/upload"
                        element={
                             <PrivateRoute>
                                 <UploadPage />
                             </PrivateRoute>
                        }
                 />
                 <Route
                     path="/story/upload"
                    element={
                     <PrivateRoute>
                        <StoryUploadPage/>
                    </PrivateRoute>}
                 />
             </Routes>
         </BrowserRouter>
        </div>
    );
}

export default App;