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
    href: "/crud-atraccionesTuristicas",
  },
  {
    id: uniqueId(),
    title: "Transportes",
    icon: IconBus,
    href: "/crud-transportes",
  },
  {
    id: uniqueId(),
    title: "Multimedia",
    icon: IconVideo,
    href: "/crud-materiaMulti",
  },
  {
    id: uniqueId(),
    title: "Información Legal",
    icon: IconForms,
    href: "/crud-InfoLegalRegulatoria",
  },
  {
    id: uniqueId(),
    title: "Educación Turística",
    icon: IconUserEdit,
    href: "/crud-EducacionTuristica",
  }
];

export default Menuitems;
