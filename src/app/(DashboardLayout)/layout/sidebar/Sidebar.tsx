import { useMediaQuery, Box, Drawer } from "@mui/material";
import Logo from "../shared/logo/Logo";
import SidebarItems from "./SidebarItems";

interface ItemType {
  isMobileSidebarOpen: boolean;
  onSidebarClose: (event: React.MouseEvent<HTMLElement>) => void;
  isSidebarOpen: boolean;
}

const Sidebar = ({
  isMobileSidebarOpen,
  onSidebarClose,
  isSidebarOpen,
}: ItemType) => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));

  const sidebarWidth = "312px";

  const sidebarBg = `linear-gradient(rgba(255, 255, 255), rgba(111, 183, 255, 0.1)),
                    url('/images/backgrounds/IMG_20220407_145639625_HDR.jpg')`;

  const sidebarStyles = {
    background: sidebarBg,
    backgroundSize: 'cover', // Ajusta el tamaño de la imagen
    backgroundPosition: 'center', // Centra la imagen en el contenedor
    backgroundRepeat: 'no-repeat', // Evita que la imagen se repita
    borderTopRightRadius: "20px", // Ajuste general para bordes redondeados
   
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.9)", // Agrega una sombra sutil
  };

  if (lgUp) {
    return (
      <Box
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
        }}
      >
        {/* Sidebar for desktop */}
        <Drawer
          anchor="left"
          open={isSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: {
              width: "320.5px",
              boxSizing: "border-box",
              ...sidebarStyles,
            },
          }}
        >
          <Box
            sx={{
              height: "100%",
            }}
          >
            {/* Logo */}
            <Box px={0.0} py={1}>
              <Logo />
            </Box>
            {/* Sidebar Items */}
            <Box>
              <SidebarItems />
            </Box>
          </Box>
        </Drawer>
      </Box>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      variant="temporary"
      PaperProps={{
        sx: {
          width: sidebarWidth,
          ...sidebarStyles,
        },
      }}
    >
      {/* Logo */}
      <Box px={0.0} py={0.0}>
        <Logo />
      </Box>
      {/* Sidebar For Mobile */}
      <SidebarItems />
    </Drawer>
  );
};

export default Sidebar;
