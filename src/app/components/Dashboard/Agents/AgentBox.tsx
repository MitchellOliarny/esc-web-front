import React from "react";
import Image from "next/image";
import StatsScore from "../Statistics/StatsScore";

interface AgentBoxProps {
  agentGames: any;
  agentAverages: any;
  agentId: string;
  maps: any;
  agentInfo: any;
}

const AgentBox = ({
  agentGames,
  agentAverages,
  agentId,
  maps,
  agentInfo
}: AgentBoxProps) => {

  console.log(agentInfo)

  const isWin = (game: UserGames) => {
    const playerTeam = game.team.toLowerCase();
    const otherTeam = playerTeam === "blue" ? "red" : "blue";
    // @ts-ignore
    if (game[playerTeam] - game[otherTeam] > 0) {
      return true;
    } else {
      return false;
    }
  };

  const totalGames = agentGames.length;
  let totalWins = 0;
  let totalLosses = 0;
  let roundsWin = 0;
  let totalRounds = 0;

  let hsPercentage = 0;
  let kastPercentage = 0;
  let adrPercentage = 0;

  let ultimates = 0;
  let ability1 = 0;
  let ability2 = 0;
  let grenade = 0;

  let plants = 0;
  let defuses = 0;
  let kills = 0;
  let deaths = 0;

  let totalCluthes = 0;
  let totalOneOnOne = 0;
  let totalOneOnTwo = 0;
  let totalOneOnThree = 0;

  let totalMultiKills = 0;
  let totalTwoKills = 0;
  let totalThreeKills = 0;
  let totalFourKills = 0;
  let totalFiveKills = 0;
  let totalSixKills = 0;

  let fKillRWins = 0;
  let fKills = 0;
  let fDeathRLosses = 0;
  let fDeaths = 0;

  // REMOVE THE NUMBER OF GAMES IN THE FUTURE
  let totalImportantRounds = 0;
  let gamesWithImportantRounds = 0;
  let totalEscScore = 0;
  let gamesWithEscScore = 0;

  let clutchesTotals = {};

  //console.log(maps)
  let mapStats = {}

  for (const x in agentGames) {
    const playerTeam = (agentGames[x] as UserGames).team.toLowerCase();

    isWin(agentGames[x]) ? totalWins++ : totalLosses++;

    roundsWin += agentGames[x][playerTeam];
    totalRounds += (agentGames[x] as UserGames).rounds_played;

    hsPercentage += (agentGames[x] as UserGames).stats.hs_percent;
    adrPercentage += (agentGames[x] as UserGames).stats.adr;
    kastPercentage += (agentGames[x] as UserGames).kast;

    plants += (agentGames[x] as UserGames).stats.plants;
    defuses += (agentGames[x] as UserGames).stats.defuses;
    kills += (agentGames[x] as UserGames).stats.kills;
    deaths += (agentGames[x] as UserGames).stats.deaths

    fKillRWins += (agentGames[x] as UserGames).f_kills_deaths.fKillRWin;
    fKills += (agentGames[x] as UserGames).f_kills_deaths.fKills;

    fDeathRLosses += (agentGames[x] as UserGames).f_kills_deaths.fDeathRLoss;
    fDeaths += (agentGames[x] as UserGames).f_kills_deaths.fDeaths;

    //@ts-ignore
    if (!mapStats[agentGames[x].map]) {
      //@ts-ignore
      mapStats[agentGames[x].map] = { map: agentGames[x].map, id: maps[agentGames[x].map].id, matchWins: 0, matchLosses: 0, gamesPlayed: 0, kast: 0 }
    }

    //@ts-ignore
    isWin(agentGames[x]) ? mapStats[agentGames[x].map].matchWins++ : mapStats[agentGames[x].map].matchLosses++;

    //@ts-ignore
    mapStats[agentGames[x].map].gamesPlayed++;

    //@ts-ignore
    mapStats[agentGames[x].map].kast += (agentGames[x] as UserGames).kast;

    //@ts-ignore
    totalMultiKills += Number(agentGames[x].multikills["2k"]) + Number(agentGames[x].multikills["3k"]) + Number(agentGames[x].multikills["4k"]) + Number(agentGames[x].multikills["5k"]);
    //@ts-ignore
    totalTwoKills += Number(agentGames[x].multikills["2k"]);
    //@ts-ignore
    totalThreeKills += Number(agentGames[x].multikills["3k"]);
    //@ts-ignore
    totalFourKills += Number(agentGames[x].multikills["4k"]);
    //@ts-ignore
    totalFiveKills += Number(agentGames[x].multikills["5k"]);
     //@ts-ignore
     totalSixKills += Number(agentGames[x].multikills["6k"]);

    if ((agentGames[x] as UserGames).clutches.won) {
      const clutches = (agentGames[x] as UserGames).clutches.won;
      for (const y in clutches) {
        totalCluthes += Number(clutches[y]);

        // @ts-ignore
        if (clutchesTotals[y]) {
          // @ts-ignore
          clutchesTotals[y] += Number(clutches[y]);
        } else {
          // @ts-ignore
          clutchesTotals[y] = Number(clutches[y]);
        }
      }
    }

    if (
      (agentGames[x] as UserGames).important_rounds &&
      (agentGames[x] as UserGames).important_rounds.important_round_score
    ) {
      totalImportantRounds += (agentGames[x] as UserGames).important_rounds
        .important_round_score;
      gamesWithImportantRounds++;
    }

    if ((agentGames[x] as UserGames).stats.esc_score) {
      totalEscScore += (agentGames[x] as UserGames).stats.esc_score;
      gamesWithEscScore++;
    }

    if ((agentGames[x] as UserGames).stats.ability_casts.ultimate) {
      ultimates = +(agentGames[x] as UserGames).stats.ability_casts.ultimate;
    }

    if ((agentGames[x] as UserGames).stats.ability_casts.ability1) {
      ability1 += (agentGames[x] as UserGames).stats.ability_casts.ability1;
    }

    if ((agentGames[x] as UserGames).stats.ability_casts.ability2) {
      ability2 += (agentGames[x] as UserGames).stats.ability_casts.ability2;
    }

    if ((agentGames[x] as UserGames).stats.ability_casts.grenade) {
      grenade += (agentGames[x] as UserGames).stats.ability_casts.grenade;
    }
  }

  let sortedMapsByWinPercent = [];
  for (const x in mapStats) {
    //@ts-ignore
    sortedMapsByWinPercent.push(mapStats[x])
  }

  sortedMapsByWinPercent.sort((a, b) => (b.matchWins / b.gamesPlayed) - (a.matchWins / a.gamesPlayed));

  const mapId = sortedMapsByWinPercent[0].id;
  const bestMap = sortedMapsByWinPercent[0].map;



  const ultimate_points = "~"+Math.round(((ultimates * agentInfo.ult_points)/(kills + deaths + plants + defuses))*100);
  const hs_percent = (hsPercentage/ agentGames?.length).toFixed(2);
  const ability1_points = (ability1 / agentGames?.length).toFixed(2)
  const ability2_points = (ability2 / agentGames?.length).toFixed(2)
  const grenade_points = (grenade / agentGames?.length).toFixed(2)
  const fk_round_win = ((fKillRWins / fKills) * 100).toFixed(2)
  const fd_round_loss = ((fDeathRLosses / fDeaths) * 100).toFixed(2)
  const total_multikills = totalMultiKills
  const two_kills = totalTwoKills
  const three_kills = totalThreeKills
  const four_kills = totalFourKills
  const five_kills = totalFiveKills
  const six_kills = totalSixKills
  const total_clutches = totalCluthes
  //@ts-ignore
  const one_on_one = clutchesTotals["1v1"] ? clutchesTotals["1v1"] : 0
  //@ts-ignore
  const one_on_two = clutchesTotals["1v2"] ? clutchesTotals["1v2"] : 0
  //@ts-ignore
  const one_on_three = clutchesTotals["1v3"] ? clutchesTotals["1v3"] : 0
  //@ts-ignore
  const one_on_four = clutchesTotals["1v4"] ? clutchesTotals["1v4"] : 0
  //@ts-ignore
  const one_on_five = clutchesTotals["1v5"] ? clutchesTotals["1v5"] : 0

  return (
    <>
      <div id="main-container" className="w-full game-row-border rounded-t-lg">
        <div className="h-72 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#11202D] to-[#20577C] opacity-50 rounded-t-lg"></div>
          <div
            className="relative h-full items-center justify-center block rounded-t-lg"
            style={{
              backgroundImage: `url(https://media.valorant-api.com/maps/${mapId}/splash.png)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="best-map-box m-4 px-2 absolute h-8 text-nowrap">
              <span className="text-ash font-bold text-sm">Best Map:
                <span className="text-frost font-bold text-sm"> {bestMap}</span>
              </span>
            </div>
            <div className="w-full h-full file:max-w-xs z-1 map-gradient rounded-lg">
              <Image
                src={`https://media.valorant-api.com/agents/${agentId}/fullportrait.png`}
                className="xl:scale-[1.15] lg:scale-[1.15] scale-[1.1] object-cover object-top absolute translate-x-[20%] translate-y-[-7.5%]"
                width={1000}
                height={1000}
                alt="Top Agent"
              />
              <div className="gradient-agent-overlay w-full h-full">

              </div>
            </div>
            <h1 className="absolute bottom-3 left-4 font-black text-4xl z-20">{agentGames[0].agent}</h1>
          </div>
        </div>

        <div className="back-graphite p-2  z-10 relative">
          {/* <div className="flex items-center gap-2 justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-medium">Gameplay Score</h1>
              <Image
                width={1000}
                height={1000}
                src="/dashboard/esc-score.png"
                className="w-auto h-8"
                alt="ESC Score Icon"
              />
            </div>
          </div> */}

          <div>
            <div>
              <StatsScore userGames={agentGames} valAverage={agentAverages} isAgentBox={true} />
            </div>
          </div>
        </div>
      </div>

      <div className="back-darkslate game-row-border-special2 rounded-b-lg h-auto z-10 relative">
        <div className="px-2 py-4">

          <div className="grid grid-cols-10 items-center m-2 w-full">
            <div className="inline col-span-3 h-16">
              <h2 className="font-bold text-ash text-sm mb-2">
                Points Utilized
              </h2>
              <div className="inline-flex">
                <Image
                  width={1000}
                  height={1000}
                  alt="Utility Report"
                  src={`https://media.valorant-api.com/agents/${agentId}/abilities/ultimate/displayicon.png`}
                  className="w-auto h-12 m-auto"
                />

                <p className="text-frost text-center justify-self-start font-bold text-3xl leading-none my-auto ml-4">
                  {ultimate_points}%
                </p>

              </div>
            </div>

            <div className="inline col-span-7 px-2 mr-2 h-16">
              <h2 className="font-bold text-ash text-sm mb-2">Ability Usage / Game ({(totalRounds / totalGames).toFixed(1)} Rounds)</h2>
              <div className="flex justify-between h-12">
                <div className="flex items-center gap-2">
                  <Image
                    width={1000}
                    height={1000}
                    alt="Ability Icon 1"
                    src={`https://media.valorant-api.com/agents/${agentId}/abilities/ability1/displayicon.png`}
                    className="w-auto h-8 text-ash brightness-[.55]"
                  />
                  <p className="text-xl font-bold">{ability1_points}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Image
                    width={1000}
                    height={1000}
                    alt="Ability Icon 2"
                    src={`https://media.valorant-api.com/agents/${agentId}/abilities/ability2/displayicon.png`}
                    className="w-auto h-8 text-ash brightness-[.55]"
                  />
                  <p className="text-xl font-bold">{ability2_points}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Image
                    width={1000}
                    height={1000}
                    alt="Grenade Icon"
                    src={`https://media.valorant-api.com/agents/${agentId}/abilities/grenade/displayicon.png`}
                    className="w-auto h-8 text-ash brightness-[.55]"
                  />
                  <p className="text-xl font-bold">{grenade_points}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 rounded-b-lg w-full justify-between">
          <div className="flex gap-4 mt-2">
            <div>
              <p className="font-bold text-sm text-ash">FK &rarr; Round Win %</p>
              <p className="font-bold text-xl text-frost]">
                {fk_round_win}%
              </p>
            </div>

            <div>
              <p className="font-bold text-sm text-ash">FD &rarr; Round Loss %</p>
              <p className="font-bold text-xl text-frost">
                {fd_round_loss}%
              </p>
            </div>

            <div>  
              <p className="font-bold text-sm text-ash">HS%</p>
              <p className="font-bold text-xl  text-frost">
                {hs_percent}%
              </p>
            </div>
        </div>
        <div className="grid py-6 grid-cols-2">
            <div>
              <div className="flex flex-col">
                <p className="font-bold text-sm text-ash">Multi-Kills</p>
                <p className="font-bold text-4xl text-frost">
                  {total_multikills}
                </p>
              </div>
              <div className="flex gap-4 mt-2">
                <div className="text-center">
                  <p className="font-medium text-ash">2k</p>
                  <p className="font-bold">{two_kills}</p>
                </div>

                <div className="text-center">
                  <p className="font-medium text-ash">3k</p>
                  <p className="font-bold">{three_kills}</p>
                </div>

                <div className="text-center">
                  <p className="font-medium text-ash">4k</p>
                  <p className="font-bold">{four_kills}</p>
                </div>

                <div className="text-center">
                  <p className="font-medium text-ash">5k</p>
                  <p className="font-bold">{five_kills}</p>
                </div>

                <div className="text-center">
                  <p className="font-medium text-ash">6k</p>
                  <p className="font-bold">{six_kills}</p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex flex-col">
                <p className="font-bold text-sm text-ash">Clutches</p>
                <p className="font-bold text-4xl text-frost">
                  {total_clutches}
                </p>
              </div>
              <div className="flex gap-4 mt-2">
                <div className="text-center">
                  <p className="font-medium text-ash">1v1</p>
                  <p className="font-bold">{one_on_one}</p>
                </div>

                <div className="text-center">
                  <p className="font-medium text-ash">1v2</p>
                  <p className="font-bold">{one_on_two}</p>
                </div>

                <div className="text-center">
                  <p className="font-medium text-ash">1v3</p>
                  <p className="font-bold">{one_on_three}</p>
                </div>

                <div className="text-center">
                  <p className="font-medium text-ash">1v4</p>
                  <p className="font-bold">{one_on_four}</p>
                </div>

                <div className="text-center">
                  <p className="font-medium text-ash">1v5</p>
                  <p className="font-bold">{one_on_five}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AgentBox;
