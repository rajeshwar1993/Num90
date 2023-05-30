import { Image } from './Image';
import { DEFAULT_Prizes, Prize } from './prize-model';

export interface ThemeOption {
  name: string;
  value: string;
  c_primary: string;
  c_accent: string;
  c_text: string;
}
export interface GameTheme {
  pack: ThemeOption;
  logo: Image | null;
  bgImage: Image | null;
}

export interface GameMetaModel {
  uid: string;
  title: string;
  tagline: string;
  //   type:'pub'|'restaurant'; - basically need to understand where are they playing
  // place: city/state/country
  gameId: string;
  theme: GameTheme;
  isPremium: boolean;
  createdBy: string;
  maxPlayers: number;
  accessTo: Array<string>;
  prizes: Array<Prize>;
  activeGames: string[];
  //   history:Array<History>;
  deletion: boolean;
  deletionTS: string;
  createdTS: string;
}

export interface GameMetaGlanceModel {
  uid: string;
  title: string;
  tagline: string;
  theme: GameTheme;
  gameId: string;
}

export const DEFAULT_GameMetaModel: GameMetaModel = {
  uid: 'DEFAULT_GAMEMETA',
  title: '',
  tagline: '',
  theme: {
    pack: {
      name: 'B&W',
      value: 'B&W',
      c_primary: '#e2e8f0',
      c_accent: '#6d28d9',
      c_text: '#0f172a'
    },
    logo: null,
    bgImage: null
  },
  gameId: '',
  isPremium: false,
  createdBy: '',
  maxPlayers: 15,
  accessTo: [],
  prizes: [...DEFAULT_Prizes],
  activeGames: [],
  deletion: false,
  deletionTS: '',
  createdTS: ''
};
