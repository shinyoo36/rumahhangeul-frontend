import React, { useState, useEffect } from "react";
import { 
  Box, Button, Tooltip, 
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Tab, Tabs,
} from "@mui/material";
import { userLocal, getUserItem, fetchUserData } from "../utils/user";
import { shopBorderList, shopProfileBasicList, shopProfileGirlList, shopProfileAnimalList, shopProfileBoyList} from "../constants";
import Slide from '@mui/material/Slide';

const Shop = () => {
  fetchUserData();
  const messageText = `
    Barang ini akan memberikan tampilan animasi di profil !
  `;

  const [ ownedItem, setOwnedItem] = useState([]);
  useEffect(() => {
    getUserItem().then((data) => setOwnedItem(data));
  }, []);
  
  const userData = userLocal();
  let id, point;
  if(userData != null){
    id = userData.id;
    point = userData.point;
  }
  console.log("ID", id);
  const handleBuyItem = async () => {
    try {
      await fetch(`http://localhost:8080/user/profile/${id}/update-score`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          "score": 0,
          "point": -selectedItem.price,
        })
      });

      const response = await fetch(`http://localhost:8080/user/profile/${id}/item`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          "tipeItem": selectedItem.tipeItem,
          "namaItem": selectedItem.namaItem,
          "valueItem": selectedItem.valueItem
        })
      });

      if (response.ok) {
        const data = await response.text();
        setOpen2(true);
        console.log(data);
      }
    } catch (error) {
      console.error("Error occurred during update course,", error);
    }
  };

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
          const data = await response.text();
          console.log(data);
          setOpen2(false);
          window.location.reload();
        }
      } catch (error) {
        console.error("Error occurred during update course,", error);
      }
  };

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
    handleBuyItem();
  };

  const [open2, setOpen2] = React.useState(false);
  const handleClose2 = () => {
    setOpen2(false);
    setSelectedItem(null);
    window.location.reload();
  };

  const [value, setValue] = React.useState('Profile');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className="flex flex-col justify-center items-center my-[30px] gap-y-4">
      <p className='text-center font-medium text-[26px]'>
        Daftar barang yang dijual
      </p>
      <Tabs value={value} onChange={handleChange}>
        <Tab id={value == 'Profile' ? 'tabsStyleActive' : ''} value="Profile" label="Profile" />
        <Tab id={value == 'Border' ? 'tabsStyleActive' : ''} value="Border" label="Border" />
      </Tabs>
      {value == "Profile" ? (
      <Box className="grid gridShop gap-y-[15px] gap-x-[30px]">
        {shopProfileAnimalList
        .filter(item => !ownedItem.find(owned => owned.tipeItem === item.tipeItem && owned.namaItem === item.namaItem))
        .map(item => (
          <Box key={item.id} className="bg-[#D6E6F2] p-[5px] rounded-xl flex flex-col items-center py-[10px] gap-[8px]">
            <Box className="boxProfileShop p-[5px]" style={{ '--color-props': item.color, '--wAfter-prop': '135px', '--wBefore-prop': '145px'  }}>
              <img src={item.valueItem} className="z-10 object-cover w-[220px] h-[220px]"/>
            </Box>
            <Box className='flex flex-col justify-center items-center gap-y-1'>
              <p className='font-medium text-[16px]'>
                  {item.tipeItem}
              </p>
              <p className='font-medium text-[16px]'>
                  {item.namaItem}
              </p>
              <p className='font-medium text-[16px]'>
                  {item.price} Poin
              </p>
              <Tooltip title={messageText} enterTouchDelay={0}>
                <Button id='basicButtonBlue' className='' onClick={() => handleOpen(item)}>
                  Belanja
                </Button>
              </Tooltip>
            </Box>
          </Box>
        ))}
        {shopProfileBoyList
        .filter(item => !ownedItem.find(owned => owned.tipeItem === item.tipeItem && owned.namaItem === item.namaItem))
        .map(item => (
          <Box key={item.id} className="bg-[#D6E6F2] p-[5px] rounded-xl flex flex-col items-center py-[10px] gap-[8px]">
            <Box className="boxProfileShop p-[5px]" style={{ '--color-props': item.color, '--wAfter-prop': '135px', '--wBefore-prop': '145px'  }}>
              <img src={item.valueItem} className="z-10 object-cover w-[220px] h-[220px]"/>
            </Box>
            <Box className='flex flex-col justify-center items-center gap-y-1'>
              <p className='font-medium text-[16px]'>
                  {item.tipeItem}
              </p>
              <p className='font-medium text-[16px]'>
                  {item.namaItem}
              </p>
              <p className='font-medium text-[16px]'>
                  {item.price} Poin
              </p>
              <Tooltip title={messageText} enterTouchDelay={0}>
                <Button id='basicButtonBlue' className='' onClick={() => handleOpen(item)}>
                  Belanja
                </Button>
              </Tooltip>
            </Box>
          </Box>
        ))}
        {shopProfileGirlList
        .filter(item => !ownedItem.find(owned => owned.tipeItem === item.tipeItem && owned.namaItem === item.namaItem))
        .map(item => (
          <Box key={item.id} className="bg-[#D6E6F2] p-[5px] rounded-xl flex flex-col items-center py-[10px] gap-[8px]">
            <Box className="boxProfileShop p-[5px]" style={{ '--color-props': item.color, '--wAfter-prop': '135px', '--wBefore-prop': '145px'  }}>
              <img src={item.valueItem} className="z-10 object-cover w-[220px] h-[220px]"/>
            </Box>
            <Box className='flex flex-col justify-center items-center gap-y-1'>
              <p className='font-medium text-[16px]'>
                  {item.tipeItem}
              </p>
              <p className='font-medium text-[16px]'>
                  {item.namaItem}
              </p>
              <p className='font-medium text-[16px]'>
                  {item.price} Poin
              </p>
              <Tooltip title={messageText} enterTouchDelay={0}>
                <Button id='basicButtonBlue' className='' onClick={() => handleOpen(item)}>
                  Belanja
                </Button>
              </Tooltip>
            </Box>
          </Box>
        ))}
        {shopProfileBasicList
        .filter(item => !ownedItem.find(owned => owned.tipeItem === item.tipeItem && owned.namaItem === item.namaItem))
        .map(item => (
          <Box key={item.id} className="bg-[#D6E6F2] p-[5px] rounded-xl flex flex-col items-center py-[10px] gap-[8px]">
            <Box className="boxProfileShop p-[5px]" style={{ '--color-props': item.color, '--wAfter-prop': '135px', '--wBefore-prop': '145px'  }}>
              <img src={item.valueItem} className="z-10 object-cover w-[220px] h-[220px]"/>
            </Box>
            <Box className='flex flex-col justify-center items-center gap-y-1'>
              <p className='font-medium text-[16px]'>
                  {item.tipeItem}
              </p>
              <p className='font-medium text-[16px]'>
                  {item.namaItem}
              </p>
              <p className='font-medium text-[16px]'>
                  {item.price} Poin
              </p>
              <Tooltip title={messageText} enterTouchDelay={0}>
                <Button id='basicButtonBlue' className='' onClick={() => handleOpen(item)}>
                  Belanja
                </Button>
              </Tooltip>
            </Box>
          </Box>
        ))}
      </Box>
      )
      : (
      <Box className="grid gridShop gap-y-[15px] gap-x-[30px]">
        {shopBorderList
        .filter(item => !ownedItem.find(owned => owned.tipeItem === item.tipeItem && owned.namaItem === item.namaItem))
        .map(item => (
          <Box key={item.id} className="bg-[#D6E6F2] p-[5px] rounded-xl flex flex-col items-center py-[10px] gap-[8px]">
            <Box className="boxProfileShop p-[5px]" style={{ '--color-props': item.valueItem, '--wAfter-prop': '135px', '--wBefore-prop': '145px'  }}>
            </Box>
            <Box className='flex flex-col justify-center items-center gap-y-1'>
              <p className='font-medium text-[16px]'>
                  {item.tipeItem}
              </p>
              <p className='font-medium text-[16px]'>
                  {item.namaItem}
              </p>
              <p className='font-medium text-[16px]'>
                  {item.price} Poin
              </p>
              <Tooltip title={messageText} enterTouchDelay={0}>
                <Button id='basicButtonBlue' className='' onClick={() => handleOpen(item)}>
                  Belanja
                </Button>
              </Tooltip>
            </Box>
          </Box>
        ))}
      </Box>
      )}

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
          {value === "Profile" ? 
            point < 300 ? 
              'Maaf poin Anda tidak cukup' 
              :
              `Anda akan membeli barang ${selectedItem && selectedItem.tipeItem} ${selectedItem && selectedItem.namaItem} dengan harga ${selectedItem && selectedItem.price} poin`
            : 
            point < 100 ? 
              'Maaf poin Anda tidak cukup' 
              :
              `Anda akan membeli barang ${selectedItem && selectedItem.tipeItem} ${selectedItem && selectedItem.namaItem} dengan harga ${selectedItem && selectedItem.price} poin`
          }
          </DialogContentText>
        </DialogContent>
        <DialogActions >
          <Button id='basicButtonBlue' onClick={handleBatal}>
            {value === "Profile" ? 
              point < 300 ? 
                'Tutup' 
                :
                'Batal' 
              : 
              point < 100 ? 
                'Tutup' 
                :
                'Batal' 
            }
          </Button>
          {value === "Profile" ? 
              point < 300 ? 
                '' 
                :
                <Button id='basicButtonGreen' onClick={handleYa} autoFocus>
                  Ya
                </Button>
              : 
              point < 100 ? 
                '' 
                :
                <Button id='basicButtonGreen' onClick={handleYa} autoFocus>
                  Ya
                </Button>
          }
        </DialogActions>
      </Dialog>

      <Dialog
        open={open2}
        onClose={handleClose2}
      >
        <DialogTitle className="flex justify-center">
          {"Perhatian!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="flex justify-center">
            Apakah Anda ingin memakai {selectedItem && selectedItem.tipeItem} {selectedItem && selectedItem.namaItem}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button id='basicButtonBlue' onClick={handleClose2}>
              Tidak
          </Button>
          <Button id='basicButtonGreen' onClick={hanldeItemUse} autoFocus>
              Ya
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Shop;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});