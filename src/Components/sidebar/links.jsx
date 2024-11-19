import { IoMdMenu } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";
import { TbReport } from "react-icons/tb";
import { IoIosSettings } from "react-icons/io";
import { IoIosPerson } from "react-icons/io";
import { Link } from "react-router-dom";
// import type { SVGProps } from 'react';
// import { LogoIso } from "../../img/logoSI.png";

export const items = [
  // {
  //   key: '1',
  //   icon: <Icon icon="icon-park:home" /> ,
  //   // icon: <IoMdMenu />,
  //   // label: <Link to="/">HOME</Link>,
  // },
  {
    key: '2',
    icon: <MdDashboard />,
    label: <Link to="/dashboard">Dashboard</Link>,
  },
  {
    key: '3',
    icon: <FaTasks />,
    label: <Link to="/actividades">Actividad</Link>,
  },
  {
    key: '4',
    icon: <RiTeamFill />,
    label: <Link to="/equipo">Equipo</Link>,
  },
  {
    key: '5',
    icon: <TbReport />,
    label: <Link to="/reportes">Reportes</Link>,
  },
  {
    key: '6',
    icon: <IoIosSettings />,
    label: <Link to="/configuraciones">Configuraciones</Link>,
  },
  {
    key: '7',
    label: <Link to="/">Salir</Link>,
    icon: <IoIosPerson className="text-[#41A8F4] text-[2rem]" />,
  },
];
