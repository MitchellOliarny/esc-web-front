import React from "react";
import Image from "next/image";
import StatsScore from "../Statistics/StatsScore";

interface AgentBoxProps {
  agentGames: any;
  agentAverages: any;
  agentId: string;

}

const AgentBox = ({
  agentGames,
  agentAverages,
  agentId,

}: AgentBoxProps) => {

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

  let totalCluthes = 0;
  let totalOneOnOne = 0;
  let totalOneOnTwo = 0;
  let totalOneOnThree = 0;

  let totalMultiKills = 0;
  let totalTwoKills = 0;
  let totalThreeKills = 0;
  let totalFourKills = 0;
  let totalFiveKills = 0;

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

  for (const x in agentGames) {
    const playerTeam = (agentGames[x] as UserGames).team.toLowerCase();

    isWin(agentGames[x]) ? totalWins++ : totalLosses++;

    roundsWin += agentGames[x][playerTeam];
    totalRounds += (agentGames[x] as UserGames).rounds_played;

    hsPercentage += (agentGames[x] as UserGames).stats.hs_percent;
    adrPercentage += (agentGames[x] as UserGames).stats.adr;
    kastPercentage += (agentGames[x] as UserGames).kast;

    fKillRWins += (agentGames[x] as UserGames).f_kills_deaths.fKillRWin;
    fKills += (agentGames[x] as UserGames).f_kills_deaths.fKills;

    fDeathRLosses += (agentGames[x] as UserGames).f_kills_deaths.fDeathRLoss;
    fDeaths += (agentGames[x] as UserGames).f_kills_deaths.fDeaths;

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

  const ultimate_points = "0"
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
  const total_clutches = totalCluthes
  //@ts-ignore
  const one_on_one = clutchesTotals["1v1"] ? clutchesTotals["1v1"] : 0
  //@ts-ignore
  const one_on_two = clutchesTotals["1v2"] ? clutchesTotals["1v2"] : 0
  //@ts-ignore
  const one_on_three = clutchesTotals["1v3"] ? clutchesTotals["1v3"] : 0



  return (
    <>
      <div id="main-container" className="w-full">
        <div className="h-52 relative border-b-2 border-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#11202D] to-[#20577C] opacity-50 rounded-t-lg"></div>
          <div
            className="relative h-full flex items-center justify-center"
            style={{
              backgroundImage: "url(/dashboard/background.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="w-full file:max-w-xs">
              <Image
                src={`https://media.valorant-api.com/agents/${agentId}/fullportrait.png`}
                className="xl:scale-[1.8] lg:scale-[1.5] scale-[1.25] object-cover object-top translate-y-52"
                width={1000}
                height={1000}
                alt="Top Agent"
              />
            </div>
          </div>
        </div>

        <div className="bg-[#102B3D] p-2 border-b-2 border-white">
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
              <StatsScore userGames={agentGames} valAverage={agentAverages} isAgentBox={true}/>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#102B3D] px-2 py-4 border-b-2 border-white">
        <div className="flex gap-2 items-center">
          <h2 className="text-2xl font-bold">Utility Report</h2>
          {/* <Image
            width={1000}
            height={1000}
            src="/dashboard/esc-score.png"
            className="w-auto h-8"
            alt="ESC Score Icon"
          /> */}
        </div>

        <div className="grid grid-cols-10 items-center mt-2 w-full">
          <div className="flex gap-2 col-span-3">
            <Image
              width={1000}
              height={1000}
              alt="Utility Report"
              src={`https://media.valorant-api.com/agents/${agentId}/abilities/ultimate/displayicon.png`}
              className="w-auto h-12"
            />

            <div className="mr-3 border-r-2">
              <h2 className="text-sm text-center font-bold leading-none">
                Points Utilized
              </h2>
              <p className="text-[#4DFFDD] text-center font-bold text-2xl leading-none">
                {ultimate_points}%
              </p>
            </div>
          </div>

          <div className="col-span-7">
            <h2 className="font-bold">Ability Usage / Game ({(totalRounds / totalGames).toFixed(1)} Rounds)</h2>
            <div className="mt-1 flex justify-between">
              <div className="flex items-center gap-2">
                <Image
                  width={1000}
                  height={1000}
                  alt="Ability Icon 1"
                  src={`https://media.valorant-api.com/agents/${agentId}/abilities/ability1/displayicon.png`}
                  className="w-auto h-8"
                />
                <p className="text-xl font-bold">{ability1_points}</p>
              </div>

              <div className="flex items-center gap-2">
                <Image
                  width={1000}
                  height={1000}
                  alt="Ability Icon 2"
                  src={`https://media.valorant-api.com/agents/${agentId}/abilities/ability2/displayicon.png`}
                  className="w-auto h-8"
                />
                <p className="text-xl font-bold">{ability2_points}</p>
              </div>

              <div className="flex items-center gap-2">
                <Image
                  width={1000}
                  height={1000}
                  alt="Grenade Icon"
                  src={`https://media.valorant-api.com/agents/${agentId}/abilities/grenade/displayicon.png`}
                  className="w-auto h-8"
                />
                <p className="text-xl font-bold">{grenade_points}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#102B3D] p-2 rounded-b-lg">
        <div className="flex gap-2 items-center">
          <h2 className="text-2xl font-bold">Impact Report</h2>
          {/* <Image
            width={1000}
            height={1000}
            src="/dashboard/esc-score.png"
            className="w-auto h-8"
            alt="ESC Score Icon"
          /> */}
        </div>

        <div className="flex gap-4 mt-2">
          <div>
            <p className="font-bold text-xs">FK &rarr; Round Win %</p>
            <p className="font-bold text-lg text-[#4DFFDD]">
              {fk_round_win}%
            </p>
          </div>

          <div>
            <p className="font-bold text-xs">FD &rarr; Round Loss %</p>
            <p className="font-bold text-lg text-[#FF6F4D]">
              {fd_round_loss}%
            </p>
          </div>

          <div>
            <div className="flex flex-col items-center">
              <p className="font-bold text-xs">Multikills</p>
              <p className="font-bold text-lg text-[#4DFFDD]">
                {total_multikills}
              </p>
            </div>
            <div className="flex gap-4">
              <div className="text-center">
                <p className="font-medium">2k</p>
                <p className="font-bold">{two_kills}</p>
              </div>

              <div className="text-center">
                <p className="font-medium">3k</p>
                <p className="font-bold">{three_kills}</p>
              </div>

              <div className="text-center">
                <p className="font-medium">4k</p>
                <p className="font-bold">{four_kills}</p>
              </div>

              <div className="text-center">
                <p className="font-medium">5k</p>
                <p className="font-bold">{five_kills}</p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex flex-col items-center">
              <p className="font-bold text-xs">Clutches</p>
              <p className="font-bold text-lg text-[#4DFFDD]">
                {total_clutches}
              </p>
            </div>
            <div className="flex gap-4">
              <div className="text-center">
                <p className="font-medium">1v1</p>
                <p className="font-bold">{one_on_one}</p>
              </div>

              <div className="text-center">
                <p className="font-medium">1v2</p>
                <p className="font-bold">{one_on_two}</p>
              </div>

              <div className="text-center">
                <p className="font-medium">1v3</p>
                <p className="font-bold">{one_on_three}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AgentBox;
