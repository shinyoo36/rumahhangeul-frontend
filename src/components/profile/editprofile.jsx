import React, { useState, useEffect } from "react";
import { Box, Button, TextField} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { userLocal, fetchUserData} from "../../utils/user";
import EditIcon from '@mui/icons-material/Edit';
import NotificationToast from "../Notification.jsx";

const EditProfile = () => {
  fetchUserData();
  const userData = userLocal();
  const navigate = useNavigate();

  const [namaDepan, setNamaDepan]=useState(userData.namaDepan);
  const [namaBelakang, setNamaBelakang]=useState(userData.namaBelakang);
  const [namaDepanError, setNamaDepanError] = useState(false);
  const updateUserData = { namaDepan, namaBelakang };
  const [showNotification, setShowNotification] = useState(false); 
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('');
  const handleNamaDepanChange = (e) => {
    setNamaDepan(e.target.value);
    setNamaDepanError(false);
  };
  const handleNamaBelakangChange = (e) => {
    setNamaBelakang(e.target.value);
  };

  const validateInputs = () => {
    const isNamaDepanValid = !!namaDepan.trim(); 
    setNamaDepanError(!isNamaDepanValid);
    return isNamaDepanValid;
  };
  
  const id = userData.id;
  const handleUpdateUser = async (e) => {
    e.preventDefault();
  
    const inputsValid = validateInputs();
    if (!inputsValid) {
      return;
    }
  
    try {
      const response = await fetch(`https://rumahhangeul-backend-422018.et.r.appspot.com/user/profile/${id}/update`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateUserData)
      });
      
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("userData", JSON.stringify(data.userProjection));
        setNotificationMessage(data.message); //
        setNotificationType("success");
        setShowNotification(true);
        setTimeout(() => {
          window.location.href = "/profile";
          setShowNotification(false);
        }, 1500);
      } else {
        // Registration failed
        const errorMessage = await response.text();
        setNotificationMessage(errorMessage);
        setNotificationType("error");
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 1500);
      }
    } catch (error) {
      console.error("Error occurred during update:", error);
    }
  };

  return (
    <Box className="min-h-[70vh] flex flex-col justify-center pt-[20px] pb-[15px]">
      <Box className="flex flex-col items-center gap-y-4">
        <Box className="boxProfile p-[5px]" style={{ '--color-props': userData.borderUsed, '--wAfter-prop': '185px', '--wBefore-prop': '195px' }}>
          <img src={userData.profileUsed} className="rounded-full z-10 object-cover w-[180px] h-[180px]" />
        </Box>
        <Button id="basicButtonBlue" variant="contained" onClick={() => navigate("/profile/edit-profile-border")} startIcon={<EditIcon/>}>
          Ubah Border
        </Button>
        <p className="font-semibold text-[32px] text-center">
          {namaDepan}
        </p>
        <Box className="textFieldContainer">
          <TextField 
            required id="namaDepan"
            variant="standard" size="medium" state="enabled" 
            label={"Nama Depan"} placeholder={namaDepan} 
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
        <Box className="w-[340px] flex mb-[15px] justify-between">
          <Button id="basicButtonBlue" variant="contained" onClick={() => navigate("/profile")} type="button">
            Batal
          </Button>
          <Button id="basicButtonGreen" variant="contained" onClick={handleUpdateUser}>
            Simpan
          </Button>
        </Box>
      </Box>
      {showNotification && (
        <NotificationToast message={notificationMessage} type={notificationType}  />
      )}
    </Box>
  );
};

export default EditProfile;
