import {
  IconBus,
  IconForms,
  IconHome,
  IconMap,
  IconUserEdit,
  IconVideo,
  IconInfoCircle,
  IconCloud,
  IconBuildingStore,
  IconTools,
  IconShieldCheck,
  IconAlertOctagon,
  IconBone,
  IconPlane,
  IconCalendarEvent,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Inicio",
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
    title: "Educación Turística",
    icon: IconUserEdit,
    href: "/m-EducacionTuristica",
  },
  {
    id: uniqueId(),
    title: "Zonas de Riesgo",
    icon: IconAlertOctagon,
    href: "/m-zonasriesgo",
  },
  {
    id: uniqueId(),
    title: "Sitios Arqueológicos",
    icon: IconBone,
    href: "/m-sitiosarqueologicos",
  },
  {
    id: uniqueId(),
    title: "Destino Turístico",
    icon: IconPlane,
    href: "/m-guiaViaje",
  },
  {
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
  {
    id: uniqueId(),
    title: "Eventos Tours",
    icon: IconCalendarEvent, 
    href: "/eventos-tours",
  },
];

export default Menuitems;
