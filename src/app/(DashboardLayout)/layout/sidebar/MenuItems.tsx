import {
  IconHome,
  IconInfoCircle,
  IconCloud,
  IconBuildingStore,
  IconTools,
  IconShieldCheck,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Inicio",
  },
  {
    id: uniqueId(),
    title: "Home",
    icon: IconHome,
    href: "/municipalidad",
  },
  {
    id: uniqueId(),
    title: "Clima",
    icon: IconCloud,
    href: "/clima",
  },
  {
    id: uniqueId(),
    title: "Establecimientos",
    icon: IconBuildingStore,
    href: "/establecimientos",
  },
  {
    id: uniqueId(),
    title: "Servicios básicos",
    icon: IconTools, 
    href: "/servicios-basicos",
  },
  {
    id: uniqueId(),
    title: "Servicios seguridad",
    icon: IconShieldCheck, 
    href: "/servicios-seguridad",
  },
];

export default Menuitems;
