import {
  IconHome,
  IconInfoCircle,
  IconCloud,
  IconBuildingStore,
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
];

export default Menuitems;
