import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

import { 
  Box, Button, LinearProgress,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle 
} from "@mui/material";
import { 
  HeartBroken,Favorite, NavigateBefore
} from "@mui/icons-material";

import NotificationToast from "../Notification.jsx";
import { userLocal } from "../../utils/user";
import { vowels1 } from "../../constants/index.js";

const ChallengeVowels = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = React.useState(0);
  const [score, setScore] = useState(0);

  const [indexArray, setIndexArray] = useState(Array.from({ length: 10 }, (_, i) => i).sort(() => Math.random() - 0.5));
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

  const handleFinishChallenge = async () => {
    const updatedScore = score + 300;
    let perfectClear;
    if(heartCount == 5){
      perfectClear = "yes"
      updatedScore * 2;
    } else{
      perfectClear = "no"
    }
    
    try {
      await fetch(`https://rumahhangeul-backend-422018.et.r.appspot.com/user/profile/${id}/update-score`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          "score": updatedScore,
          "point": updatedScore/10,
        })
      });

      const response = await fetch(`https://rumahhangeul-backend-422018.et.r.appspot.com/user/profile/${id}/challenge`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          "namaChallenge": "Vokal",
          "firstClear": "yes",
          "perfectClear": perfectClear,
          "gambarUrl": '/challenge/vowels1.png',
        })
      });

      if (response.ok) {
        const data = await response.text();
        setNotificationMessage(data); //
        setNotificationType("success");
        setShowNotification(true);
        setTimeout(() => {
          setOpen(true);
          setShowNotification(false);
        }, 1000);
      }
    } catch (error) {
      console.error("Error occurred during update course,", error);
    }
  };

  const koreanCharacters = vowels1.koreanCharacters;
  const indonesianCharacters = vowels1.indonesianCharacters;

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    navigate("/materi");
  };

  const [shuffledChoices, setShuffledChoices] = useState([]);
  useEffect(() => {
    const shuffledIndonesianCharacters = indonesianCharacters
      .filter((_, index) => index !== currentIndex)
      .sort(() => Math.random() - 0.5);
    const choices = [
      { id: '1', answer: 'true', text: indonesianCharacters[currentIndex] },
      { id: '2', answer: 'false', text: shuffledIndonesianCharacters[0] },
      { id: '3', answer: 'false', text: shuffledIndonesianCharacters[1] },
      { id: '4', answer: 'false', text: shuffledIndonesianCharacters[2] }
    ];
    const shuffledChoices = choices.sort(() => Math.random() - 0.5);
    setShuffledChoices(shuffledChoices);
  }, [currentIndex]);

  const handleNextClick = (selectedChoiceId) => {
    const selectedChoice = shuffledChoices.find(choice => choice.id === selectedChoiceId);
    if (selectedChoice && selectedChoice.answer === 'true') {
      handleNextQuestion();
      setScore(score+300);
    } else {
      handleNextQuestion();
      setHeartCount(prevCount => Math.max(0, prevCount - 1));
      setHeartLostCount(prevCount => Math.max(0, prevCount + 1));
    }
  };
  
  const handleNextQuestion = () => {
    if (indexArray.length === 0) {
      setScore(score+300);
      handleFinishChallenge();
      setProgress(10);
    } else {
      const nextIndex = indexArray.pop();
      setCurrentIndex(nextIndex);
      setProgress(prevProgress => prevProgress + 1);
    }
  };

  const [heartCount, setHeartCount] = useState(5); 
  const [heartLostCount, setHeartLostCount] = useState(0); 
  const hearts = Array.from({ length: heartCount }, (_, index) => (
    <Favorite key={index} id="heart" />
  ));
  const lostHearts = Array.from({ length: heartLostCount }, (_, index) => (
    <HeartBroken key={index} id="heartLost" />
  ));

  useEffect(() => {
    if (heartCount === 0) {
      setOpen(true);
    }
  }, [heartCount]);
  const handleCobaLagi = () => {
    setOpen(false);
    window.location.reload();
  };
  const handleBack = () => {
    setOpen(false);
    navigate("/materi");
  };
  return (
    <Box className="min-h-[70vh] sm:h-full flex flex-col  items-center my-[20px] gap-y-4">
      <Box id="progressBar" className='flex items-center text-center justify-center gap-x-[12px]'> 
        <LinearProgress id="progressBar" placeholder="tes" variant="determinate" value={progress * 10} />
        <p>
          {Math.round(progress * 10)}%
        </p>
      </Box>
      <Box id="heartContainer" className='flex flex-row justify-between'>
        <Box>
          <p className='text-[18px] md:text-[24px] text-center'>
            Sisa nyawa :
          </p>
        </Box>
        <Box>
          {lostHearts}{hearts}
        </Box>
      </Box>
     
      <Box className="w-full rounded-lg flex flex-col gap-y-6 p-[15px]">
        <Box className=' flex flex-col items-center justify-center gap-y-6'>
          <p className='text-[26px]'>
            Pilih terjemahan yang benar dari huruf 
          </p>
          <Box className='bg-[#E0F4FF] p-2 rounded-2xl w-[350px] text-center'>
            <p className='text-[22px]'>
              Korea : {koreanCharacters[currentIndex]}
            </p>
          </Box>
        </Box>
        <Box className='flex justify-center'>
          <Box className="grid grid-cols-2 gap-x-[150px] gap-y-[30px]">
            {shuffledChoices.map(choice => (
              <Box 
              key={choice.id} 
              className='bg-[#ebeeef] p-2 rounded-xl w-[100px] hover:cursor-pointer'
              onClick={() => handleNextClick(choice.id)}
              >
                <p className='text-center text-[22px]'>
                  {choice.text}
                </p>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Button id='basicButtonBlue' className="hover:bg-gray-200" onClick={() => navigate("/materi")} startIcon={<NavigateBefore/>}>
        Kembali
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle className="flex justify-center">
          {heartCount === 0 ? "Oopss..." : "Selamat"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="flex justify-center">
            {heartCount === 0 ? "Maaf nyawa Anda sudah habis !" : "Anda telah menyelesaikan kuis ini."}
          </DialogContentText>
        </DialogContent>
        {heartCount === 0 ? 
        <DialogActions id="modalButtonContainer">
          <Button id='basicButtonBlue' onClick={handleCobaLagi} autoFocus>
            Coba Lagi
          </Button>
          <Button id='basicButtonGreen' onClick={handleBack} autoFocus>
            Kembali
          </Button>
        </DialogActions>
        : 
        <DialogActions>
          <Button id='basicButtonGreen' onClick={handleClose} autoFocus>
            Tutup
          </Button>
        </DialogActions>
        }
      </Dialog>
      {showNotification && (
          <NotificationToast message={notificationMessage} type={notificationType}  />
      )}
    </Box>
  );
};

export default ChallengeVowels;
