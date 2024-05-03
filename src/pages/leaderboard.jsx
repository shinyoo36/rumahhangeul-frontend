import React, { useState, useEffect } from "react";
import { Badge, Box, Button, Icon } from "@mui/material";
import { leaderboard } from "../assets";
import { userLocal, fetchUserData } from "../utils/user";
import { Link } from "react-router-dom"

const Leaderboard = () => {
  fetchUserData();
  const userData = userLocal();

  let namaDepan, score, borderUsed, profileUsed;
  if(userData == null){
    namaDepan = "Anda Belum Masuk";
    score = 0;
    borderUsed= "white";
    profileUsed= "/profile/nonlogin.png"
  } else {
    namaDepan = userData.namaDepan;
    score = userData.score;
    borderUsed= userData.borderUsed
    profileUsed= userData.profileUsed
  }

  const [listUserRank, setListUserRank] = useState([]);

  useEffect(() => {
    const getLeaderboard = async () => {
      try {
        const response = await fetch("https://rumahhangeul-backend-422018.et.r.appspot.com/users/leaderboard", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          const data = await response.json();
          setListUserRank(data);
        }
      } catch (error) {
        console.error("Error occurred while fetching leaderboard:", error);
      }
    };

    getLeaderboard();
  }, []);

  return (
    <Box className="min-h-[70vh] sm:flex sm:flex-row p-[15px] md:p-0">
      <Box className='[25px] sm:p-0 sm:w-1/3 flex flex-col items-center justify-around'>
        <Box className='rounded-3xl  flex flex-col items-center justify-center'>
          <Box className="boxProfile p-[5px] bg" style={{ '--color-props': borderUsed, '--wAfter-prop': '155px', '--wBefore-prop': '165px' }}>
            <img src={profileUsed} className="rounded-full z-10 object-cover w-[150px] h-[150px]" />
          </Box>
          <p className="font-bold text-[16px] text-center pt-[20px] pb-[10px]">
            {namaDepan}
          </p>
          <p className="font-medium text-[16px] text-center pb-[20px]">
            {score} Score
          </p>
          <Button id="basicButtonBlue" variant="contained">
            <Link to="/profile">Lihat Profil</Link>
          </Button>
        </Box>
        <Box className=''></Box>
      </Box>
      <Box className='sm:w-full'>
        <Box className="h-full p-[30px] items-center justify-center">
          <Box className="flex justify-center flex-row pb-[20px]">
            <img src={leaderboard} className="w-[35px] h-[35px]" />
            <p className="font-extrabold text-[20px] text-center">
              Leaderboard
            </p>
          </Box>
          <Box className="space-y-[3px] overflow-y-scroll">
            <Box className='flex items-center justify-center flex-row gap-x-6'>
              {listUserRank.slice(0, 1).map((user, index) =>(
                <Box key={index} className="boxBorder flex flex-col gap-y-[3px]">
                  <p className="z-10 font-bold text-[16px] text-center ">
                    1
                  </p>
                  <img src={user.profileUsed} className="rounded-full object-cover z-10 w-[100px] h-[100px]" alt={`Profile ${index + 1}`} />
                  <p className="w-full z-10 font-bold text-[16px] text-center">
                    {user.namaDepan && user.namaDepan.split(" ")[0]}
                  </p>
                  <p className="z-10 font-medium text-[16px] text-center">
                    {user.score} Score
                  </p>
                  <Button 
                    id="basicButtonGold" 
                    variant="contained" 
                    onClick={() => {
                      window.location.href = `/profile/other-user/${user.id}`;
                    }}
                  >
                    Lihat Profil
                  </Button>
                </Box>
              ))}
            </Box>
            <Box className='flex items-center justify-center flex-col sm:flex-row gap-x-3'>
              {listUserRank.slice(1, 3).map((user, index) => (
                <Box key={index} id={`boxBorderRank${index+2}`} className="flex flex-col gap-y-[3px]">
                  <p className="z-10 font-bold text-[16px] text-center ">
                    {index+2}
                  </p>
                  <img src={user.profileUsed} className="rounded-full object-cover z-10 w-[100px] h-[100px]" alt={`Profile ${index + 1}`} />
                  <p className="w-full z-10 font-bold text-[16px] text-center">
                    {user.namaDepan && user.namaDepan.split(" ")[0]}
                  </p>
                  <p className="z-10 font-medium text-[16px] text-center">
                    {user.score} Score
                  </p>
                  <Button 
                    id={`basicButtonRank${index+2}`} 
                    variant="contained" 
                    onClick={() => {
                      window.location.href = `/profile/other-user/${user.id}`;
                    }}
                  >
                    Lihat Profil
                  </Button>
                </Box>
              ))}
            </Box>
            <Box className='max-h-[460px] overflow-y-scroll space-y-1'>
              {listUserRank.slice(3,50).map((user, index) => (
                <Box key={index} className="flex flex-row items-center space-x-2">
                  <p className="bg-blue-300 p-[3px] text-center rounded-3xl w-[30px] text-[16px]">
                    {index + 4}.
                  </p>
                  <img src={user.profileUsed} className="rounded-full w-[60px] h-[60px]" />
                  <p className="font-semibold text-[16px] sm:text-[20px]">
                    {user.namaDepan && user.namaDepan.split(" ")[0]}
                  </p>
                  <Box className="flex-1 justify-end pr-[5px]">
                    <p className="font-medium text-[16px] sm:text-[20px] flex justify-end items-end">
                      {user.score} Score
                    </p>
                  </Box>
                </Box>
              ))} 
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Leaderboard;
