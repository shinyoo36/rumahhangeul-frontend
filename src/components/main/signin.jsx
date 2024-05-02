import React, { useState } from "react";
import { Button, Box, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { timetolearn } from "../../assets/index.js";
import NotificationToast from "../Notification.jsx";

const SignIn = () => {
  const navigate = useNavigate();

  const [username, setUsername]=useState('');
  const [password, setPassword]=useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const users = { username, password};

  const [showNotification, setShowNotification] = useState(false); 
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setUsernameError(false); 
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(false);
  };
  const validateInputs = () => {
    const isPasswordValid = password.length >= 6 && /\d/.test(password);
    const isUsernameValid = !!username.trim();
    setPasswordError(!isPasswordValid);
    setUsernameError(!isUsernameValid);
    return isPasswordValid && isUsernameValid;
  };
  
  const handleSignIn = async (e) => {
    e.preventDefault();
  
    const inputsValid = validateInputs();
    if (!inputsValid) {
      return;
    }
  
    try {
      const response = await fetch("https://rumahhangeul-backend-422018.et.r.appspot.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(users)
      });
      
      if (response.ok) {
          const data = await response.json();
          localStorage.setItem("userData", JSON.stringify(data.userProjection));
          if(data.userProjection !=null){
            setNotificationMessage(data.message); //
            setNotificationType("success");
            setShowNotification(true);
            setTimeout(() => {
              window.location.href="/";
              setShowNotification(false);
            }, 1500);
          } else{
            setNotificationMessage(data.message);
            setNotificationType("error");
            setShowNotification(true);
            setTimeout(() => {
              setShowNotification(false);
            }, 1500);
          }
        }
    } catch (error) {
      console.error("Error occurred during signin:", error);
    }
  };


  return (
      <Box className="min-h-[70vh] pt-[10px] h-full items-center flex flex-col justify-center">
        <Box className="flex justify-center">
          <img src={timetolearn } className="w-[330px] h-[204px]" />
        </Box>
        <Box className="pt-[30px] flex flex-col justify-center items-center">
          <p className="formTextContainer">
            Masuk sekarang !!! <br/>
            Belajar dengan asik dan cepat
          </p>
          <Box className="textFieldContainer">
            <TextField 
              required id="username"
              variant="standard" size="medium" state="enabled" 
              label={"Username"} placeholder={"username"} 
              className="w-[340px]"
              value={username}
              onChange={handleUsernameChange}
              error={usernameError}
              helperText={usernameError ? "Username tidak boleh kosong" : ""} 
            > 
            </TextField>
          </Box>
          <Box className="textFieldContainer">
            <TextField 
              required id="password" type="password"
              variant="standard" size="medium" state="enabled" 
              label={"Password"} placeholder={"password"} 
              className="w-[340px]"
              value={password}
              onChange={handlePasswordChange}
              error={passwordError}
              helperText={passwordError && "Password must be at least 6 characters long and contain at least 1 number"}
            >
            </TextField>
          </Box>
          <Box className="buttonContainer mb-[20px]">
            <Button id="basicButtonBlue" onClick={handleSignIn}>
              Masuk
            </Button>
          </Box>
          <Box className="buttonContainer flex-col mb-[20px]">
            <p className="text-2xl text-center font-semibold mb-[10px]">
              Belum punya Akun ?
            </p>
            <Box className="buttonContainer mt-[5px]">
              <Button id="basicButtonBlue" onClick={() => navigate("/signup")}>
                Daftar
              </Button>
            </Box>
          </Box>
        </Box>
        {showNotification && (
          <NotificationToast message={notificationMessage} type={notificationType}  />
        )}
      </Box>
  );
};

export default SignIn;
