import React, { useState, useEffect } from "react";
import { Box, Button, Tooltip, 
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Tab, Tabs,
} from "@mui/material";
import { userLocal, getUserItem, fetchUserData } from "../../utils/user";
import Slide from '@mui/material/Slide';
import { useNavigate } from "react-router-dom";

const EditProfileBorder = () => {
  const userData = userLocal();
  const navigate = useNavigate(); 

  const id = userData.id;
  const currentBorderUsed = userData.borderUsed;
  const currentProfileUsed = userData.profileUsed;


  const hanldeItemUse = async () => {
    try {
      let newProfile, newBorder;
      if(value == 'Profile'){
        newProfile = selectedItem.valueItem;
        newBorder = userData.borderUsed;
      } else{
        newProfile = userData.profileUsed;
        newBorder = selectedItem.valueItem;
      }
      const response = await fetch(`http://localhost:8080/user/profile/${id}/profil`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          "newProfile": newProfile,
          "newBorder": newBorder
        })
      });

      if (response.ok) {
        setTimeout(() => {
          window.location.href = "/profile/edit-profile";
          fetchUserData();
        }, 500);
      }
    } catch (error) {
      console.error("Error occurred during update course,", error);
    }
  };

  const [ ownedItem, setOwnedItem] = useState([]);
  
  useEffect(() => {
    getUserItem().then((data) => setOwnedItem(data));
    }, []);
  
  
  const [selectedItem, setSelectedItem] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };
  const handleBatal = () => {
    setOpen(false);
    setSelectedItem(null);
  };
  const handleYa = () => {
    setOpen(false);
    hanldeItemUse();
  };

  const [value, setValue] = React.useState('Profile');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const profileText = `
    Barang ini akan mengganti foto profil Anda !
  `;
  const borderText = `
    Barang ini akan memberikan tampilan animasi di profil !
  `;

  return (
      ownedItem.length === 0 ? (
      <Box className="min-h-[70vh] flex flex-col items-center justify-center p-[20px] gap-y-[30px]">
        <img src="/oops.jpg" className="object-cover rounded-xl w-[550px]" />
        <Box className=''>
          <p className="textAnimation text-[26px] sm:text-[42px] font-semibold text-[#5e94c9]">
              Barang Anda Kosong!
          </p>
        </Box>
        <Button id="basicButtonBlue" variant="contained" onClick={() => navigate("/profile/edit-profile")} type="button">
          Kembali
        </Button>
      </Box>
      ) : (
      <Box className="flex flex-col justify-center items-center p-[20px] gap-y-[15px]">
          <p className='text-center font-medium text-[26px]'>
            Pilih barang yang ingin digunakan
          </p>
          <Tabs value={value} onChange={handleChange}>
            <Tab id={value == 'Profile' ? 'tabsStyleActive' : ''} value="Profile" label="Profile" />
            <Tab id={value == 'Border' ? 'tabsStyleActive' : ''} value="Border" label="Border" />
          </Tabs>
        <Box className="grid gridShop gap-y-[15px] gap-x-[30px]">
        {ownedItem
        .filter(item => value === 'Profile' && item.tipeItem === 'Profil Picture')
        .map(item => (
          <Box key={item.id} className="bg-[#D6E6F2] p-[5px] rounded-xl flex flex-col items-center py-[10px]">
            <Box className="boxProfile p-[5px]" style={{ '--color-props': currentBorderUsed, '--wAfter-prop': '135px', '--wBefore-prop': '145px'  }}>
              <img src={item.valueItem} className="rounded-full z-10 object-cover w-[130px] h-[130px]" />
            </Box>
            <Box className='flex flex-col justify-center items-center gap-y-1'>
              <p className='font-medium text-[16px]'>
                {item.tipeItem}
              </p>
              <p className='font-medium text-[16px]'>
                {item.namaItem}
              </p>
              <Tooltip title={currentProfileUsed === item.valueItem ? 'Foto ini sedang digunakan' : profileText } enterTouchDelay={0}>
                <Button 
                  id={currentProfileUsed === item.valueItem ? 'basicButtonGreen' : 'basicButtonBlue'} 
                  onClick={currentProfileUsed === item.valueItem ? null : () => handleOpen(item) }
                >
                  {currentProfileUsed === item.valueItem ?   'Digunakan' : 'Pakai'}
                </Button>
              </Tooltip>
            </Box>
          </Box>
        ))}
        {ownedItem
          .filter(item => value === 'Border' && item.tipeItem === 'Profil Border')
          .map(item => (
            <Box key={item.id} className="bg-[#D6E6F2] p-[5px] rounded-xl flex flex-col items-center py-[10px]">
              <Box className="boxProfile p-[5px]" style={{ '--color-props': item.valueItem, '--wAfter-prop': '135px', '--wBefore-prop': '145px'  }}>
                <img src={userData.profileUsed} className="rounded-full z-10 object-cover w-[130px] h-[130px]" />
              </Box>
              <Box className='flex flex-col justify-center items-center gap-y-1'>
                <p className='font-medium text-[16px]'>
                  {item.tipeItem}
                </p>
                <p className='font-medium text-[16px]'>
                  {item.namaItem}
                </p>
                <Tooltip title={currentBorderUsed === item.valueItem ? 'Border ini sedang digunakan' : borderText } enterTouchDelay={0}>
                  <Button 
                    id={currentBorderUsed === item.valueItem ? 'basicButtonGreen' : 'basicButtonBlue'} 
                    onClick={currentBorderUsed === item.valueItem ? null : () => handleOpen(item) }
                  >
                    {currentBorderUsed === item.valueItem ?   'Digunakan' : 'Pakai'}
                  </Button>
                </Tooltip>
              </Box>
            </Box>
          ))}
        </Box>
        <Button id="basicButtonBlue" variant="contained" onClick={() => navigate("/profile/edit-profile")} type="button">
          Kembali
        </Button>
        <Dialog
          open={open}
          onClose={handleBatal}
          TransitionComponent={Transition}
          keepMounted
        >
          <DialogTitle className="flex justify-center">
            {"Perhatian!"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText className="flex justify-center">
              Anda akan menggunakan {selectedItem && selectedItem.tipeItem} {selectedItem && selectedItem.namaItem}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button id='basicButtonBlue' onClick={handleBatal}>
                Batal
            </Button>
            <Button id='basicButtonGreen' onClick={handleYa} autoFocus>
              Ya
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      )
  );
};

export default EditProfileBorder;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});