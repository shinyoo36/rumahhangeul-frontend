import React, { useState, useEffect } from "react";
import { Box, Button, Tooltip} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { userLocal, getUserCourse, getUserChallenge, fetchUserData} from "../utils/user";
import { courseListDefault, challengeListDefault } from "../constants";
import EditIcon from '@mui/icons-material/Edit';
import { allPerfect, allCourseClear, OnePerfect, TwoPerfect } from "../assets/achievement";

const Profile = () => {
  fetchUserData();
  const userData = userLocal();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  useEffect(() => {
    getUserCourse().then((data) => setCourses(data));
  }, []); 
  const [challenges, setChallenges] = useState([]);
  useEffect(() => {
    getUserChallenge().then((data) => setChallenges(data));
  }, []); 

  const allPerfectText = ` Menyelesaikan Semua Kuis dengan Sempurna`;
  const onePerfectText = ` Menyelesaikan 1 Kuis dengan Sempurna`;
  const twoPerfectText = ` Menyelesaikan 2 Kuis dengan Sempurna`;
  const allCourseClearText = ` Menyelesaikan Semua Pelajaran`;

  const perfectClearCount = challenges.filter(challenge => challenge.perfectClear === 'yes').length;
  const courseClearCount = courses.filter(course => course.completed === 'yes').length;
  console.log(perfectClearCount);
  return (
    <Box className="min-h-[70vh] md:h-[90vh] py-[20px]  md:flex md:flex-row">
      <Box className="md:w-1/2 flex flex-col p-[25px] items-center justify-center">
        <Box className="boxProfile p-[5px]" style={{ '--color-props': userData.borderUsed, '--wAfter-prop': '185px', '--wBefore-prop': '195px' }}>
          <img src={userData.profileUsed} className="rounded-full z-10 object-cover w-[180px] h-[180px]"/>
        </Box>
        <Box className='w-full space-y-[10px] flex flex-col justify-center items-center gap-y-2 pb-[20px]'>
          <Box className='flex max-h-[200px] items-center justify-center gap-x-2'>
            <p className="font-medium text-[32px] text-center">
              {userData.namaDepan}
            </p>
            {userData.namaDepan.length > 10 ? (
              <p className="font-medium text-[32px] text-center">
                {userData.namaBelakang.substring(0, 3)}..
              </p>
            ) : (
              <p className="font-medium text-[32px] text-center">
                {userData.namaBelakang.substring(0, 10)}
              </p>
            )}
          </Box>
          <p className="font-medium text-[20px] text-center">
            Skor : {userData.score} 
          </p>
          <p className="font-medium text-[20px] text-center">
            Sisa poin : {userData.point}
          </p>
          <Button id="basicButtonBlue" variant="contained" onClick={() => navigate("/profile/edit-profile")} startIcon={<EditIcon/>}>
            Ubah Profile
          </Button>
        </Box>
        <p className="font-medium text-[24px] text-center pb-[15px]">
          Achievement
        </p>
        <Box className="flex gap-x-[5px] px-[5px]">
          {perfectClearCount == 1 && (
          <Tooltip title={onePerfectText} enterTouchDelay={0}>
            <img src={OnePerfect} className="z-10 object-fill w-[60px] h-[60px]"/>
          </Tooltip>
          )}
          {perfectClearCount == 2 && (
          <Tooltip title={twoPerfectText} enterTouchDelay={0}>
            <img src={TwoPerfect} className="z-10 object-fill w-[60px] h-[60px]"/>
          </Tooltip>
          )}
          {courseClearCount == courseListDefault.length && (
          <Tooltip title={allCourseClearText} enterTouchDelay={0}>
            <img src={allCourseClear} className="z-10 object-fill w-[60px] h-[60px]"/>
          </Tooltip>
          )}
          {perfectClearCount == challengeListDefault.length && (
          <Tooltip title={allPerfectText} enterTouchDelay={0}>
            <img src={allPerfect} className="z-10 object-cover w-[60px] h-[60px]"/>
          </Tooltip>
          )}
        </Box>
      </Box>
      <Box className='w-full items-center flex flex-col'>
        <Box aria-label="Course" className='h-[50%] flex flex-col items-center'>
          <p className="pb-[20px] font-medium text-[20px] text-center">
            Course yang diselesaikan
          </p>
          {courses.length === 0 ? (
          <p className="textAnimation  font-semibold text-[#5e94c9]">
              Tidak ada!
          </p>
          ) : (
          <Box className='overflow-auto'>
            <Box className="px-[15px] grid gridAchievement gap-y-[15px] gap-x-[30px]">
              {courses.filter(course => course.completed === 'yes').map(course => (
                <Box key={course.id} className="bg-[#fadeef] p-[10px] rounded-xl flex flex-col items-center py-[10px] gap-[8px]">
                  <img src={course.gambarUrl} className="object-cover w-[160px] h-[160px] rounded-xl" />
                  <Box className='flex flex-col justify-center items-center gap-y-1'>
                    <p className='font-medium text-[16px]'>
                      {course.namaCourse}
                    </p>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
          )}
        </Box>
        <Box aria-label="Challenge" className='h-auto max-h-[50%] flex flex-col items-center'>
          <p className="py-[20px] font-medium text-[20px] text-center">
            Kuis yang diselesaikan
          </p>
          {challenges.length === 0 ? (
          <p className=" textAnimation font-semibold text-[#5e94c9]">
              Tidak ada!
          </p>
          ) : (
          <Box className='overflow-auto'>
            <Box className="px-[15px] grid gridAchievement gap-y-[15px] gap-x-[30px]">
              {challenges.filter(challenge => challenge.firstClear === 'yes').map(challenge => (
                <Box key={challenge.id} className="bg-[#D6E6F2] p-[10px] rounded-xl flex flex-col items-center py-[10px] gap-[8px]">
                  <img src={challenge.gambarUrl} className="object-fill w-[160px] h-[160px] rounded-xl" />
                  <Box className='flex flex-col justify-center items-center gap-y-1'>
                    <p className='font-medium text-[16px]'>
                      {challenge.namaChallenge}
                    </p>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
