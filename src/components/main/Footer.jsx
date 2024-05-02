import { logo } from "../../assets";
import { Box } from "@mui/material";
import { socialMedia } from "../../constants";

const Footer = () => (
  <Box className="h-[full] px-[20px] py-[20px] flex flex-col justify-around bgBluePrimary sm:items-center sm:flex-row sm:px-[50px] sm:justify-between sm:h-[20vh]">
      <Box className="items-center sm:flex">
          <img src={logo} alt="hoobank" className="logo" />
          <Box className="my-[15px] sm:mx-[20px] sm:my-0 sm:text-[18px]">
            <p className="footerText ">
              Ⓒ 2024 RumahHangeul
            </p>
            <p className="footerText">
              All Rights Reserved.
            </p>
          </Box>
      </Box>
      <Box className="flex gap-6">
        {socialMedia.map((social, index) => (
          <img
            key={social.id}
            src={social.icon}
            alt={social.id}
            className="w-[30px] sm:w-[35px] hover:cursor-pointer"
            onClick={() => window.open(social.link)}
          />
        ))}
      </Box>
  </Box>
);

export default Footer;
