import React, { useState } from "react";
import { Alert, Button, Box, TextField, Stack, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { timetolearn } from "../../assets/index.js";
import NotificationToast from "../Notification.jsx";

const SignUp = () => {
  const navigate = useNavigate();

  const [username, setUsername]=useState('');
  const [namaDepan, setNamaDepan]=useState('');
  const [namaBelakang, setNamaBelakang]=useState('');
  const [password, setPassword]=useState('');
  const [email, setEmail]=useState('');

  const [usernameError, setUsernameError] = useState(false);
  const [namaDepanError, setNamaDepanError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const users = { username, namaDepan, namaBelakang, password, email };

  const [showNotification, setShowNotification] = useState(false); 
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('');
  
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setUsernameError(false);
  };
  const handleNamaDepanChange = (e) => {
    setNamaDepan(e.target.value);
    setNamaDepanError(false);
  };
  const handleNamaBelakangChange = (e) => {
    setNamaBelakang(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(false);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(false);
  };
  const validateInputs = () => {
    const emailPattern = /\S+@\S+\.\S+/;
    const isEmailValid = emailPattern.test(email);
    const isPasswordValid = password.length >= 6 && /\d/.test(password);
    const isUsernameValid = !!username.trim(); // Check if username is not empty or null
    const isNamaDepanValid = !!namaDepan.trim(); // Check if username is not empty or null
    setEmailError(!isEmailValid);
    setPasswordError(!isPasswordValid);
    setUsernameError(!isUsernameValid);
    setNamaDepanError(!isNamaDepanValid);
    return isEmailValid && isPasswordValid && isUsernameValid && isNamaDepanValid;
  };
  
  const handleRegister = async (e) => {
    e.preventDefault();
  
    const inputsValid = validateInputs();
    if (!inputsValid) {
      return;
    }
  
    try {
      const response = await fetch("https://rumahhangeul-backend-422018.et.r.appspot.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(users)
      });
      
      if (response.ok) {
        const message = await response.text();
        setNotificationMessage(message); //
        setNotificationType("success");
        setShowNotification(true);
        setTimeout(() => {
          navigate("/signin");
          setShowNotification(false);
        }, 1500);
      } else {
        const errorMessage = await response.text();
        setNotificationMessage(errorMessage);
        setNotificationType("error");
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 1500);
      }
    } catch (error) {
      console.error("Error occurred during registration:", error);
    }
  };

  return (
      <Box className="min-h-[70vh] pt-[25px] h-full items-center flex flex-col justify-center">
        <Box className="flex items-center justify-center">
          <img src={timetolearn} className="w-[330px] h-[204px]" />
        </Box>
        <Box className="formContainer">
          <p className="formTextContainer">
            Daftar sekarang !!! <br/>
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
              required id="namaDepan"
              variant="standard" size="medium" state="enabled" 
              label={"Nama Depan"} placeholder={"nama depan"} 
              className="w-[340px]"
              value={namaDepan}
              onChange={handleNamaDepanChange}
              error={namaDepanError}
              helperText={namaDepanError ? "Nama Depan tidak boleh kosong" : ""} 
            > 
            </TextField>
          </Box>
          <Box className="textFieldContainer">
            <TextField 
              id="namaBelakang"
              variant="standard" size="medium" state="enabled" 
              label={"Nama Belakang"} placeholder={"nama belakang"} 
              className="w-[340px]"
              value={namaBelakang}
              onChange={handleNamaBelakangChange}
            > 
            </TextField>
          </Box>
          <Box className="textFieldContainer">
            <TextField 
              required id="email"
              variant="standard" size="medium" state="enabled" 
              label={"Email"} placeholder={"please enter your email"} 
              className="w-[340px]"
              value={email}
              onChange={handleEmailChange}
              error={emailError}
              helperText={emailError ? "Please enter a valid email" : ""}
            >
            </TextField>
          </Box>
          <Box className="textFieldContainer">
            <p className="text-[18px]">
              Pastikan kata sandi Anda:
            </p>
            <p className="text-[14px]">
              -   terdiri dari 6 karakter atau lebih <br/>
              -   memiliki 1 huruf angka
            </p>
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
              helperText={passwordError && "Password minimal 6 karakter dan berisi 1 angka"}
            >
            </TextField>
          </Box>
          <Box className="buttonContainer mb-[20px]">
            <Button id="basicButtonBlue" onClick={handleRegister}>
              Daftar
            </Button>
          </Box>
        </Box>
        {showNotification && (
          <NotificationToast message={notificationMessage} type={notificationType}/>
        )}
      </Box>
  );
};

export default SignUp;
