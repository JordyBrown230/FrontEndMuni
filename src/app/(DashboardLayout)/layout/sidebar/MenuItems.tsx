import {
  IconBus,
  IconForms,
  IconHome,
  IconMap,
  IconUserEdit,
  IconVideo,
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
    title: "Atracciones Turísticas",
    icon: IconMap,
    href: "/m-atraccionesTuristicas",
  },
  {
    id: uniqueId(),
    title: "Transportes",
    icon: IconBus,
    href: "/m-transportes",
  },
  {
    id: uniqueId(),
    title: "Multimedia",
    icon: IconVideo,
    href: "/m-materiaMulti",
  },
  {
    id: uniqueId(),
    title: "Información Legal",
    icon: IconForms,
    href: "/m-InfoLegalRegulatoria",
  },
  {
    id: uniqueId(),
    title: "Accesibilidad",
    icon: IconUserEdit,
    href: "/m-EducacionTuristica",
  },
  {
    id: uniqueId(),
    title: "Educación Turística",
    icon: IconUserEdit,
    href: "/m-EducacionTuristica",
  }
];

export default Menuitems;
