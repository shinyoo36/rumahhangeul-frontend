import React, { useState, useEffect } from "react";
import { 
  Box, Button, Tooltip ,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';
import { userLocal, getUserCourse, getUserChallenge, fetchUserData} from "../utils/user";
import { courseList, challengeList } from "../constants";
import Slide from '@mui/material/Slide';

const Dashboard = () => {
  fetchUserData();
  const navigate = useNavigate();

  const [coursesUserData, setCoursesUserData] = useState([]);
  useEffect(() => {
    getUserCourse().then((data) => setCoursesUserData(data));
  }, []);
  
  const [challengeUserData, setChallengeUserData] = useState([]);
  useEffect(() => {
    getUserChallenge().then((data) => setChallengeUserData(data));
  }, []); 

  const courseText = `
  Penyelesaian pertama akan memberikan hadiah poin dan skor
  `;

  const challengeText = `
  Penyelesaian akan memberikan hadiah poin dan skor
  `;
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = (item) => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = (item) => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [open3, setOpen3] = React.useState(false);
  const handleOpen3 = (challenge) => {
    setSelectedChallenge(challenge);
    setOpen3(true);
  };
  const handleClose3 = () => {
    setOpen3(false);
    setSelectedChallenge(null);
  };

  return (
    <Box className="min-h-[70vh] flex flex-col justify-center items-center my-[30px] gap-[20px]">
      <Box>
        <Box className='flex items-center justify-center mb-[20px] gap-x-3'>
          <p className='font-[sans_serif] text-center font-medium text-[24px] sm:text-[26px]'>
            Daftar Pelajaran yang tersedia
          </p>
          <HelpOutlinedIcon id='iconHelp' onClick={handleOpen}/>
        </Box>
        <Box className="grid gridCard gap-y-[50px] gap-x-[60px]">
          {coursesUserData.map((course) => {
            const courseIndex = courseList.findIndex(item => item.namaCourse === course.namaCourse);
            if (courseIndex !== -1) {
              courseList.splice(courseIndex, 1);
            }
            return (
            <Box key={course.id} id="courseCard" className="w-[360px] h-[270px] bg-[#D6E6F2] rounded-xl flex flex-col items-center py-[10px] gap-[8px]">
              <img src={course.gambarUrl} id="imageCourseCard" className="object-cover rounded-xl w-[344px] h-[200px]" />
              <Box className='flex px-[12px] w-full justify-between'>
                <p className='font-medium text-[24px]'>
                    {course.namaCourse}
                </p>
                <Box className='space-x-2'>
                  {course.completed === 'no' ? <CloseIcon className="text-red-600" /> : <CheckIcon className="text-green-600"/>}
                  <Tooltip title={courseText} enterTouchDelay={0}>
                    <Button id={course.completed === 'no' ? 'basicButtonBlue' : 'basicButtonGreen'} className='' onClick={() => navigate("/materi/course/" + course.namaCourse.replace(/\s+/g, '-').toLowerCase())}>
                      {course.completed === 'no' ? 'Mulai Belajar' : 'Belajar Lagi'}
                    </Button>
                  </Tooltip>
                </Box>  
              </Box>
            </Box>
            );
          })}
          {courseList.map((course) => (
          <Box key={course.id} id="courseCard" className="w-[360px] h-[270px] bg-[#D6E6F2] rounded-xl flex flex-col items-center py-[10px] gap-[8px]">
            <img src={course.gambarUrl} id="imageCourseCard" className="object-cover rounded-xl w-[344px] h-[200px]" />
            <Box className='flex px-[12px] w-full justify-between'>
              <p className='font-medium text-[24px]'>
                  {course.namaCourse}
              </p>
              <Box className='space-x-2'>
                {course.completed === 'no' ? <CloseIcon className="text-red-600" /> : <CheckIcon className="text-green-600"/>}
                <Tooltip title={courseText} enterTouchDelay={0}>
                  <Button id={course.completed === 'no' ? 'basicButtonBlue' : 'basicButtonGreen'} className='' onClick={() => navigate("/materi/course/" + course.namaCourse.replace(/\s+/g, '-').toLowerCase())}>
                    {course.completed === 'no' ? 'Mulai Belajar' : 'Belajar Lagi'}
                  </Button>
                </Tooltip>
              </Box>  
            </Box>
          </Box>
          ))}
        </Box>
      </Box>
      <Box>
        <Box className='flex items-center justify-center mb-[20px] gap-x-3'>
          <p className='font-[sans_serif] text-center font-medium text-[24px] sm:text-[26px]'>
            Kuis
          </p>
          <HelpOutlinedIcon id='iconHelp' onClick={handleOpen2}/>
        </Box>
        <Box className="grid gridCard gap-y-[50px] gap-x-[60px]">
          {challengeUserData.map((challenge) => {
            const challengeIndex = challengeList.findIndex(item => item.namaChallenge === challenge.namaChallenge);
            if (challengeIndex !== -1) {
              challengeList.splice(challengeIndex, 1);
            }
            return (
              <Box key={challenge.id} id="courseCard" className="w-[360px] h-[270px] bg-[#D6E6F2] rounded-xl flex flex-col items-center py-[10px] gap-[8px]">
                <img src={challenge.gambarUrl} id="imageCourseCard" className="object-cover rounded-xl w-[344px] h-[200px]" />
                <Box className='flex px-[12px] w-full justify-between items-center'>
                  <p className='font-medium text-[24px]'>
                      {challenge.namaChallenge}
                  </p>
                  <Box className='space-x-2 flex items-center'>
                    {challenge.perfectClear === 'no' ? '' : <img src="/award.png" className="object-cover rounded-xl w-[45px] h-[45px]" />}
                    {challenge.firstClear === 'no' ? <CloseIcon className="text-red-600" /> : <CheckIcon className="text-green-600"/>}
                    <Tooltip title={challengeText} enterTouchDelay={0}>
                      <Button 
                      id={challenge.firstClear === 'no' ? 'basicButtonBlue' : 'basicButtonGreen'} className='' 
                      onClick={() => {
                        const matchedCourse = coursesUserData.find(course => course.namaCourse === challenge.namaChallenge);
                        if (matchedCourse) {
                          navigate("/materi/challenge/" + challenge.namaChallenge.replace(/\s+/g, '-').toLowerCase());
                        } else {
                          handleOpen3(challenge);
                        }
                      }}
                      >
                        {challenge.firstClear === 'no' ? 'Mulai' : 'Tantang Ulang'}
                      </Button>
                    </Tooltip>
                  </Box>
                </Box>
              </Box>
            );
          })}
          {challengeList.map((challenge) => (
            <Box key={challenge.id} id="courseCard" className="w-[360px] h-[270px] bg-[#D6E6F2] rounded-xl flex flex-col items-center py-[10px] gap-[8px]">
              <img src={challenge.gambarUrl} id="imageCourseCard" className="object-cover rounded-xl w-[344px] h-[200px]" />
              <Box className='flex px-[12px] w-full justify-between items-center'>
                <p className='font-medium text-[24px]'>
                    {challenge.namaChallenge}
                </p>
                <Box className='space-x-2 items-center'>
                  <CloseIcon className="text-red-600" />
                  <Tooltip title={challengeText} enterTouchDelay={0}>
                    <Button 
                    id='basicButtonBlue'
                    onClick={() => {
                      const matchedCourse = coursesUserData.find(course => course.namaCourse === challenge.namaChallenge);
                      if (matchedCourse) {
                        navigate("/materi/challenge/" + challenge.namaChallenge.replace(/\s+/g, '-').toLowerCase());
                      } else {
                        handleOpen3(challenge);
                      }
                    }}
                    >
                      Mulai
                    </Button>
                  </Tooltip>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Dialog
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
          keepMounted
        >
          <DialogTitle className="flex justify-center">
            {"Informasi"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText className="flex justify-center">
              Penyelesaian pertama akan memberikan hadiah poin dan skor.<br/> <br/>
              Penyelesaian berikutnya tidak akan memberikan hadiah apa pun.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button id='basicButtonBlue' onClick={handleClose}>
                Tutup
            </Button>
          </DialogActions>
      </Dialog>

      <Dialog
          open={open2}
          onClose={handleClose2}
          TransitionComponent={Transition}
          keepMounted
        >
          <DialogTitle className="flex justify-center">
            {"Informasi"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText className="flex justify-center">
              Setiap penyelesaian akan memberikan hadiah poin dan skor. <br/> <br/>
              Terdapat 5 nyawa, jika nyawa habis maka Anda harus mengulang dari awal.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button id='basicButtonBlue' onClick={handleClose2}>
                Tutup
            </Button>
          </DialogActions>
      </Dialog>

      <Dialog
          open={open3}
          onClose={handleClose3}
          TransitionComponent={Transition}
          keepMounted
        >
          <DialogTitle className="flex justify-center">
            {"Oopss.."}
          </DialogTitle>
          <DialogContent>
            <DialogContentText className="flex justify-center">
              Anda harus menyelesaikan pelajaran {selectedChallenge && selectedChallenge.namaChallenge} terlebih dahulu!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button id='basicButtonBlue' onClick={handleClose3}>
                Tutup
            </Button>
          </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});