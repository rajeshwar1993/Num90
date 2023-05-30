import { UserModel, DEFAULT_User } from './user';
import {
  ThemeOption,
  GameTheme,
  GameMetaModel,
  GameMetaGlanceModel,
  DEFAULT_GameMetaModel
} from './game-meta';
import { GameGlance } from './game-glance';

import { BingoBoard, BingoBoardCell } from './bingo-board';

import { Ticket, TicketCell } from './ticket';

import { Player, DEFAULT_Player } from './player';

import { GamePlayModel, DEFAULT_GamePlay } from './game-play';

import { Prize, DEFAULT_Prizes } from './prize-model';

import { FunctionResponse } from './FunctionResponse';

import { Evaluation } from './Evaluation';

import { NavItem } from './NavItem';

import { ToastData } from './toast-data';

import { Image } from './Image';

export type {
  UserModel,
  GameMetaModel,
  GameMetaGlanceModel,
  GameGlance,
  BingoBoard,
  BingoBoardCell,
  Player,
  Ticket,
  TicketCell,
  GamePlayModel,
  Prize,
  FunctionResponse,
  Evaluation,
  NavItem,
  ToastData,
  GameTheme,
  Image,
  ThemeOption
};

export const DEFAULT = {
  User: DEFAULT_User,
  GameMeta: DEFAULT_GameMetaModel,
  Player: DEFAULT_Player,
  GamePlay: DEFAULT_GamePlay,
  Prizes: DEFAULT_Prizes
};
