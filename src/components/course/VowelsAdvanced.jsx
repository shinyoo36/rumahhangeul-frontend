import React, { useState, } from "react";
import { useNavigate } from "react-router-dom";

import { 
  Box, Button, Divider, LinearProgress,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle 
} from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import ButtonBase from '@mui/material/ButtonBase';
import TouchRipple from '@mui/material/ButtonBase/TouchRipple';

import NotificationToast from "../../components/Notification.jsx";
import { userLocal, getUserCourseByCourseId } from "../../utils/user";
import { NavigateBefore } from "@mui/icons-material";
import { vowels2 } from "../../constants/index.js";

const VowelsAdvanced = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = React.useState(0);
  const [reward, setReward] = useState('no');

  const [indexArray, setIndexArray] = useState(Array.from({ length: 11 }, (_, i) => i).sort(() => Math.random() - 0.5));
  const [currentIndex, setCurrentIndex] = useState(() => {
    const randomIndex = indexArray.pop();
    setIndexArray(prevArray => [...prevArray]);
    return randomIndex;
  });

  const userData = userLocal();
  const id = userData.id;

  const [showNotification, setShowNotification] = useState(false); 
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('');

  const handleUpdateCourse = async () => {
      try {
        const response = await fetch(`http://localhost:8080/user/profile/${id}/update-score`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            "score": 1100,
            "point": 110,
          })
        });
        if(response.ok){
          setReward('yes');
        }
      } catch (error) {
        console.error("Error occurred during update score", error);
      }

    try {
      const response = await fetch(`http://localhost:8080/user/profile/${id}/course`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          "namaCourse": "Vokal 2",
          "completed": "yes",
          "gambarUrl": '/course/vowels2.png',
        })
      });

      if (response.ok) {
        const data = await response.text();
        console.log("Response data", data);
        setNotificationMessage(data); //
        setNotificationType("success");
        setShowNotification(true);
        setTimeout(() => {
          setOpen(true);
          setShowNotification(false);
        }, 1000);
      }
    } catch (error) {
      console.error("Error occurred during update:", error);
    }
  };

  const handleNextClick = () => {
    if (indexArray.length === 0) {
      handleUpdateCourse();
      setProgress(10);
    } else {
      const nextIndex = indexArray.pop();
      setProgress(progress+1);
      setCurrentIndex(nextIndex);
      setIndexArray(prevArray => [...prevArray]);
    }
  };

  const koreanCharacters = vowels2.koreanCharacters;
  const indonesianCharacters = vowels2.indonesianCharacters;

  let isPlaying = false;
  const playSound = async (index) => {
    if (isPlaying) return; 
    try {
      isPlaying = true;
      const character = indonesianCharacters[index];
      const soundFile = `/sound/advancedVowels/${character}.mp3`;
      const audio = new Audio(soundFile);
      audio.addEventListener('ended', () => {
        isPlaying = false;
      });
      
      audio.play();
    } catch (error) {
      console.error('Error loading sound:', error);
      isPlaying = false;
    }
  };

  let isPlaying2 = false;
  const playSound2 = async (index) => {
    if (isPlaying2) return;
    try {
      isPlaying2 = true;
      const character = indonesianCharacters[index];
      const soundFile = `/sound/advancedVowels2/${character}.mp3`;
      const audio = new Audio(soundFile);
      audio.addEventListener('ended', () => {
        isPlaying2 = false;
      });
      audio.play();
    } catch (error) {
      console.error('Error loading sound:', error);
      isPlaying2 = false;
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    navigate("/materi");
  };

  return (
    <Box className="h-full sm:h-[70vh] flex flex-col justify-center items-center my-[20px]">
      <Box id="progressBar" className='flex items-center text-center justify-center gap-x-[12px]'> 
        <LinearProgress id="progressBar" placeholder="tes" variant="determinate" value={progress * 10} />
        <p>
          {Math.round(progress * 10)}%
        </p>
      </Box>
      <Box className="m-5 rounded-lg courseContainer flex flex-col sm:flex-row justify-between items-center">
        <img src="/course/vowels2.png" className="object-cover bg-[#94A2FB] rounded-3xl p-[10px] m-[10px] w-[372px] h-[372px]" />
        <Box className='flex-1 flex flex-col w-[250px] p-5 gap-y-[8px] '>
          <Box className='bg-[#ebeeef] p-2 rounded-xl'>
            <p className='text-[28px]'>
              Korea 
            </p>
            <p label="koreanChara" className='text-[20px]'>
              {koreanCharacters[currentIndex]}
            </p>
          </Box>
          <Divider sx={{ borderBottomWidth: '3.5px', backgroundColor:'#ebeeef' }} />
          <Box className='bg-[#E0F4FF]  p-2 rounded-xl'>
            <p className='text-[28px]'>
              Indonesia
            </p>
            <p label="indoChara" className='text-[20px]'>
              {indonesianCharacters[currentIndex]}
            </p>
          </Box>
          <Divider sx={{ borderBottomWidth: '3.5px', backgroundColor:'#ebeeef' }} />
          <p className='text-[28px]'>
            Suara
          </p>
          <Box className='flex gap-x-2'>
            <ButtonBase id='iconSuara' onClick={() => playSound(currentIndex)}>
              <RecordVoiceOverIcon id='iconSuara'/>
              <TouchRipple />
            </ButtonBase>
            <ButtonBase id='iconSuara' onClick={() => playSound2(currentIndex)}>
              <RecordVoiceOverIcon id='iconSuara'/>
              <TouchRipple />
            </ButtonBase>
          </Box>
        </Box>
        
      </Box>
      <Box className='flex gap-x-[40px]'>
        <Button id='basicButtonBlue' className="hover:bg-gray-200" onClick={() => navigate("/materi")} startIcon={<NavigateBefore/>}>
          Batal
        </Button>
        <Button id={progress === 10 ? 'basicButtonGreen' : 'basicButtonBlue'} className="hover:bg-gray-200" onClick={handleNextClick} endIcon={<NavigateNextIcon/>}>
          {progress === 10 ? "Selesaikan" : "Berikutnya"}
        </Button>
      </Box>
 
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle className="flex justify-center">
          {"Selamat"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="flex justify-center">
            {reward === 'yes' ?
             'Anda telah menyelesaikan pelajaran ini dan mendapatkan 1100 skor dan 110 poin.' 
             : 
             'Anda telah mempelajari ulang pelajaran ini.'
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Tutup
          </Button>
        </DialogActions>
      </Dialog>
      {showNotification && (
          <NotificationToast message={notificationMessage} type={notificationType}  />
      )}
    </Box>
  );
};

export default VowelsAdvanced;
