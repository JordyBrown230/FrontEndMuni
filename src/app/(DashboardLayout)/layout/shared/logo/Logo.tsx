import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "180px",
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  return (
    <LinkStyled href="/municipalidad">
      <Image src="/images/logos/logo_La_Cruz_2.png" alt="logo" height={70} width={174} priority />
    </LinkStyled>
  );
};

export default Logo;
