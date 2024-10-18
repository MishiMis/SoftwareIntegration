import { IoMdMenu } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";
import { TbReport } from "react-icons/tb";
import { IoIosSettings } from "react-icons/io";
import { IoIosPerson } from "react-icons/io";
import { Link } from "react-router-dom";

export const items = [
  {
    key: '1',
    icon: <IoMdMenu />,
    label: 'HOME',
  },
  {
    key: '2',
    icon: <MdDashboard />,
    label: <div><Link to="/dashboard">Dashboard</Link></div>,
  },
  {
    key: '3',
    icon: <FaTasks />,
    label: 'Actividade',
  },
  {
    key: '4',
    label: 'Equipo',
    icon: <RiTeamFill />,
  },
  {
    key: '5',
    label: 'Reportes',
    icon: <TbReport />,
  },
  {
    key: '6',
    label: 'Configuraciones',
    icon: <IoIosSettings />,
  },
  // Empty object to add space
  {
    key: 'spacer',
    type: 'divider',
  },
  {
    key: '7',
    label: 'Navigation Two',
    icon: <IoIosPerson className="text-[#41A8F4] text-[2rem]" />,
  },
];
