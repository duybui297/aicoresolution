import { Client } from '../types';
import AnabasLogo from '../assets/Banner_Anabas_Restaurant.png';
import TiemHoaLogo from '../assets/1989.png';
import LuxLogo from '../assets/lux.jpg';
import TanNhatSuongLogo from '../assets/tan nhat suong.jpg';
import ChauLogo from '../assets/chau kitchen & bar.jpg';
import ICCLogo from '../assets/Du hoc ICC.png';
import HankangLogo from '../assets/Du học Hangkang.jpg';
import SuperfitLogo from '../assets/Superfit.jpg';

export const notableClients: Client[] = [
  {
    id: 1,
    name: 'clients.names.anabas',
    logo: AnabasLogo,
    industry: 'clients.list.anabas'
  },
  {
    id: 2,
    name: 'clients.names.tiemhoa',
    logo: TiemHoaLogo,
    industry: 'clients.list.tiemhoa'
  },
  {
    id: 3,
    name: 'clients.names.lux',
    logo: LuxLogo,
    industry: 'clients.list.lux'
  },
  {
    id: 4,
    name: 'clients.names.tanNhatSuong',
    logo: TanNhatSuongLogo,
    industry: 'clients.list.tanNhatSuong'
  },
  {
    id: 5,
    name: 'clients.names.chau',
    logo: ChauLogo,
    industry: 'clients.list.chau'
  },
  {
    id: 6,
    name: 'clients.names.icc',
    logo: ICCLogo,
    industry: 'clients.list.icc'
  },
  {
    id: 7,
    name: 'clients.names.hankang',
    logo: HankangLogo,
    industry: 'clients.list.hankang'
  },
  {
    id: 8,
    name: 'clients.names.superfit',
    logo: SuperfitLogo,
    industry: 'clients.list.superfit'
  }
];
