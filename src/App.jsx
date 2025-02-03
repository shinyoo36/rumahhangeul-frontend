import React, { useEffect, useState, useRef } from 'react';
import { Route, Routes, useLocation } from "react-router-dom"

import Navbar from "./components/main/Navbar"
import Footer from "./components/main/Footer"

import ChallengeVowels from './components/challenge/Vowels';
import ChallengeConsonants from './components/challenge/Consonants';
import ChallengeVowels2 from './components/challenge/Vowels2';

import Vowels from './components/course/Vowels';
import VowelsAdvanced from './components/course/VowelsAdvanced';
import Consonants from './components/course/Consonants';

import SignIn from "./components/main/signin";
import SignUp from "./components/main/signup";
import OopsPage from './components/main/OopsPage';

import EditProfile from './components/profile/editprofile';
import EditProfileBorder from './components/profile/editprofileborder';

import Hero from "./pages/home";
import Dashboard from "./pages/dashboard";
import Leaderboard from "./pages/leaderboard";
import Profile from "./pages/profile";
import Shop from './pages/shop';

import { userLocal, fetchUserData } from './utils/user';

import Box from '@mui/material/Box/Box';
import OtherUserProfile from './components/profile/otheruserprofile';
import { CircularProgress } from '@mui/material';

  function App() {
    fetchUserData();
    const userData = userLocal();

    // if (connectionError) {
    //   return   <Box className="h-screen flex flex-col items-center justify-center">
    //               <Box className=''>
    //                 <CircularProgress />
    //               </Box>
    //             </Box>;
    // }

    return (
        <Box className="w-full h-screen">
            <Box className='min-h-[70vh]'>
              <Routes>
                <Route path="/" element={<Hero />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/signup" element={<SignUp />} />
                
                <Route path="/materi" element={userData == null ? <OopsPage/> : <Dashboard />} />
                  <Route path="/materi/challenge/vokal" element={userData == null ? <OopsPage/> : <ChallengeVowels />} />
                  <Route path="/materi/challenge/vokal-2" element={userData == null ? <OopsPage/> : <ChallengeVowels2 />} />
                  <Route path="/materi/challenge/konsonan" element={userData == null ? <OopsPage/> : <ChallengeConsonants />} />
                  <Route path="/materi/course/vokal" element={userData == null ? <OopsPage/> : <Vowels />} />
                  <Route path="/materi/course/vokal-2" element={userData == null ? <OopsPage/> : <VowelsAdvanced />} />
                  <Route path="/materi/course/konsonan" element={userData == null ? <OopsPage/> : <Consonants />} />

                <Route path="/peringkat" element={<Leaderboard />} />

                <Route path="/toko" element={userData == null ? <OopsPage/> : <Shop />} />

                <Route path="/profile" element={userData == null ? <OopsPage/> : <Profile />} />
                  <Route path="/profile/edit-profile" element={userData == null ? <OopsPage/> : <EditProfile />} />
                  <Route path="/profile/edit-profile-foto" element={userData == null ? <OopsPage/> : <EditProfileBorder />} />
                  <Route path="/profile/other-user/:id" element={userData == null ? <OopsPage/> : <OtherUserProfile />} />
          
              </Routes>
            </Box>
        </Box>
    )
  }

  export default App;
