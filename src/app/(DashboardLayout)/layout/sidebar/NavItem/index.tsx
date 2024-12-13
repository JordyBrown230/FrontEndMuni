import React from "react";
// mui imports
import {
  ListItemIcon,
  ListItem,
  List,
  styled,
  ListItemText,
  useTheme,
  ListItemButton,
} from "@mui/material";
import Link from "next/link";

type NavGroup = {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: any;
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
};

interface ItemType {
  item: NavGroup;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  hideMenu?: any;
  level?: number | any;
  pathDirect: string;
}

const NavItem = ({ item, level, pathDirect, onClick }: ItemType) => {
  const Icon = item.icon;
  const theme = useTheme();
  const itemIcon = <Icon stroke={1.5} size="1.3rem" />;

  const ListItemStyled = styled(ListItem)(() => ({
    padding: 0,
    ".MuiButtonBase-root": {
      whiteSpace: "nowrap",
      marginBottom: "2px",
      padding: "12px 16px",
      borderRadius: "12px",
      backgroundColor: level > 1 ? "transparent !important" : "inherit",
      color: theme.palette.text.primary,
      transition: "all 0.5s ease", // Transición más suave y prolongada
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)", // Sombra inicial
      background: "linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,255,255,0.7))", // Gradiente de fondo
      position: "relative",
      overflow: "hidden",
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.background.default,
        transform: "scale(1.1) rotate(2deg)", // Escala y rotación
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)", // Sombra más pronunciada en hover
        "&::before": {
          content: '""',
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "300%",
          height: "300%",
          background: "rgba(23,139,255)",
          borderRadius: "50%",
          transform: "translate(-50%, -50%) scale(0.5)",
          transition: "transform 0.6s ease-in-out",
          zIndex: 0,
        },
        "&:hover::before": {
          transform: "translate(-50%, -50%) scale(1)",
        },
      },
      "&.Mui-selected": {
        color: theme.palette.background.default,
        backgroundColor: theme.palette.primary.main,
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)", // Sombra más pronunciada en seleccionado
        "&::before": {
          content: '""',
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "300%",
          height: "300%",
          background: "rgba(94,175,255)",
          borderRadius: "50%",
          transform: "translate(-50%, -50%) scale(0.5)",
          transition: "transform 0.6s ease-in-out",
          zIndex: 0,
        },
        "&:hover::before": {
          transform: "translate(-50%, -50%) scale(1)",
        },
      },
    },
    ".MuiListItemIcon-root": {
      zIndex: 1, // Asegura que el ícono esté sobre el fondo
    },
    ".MuiListItemText-root": {
      zIndex: 1, // Asegura que el texto esté sobre el fondo
    },
  }));

  return (
    <List component="div" disablePadding key={item.id}>
      <ListItemStyled>
        <ListItemButton
          component={Link}
          href={item.href}
          disabled={item.disabled}
          selected={pathDirect === item.href}
          target={item.external ? "_blank" : ""}
          onClick={onClick}
        >
          <ListItemIcon
            sx={{
              minWidth: "36px",
              p: "3px 0",
              color: "inherit",
            }}
          >
            {itemIcon}
          </ListItemIcon>
          <ListItemText>
            <>{item.title}</>
          </ListItemText>
        </ListItemButton>
      </ListItemStyled>
    </List>
  );
};

export default NavItem;
