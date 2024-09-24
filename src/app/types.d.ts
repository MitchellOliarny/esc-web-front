interface SessionInfo {
  valorant_banner: string;
  pfp: string;
  tag: string;
  user: string;
  email: string;
  puuid: string;
  region: string;
  isAdmin: number;
  user_id: number;
  zipcode: string;
  val_rank: number;
  isStudent: number;
}
type Team = {
  id?: number;
  name: string;
  logo: string;
  wins: number;
  losses: number;
  rounds_for: number;
  rounds_against: number;
  league: string;
};
type ScheduleList = {
  date: string;
  time: string;
  home_team: string;
  away_team: string;
  location: string;
  league: string;
};
type UserInfo = {
  rec_preferred_role?: string;
  display_agent: string;
  profile_picture: string;
  id: number;
  riot_name: string;
  riot_tag: string;
  first_name: string;
  last_name: string;
  email: string;
  zipcode: string;
  player_rank: number;
  discord_id: string;
  discord_username: string;
  discord_avatar: string;
};
type UserInvites = {
  id: string;
  logo: string;
  name: string;
  league: string;
  season: string;
  location: string;
  riot_name: string;
  riot_tag: string;
};
type Teams = {
  isActive: number;
  isOpen: number;
  total_owed: number;
  id: number;
  logo: string;
  name: string;
  league: string;
  season: number;
  start_date: string;
  end_date: string;
  captain_esc_id: number;
  location: string;
  roster: UserTeamsRoster;
  payments: UserTeamsPayments;
};
type AvatarState = {
  preview: string;
  data: File | string;
};
type ValMaps = {
  key: string;
  name: string;
  id: string;
  sites: ['A', 'B', 'C'],
  minimap: string;
  listViewBackground: string;
  splashBackground: string;
  premierBackground: string;
}
type ValAgents = {
  name: string;
  id: string;
  role: string;
}
type UserGames = {
  mmr_change: {
    mmr_change: number;
    new_mmr: number;
    rank: number;
  }
  index: number;
  rounds_played: number;
  blue: number;
  red: number;
  map: string;
  match_id: string;
  id: number;
  account_id: null,
  puuid: string;
  agent: string;
  team: string;
  date: string;
  role: string;
  kast: number;
  match_rank: number;
  agent_id: string;
  party_id: string;
  round_economy: { credit_score: number };
  f_kills_deaths: {
    fDeathRLoss: number;
    fDeaths: number;
    fDeathtoKill: number;
    fKillRWin: number;
    fKills: number;
    fKilltoDeath: number
  },
  important_rounds: {
    important_round_score: number;
  },
  multikills: [Object],
  stats: {
    esc_score: number;
    adr: number;
    kills: number;
    spent: number;
    deaths: number;
    plants: number;
    traded: number;
    trades: number;
    assists: number;
    defuses: number;
    dmgdelta: number;
    playtime: number;
    hs_percent: number;
    lb_position: number;
    combat_score: number;
    damage_dealt: number;
    ability_casts: { grenade: number; ability1: number; ability2: number; ultimate: number; },
    loadout_value: number;
    damage_received: number;
  },
  duels: [Object],
  clutches: {
    lost: [Object];
    won: [Object];
    clutch_score: number;
  },
  behavior: [Object],
  valorant_banner: string,
  riot_name: string,
  riot_tag: string,
}
type ValAverage = [Object];
type Agents = { agent: string; games: number };