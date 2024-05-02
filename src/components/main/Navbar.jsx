import { useState, useEffect } from "react";
import { Button, Box, MenuItem, SwipeableDrawer } from "@mui/material";
import { logo } from "../../assets";
import { navLinks } from "../../constants";
import { Link, useNavigate, useLocation  } from "react-router-dom"
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { userLocal } from "../../utils/user";
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const userData = userLocal();
  const navigate = useNavigate();

  const [active, setActive] = useState('');

  const [isDrawerNavOpen, setIsDrawerNavOpen] = useState(false);
  const handleDrawerNavOpen = () => {
    setIsDrawerNavOpen(true);
  };
  const handleDrawerNavClose = () => {
    setIsDrawerNavOpen(false);
  };

  const [isDrawerMenuOpen, setIsDrawerMenuOpen] = useState(false); 
  const handleDrawerMenuOpen = () => {
    setIsDrawerMenuOpen(true);
  };
  const handleDrawerMenuClose = () => {
    setIsDrawerMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('userData'); 
    navigate("/");    
    window.location.reload();
  };
  
  const location = useLocation();
  useEffect(() => {
    const path = location.pathname;
    const activeNavItem = navLinks.find(nav => {
      const segments = path.split('/');
      return segments[1] === nav.id;
    });
    if (activeNavItem) {
      const title = activeNavItem.title.charAt(0).toUpperCase() + activeNavItem.title.slice(1);
      setActive(title);
    } else {
      setActive("Beranda");
    }
  }, [location]);
  return (
    <Box className="w-full bgBluePrimary p-[20px] flex items-center sm:flex-row sm:px-[50px] justify-between h-[10vh]">
      <Box className="flex items-center justify-center md:flex">
        <Box className="flex flex-row justify-between items-center space-x-3 sm:hidden">
          <MenuIcon onClick={handleDrawerNavOpen}/>
          <img src={logo} alt="hoobank" id="iconMobile" className="hidden" />
            <SwipeableDrawer
              anchor="top"
              open={isDrawerNavOpen}
              onClose={handleDrawerNavClose}  
              onOpen={handleDrawerNavOpen}
              disableSwipeToOpen={true}
            >
              <Box>
                <ul className="p-[15px] rounded-b-3xl">
                  {navLinks.map((nav, index) => (
                    <CustomLink
                      to={`/${nav.id}`}
                      key={nav.id}
                      className={`  navbarText gap-x-4 text-4xl ${
                        active === nav.title ? "text-black" : "text-gray-500"
                      } ${index === navLinks.length - 1 ? "" : ""}`}
                      onClick={() => setActive(nav.title)}  
                    >
                      {nav.title}
                    </CustomLink>
                  ))}
                  <Box className=' flex justify-center items-center'>
                    <Box className=' bgBluePrimary w-1/3 h-[12px] rounded-3xl'/>
                  </Box>
                </ul>
              </Box>
          </SwipeableDrawer>
        </Box>
        <img src={logo} alt="hoobank" className="hidden sm:flex logo" />
      </Box>
      <Box className="flex flex-row items-center gap-x-[5px]">
        <ul className="sm:flex hidden">
          {navLinks.map((nav, index) => (
            <CustomLink
              to={`/${nav.id}`}
              key={nav.id}
              className={`navbarText ${
                active === nav.title ? "text-black" : "text-gray-500"
              } ${index === navLinks.length - 1 ? "mr-0" : "mr-[25px]"}`}
              onClick={() => setActive(nav.title)}  
            >
              {nav.title}
            </CustomLink>
          ))}
        </ul>
          
        {userData ? (
        <Box className="">
            <PersonOutlineIcon onClick={handleDrawerMenuOpen} />
            <SwipeableDrawer
              anchor="right"
              open={isDrawerMenuOpen}
              onClose={handleDrawerMenuClose}
              onOpen={handleDrawerMenuOpen}
              disableSwipeToOpen={true}
            >
              <Box className='flex flex-row w-full h-full'>
                <Box className='md:hidden px-[10px] h-full flex items-center justify-center'>
                  <Box className='bgBluePrimary w-[6px] h-1/2 items-center justify-center rounded-3xl'/>
                </Box>
                <Box className='space-y-[5px] py-[15px] pr-[24px] md:px-[30px] rounded-b-3xl'>
                  <Box className='w-[220px] h-[250px] flex flex-col items-center justify-center'>
                    <Box className="boxProfile p-[5px]" style={{ '--color-props': userData.borderUsed, '--wAfter-prop': '125px', '--wBefore-prop': '135px' }}>
                      <img src={userData.profileUsed} className="rounded-full z-10 object-cover w-[120px] h-[120px]" />
                    </Box>
                    <p className='text-center py-[5px] font-medium text-gray-700'>Halo, {userData.namaDepan}</p>
                    <p className='text-center py-[5px] font-medium text-gray-700'>Skor: {userData.score}</p>
                    <p className='text-center py-[5px] font-medium text-gray-700'>Poin: {userData.point}</p>
                  </Box>
                  <MenuItem onClick={() => navigate("/profile")}>Lihat Profil</MenuItem>
                  <MenuItem onClick={handleLogout}>Keluar</MenuItem>
                </Box>
              </Box>
            </SwipeableDrawer>
        </Box>
      ) : (
        <Button id="basicButtonWhite" className="hover:bg-gray-200" onClick={() => navigate("/signin")}>
            Masuk
        </Button>
      )}
      </Box>
  
    </Box>
  );
};

export default Navbar;

function CustomLink({ to, children, ...props }) {
  return (
    <li>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}