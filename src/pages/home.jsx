import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { landing1 } from "../assets";
import { useNavigate } from "react-router-dom";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { courseListDefault } from "../constants";
import { userLocal, getUserItem, fetchUserData } from "../utils/user";

const Hero = () => {
  fetchUserData();
  
  const navigate = useNavigate(); // Initialize useNavigate hook
  return (
    <Box className="min-h-[70vh]">
        <Box className="gap-y-[30px] flex flex-col items-center sm:justify-evenly xl:flex-row xl:h-[70vh]">
          <Box className="text-center mt-[22px] xl:text-left xl:px-[20px] text-[24px] sm:text-[48px] md:text-[64px]">
            <p className="textAnimation font-semibold">
              Belajar Bahasa Korea
            </p>
            <p className="xl:w-[450px] font-semibold textHome2">
              Secara Gratis Sekarang Juga
            </p>
            <Button id="daftarSekarangButton" variant="contained" onClick={() => navigate("/signup")} endIcon={<NavigateNextIcon/>}>
              Daftar Sekarang
            </Button>
          </Box>
          <Box className="w-[80%] ss:w-[70%] sm:w-auto">
            <img src={landing1}/>
          </Box>

        </Box>
        <Box className="flex flex-col py-[50px] justify-center items-center">
          <p className="md:pb-[30px] pb-[10px] font-semibold text-[28px] xs:text-[36px] ss:text-[46px] sm:text-[48px] md:text-[64px] text-[#5e94c9]">Materi yang tersedia</p>
          <Box className="hidden md:inline">
            <Box className="containerCard">
              {courseListDefault.map((courseItem, index) => (
                <React.Fragment key={index}>
                  <input type="radio" name="slide" id={`c${courseItem.id}`} defaultChecked={index === 0} />
                  <label htmlFor={`c${courseItem.id}`} className="card">
                    <Box className="row">
                      <Box className="icon">{courseItem.id}</Box>
                      <Box className="description">
                        <h4 className="text-gray-700 text-xl font-semibold bgBluePrimary h-[60%] px-[20px] flex items-center rounded-3xl">{courseItem.namaCourse}</h4>
                      </Box>
                    </Box>
                  </label>
                </React.Fragment>
              ))}
            </Box>
          </Box>
          <Box className="md:hidden">
            <Box className="flex flex-col items-center">
              {courseListDefault.map((courseItem, index) => (
                <React.Fragment key={index}>
                  <Box className="w-[70%] p-[10px] bg-[#fadeef] m-[10px] rounded-3xl">
                    <img src={courseItem.gambarUrl} className="rounded-3xl" />
                    <h4 className="flex items-center justify-center text-gray-700 text-xl font-semibold">{courseItem.namaCourse}</h4>
                  </Box>
                </React.Fragment>
              ))}
            </Box>
          </Box>
        </Box>
    </Box>
  );
};

export default Hero;
