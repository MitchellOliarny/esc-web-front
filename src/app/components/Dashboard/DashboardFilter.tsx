import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { revalidatePath } from "next/cache";
import doFilterGames from "@/app/dashboard/dashboardActions/doFilterGames";
import Dashboard from "@/app/dashboard/page";

interface MapRes {
  id: number;
  name: string;
}

interface DashboardFilterProps {
  valMaps: ValMaps[];
  valAgents: ValAgents[];
  userGames: UserGames[];
  isAdmin: boolean;
  users: [];
  onSearch: (valGames: Object) => void;
}

const DashboardFilter = ({
  valMaps,
  valAgents,
  userGames,
  isAdmin,
  users,
  onSearch,
}: DashboardFilterProps) => {
  const [selectedMap, setSelectedMap] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("");
  const [selectedMode, setSelectedMode] = useState("Competitive");
  const [selectedSeason, setSelectedSeason] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const router = useRouter();

  const roleOptions = [
    { value: "", text: "All Roles" },
    { value: "Duelist", text: "Duelist" },
    { value: "Controller", text: "Controller" },
    { value: "Initiator", text: "Initiator" },
    { value: "Sentinel", text: "Sentinel" },
  ];

  const modeOptions = [
    { value: "Competitive", text: "Competitive" },
    { value: "Unrated", text: "Unrated" },
    { value: "Swiftplay", text: "Swiftplay" },
    // { value: "Team Deathmatch", text: "TDM" },
  ];

  let actOptions = [
    { value: "", text: "All Acts" },
  ];

  if(userGames) {
  //@ts-ignore
  let lastAct = null;
  userGames.map((value) => {
    //@ts-ignore
    const newOption = { value: value.season, text: 'Ep ' + value.season.split('_')[0] + ' - Act ' + value.season.split('_')[1] }
    //@ts-ignore
    if (lastAct != value.season) {
      actOptions.push(newOption)
      //@ts-ignore
      lastAct = value.season
    }
  })
}

  const sizeOptions = [
    { value: "", text: "Size" },
    { value: 10, text: "10" },
    { value: 20, text: "20" },
    { value: 50, text: "50" },
  ];



  const handleSearch = async (filterGames: any) => {
    const queryParams = new URLSearchParams();

    if (selectedMap) queryParams.append("map", selectedMap);
    if (selectedRole) queryParams.append("role", selectedRole);
    if (selectedAgent) queryParams.append("agent", selectedAgent);
    if (selectedSeason) queryParams.append("season", selectedSeason);
    if (selectedSize) queryParams.append("size", selectedSize);
    if (selectedUser) queryParams.append("studentPUUID", selectedUser);

    // return router.push(`/dashboard?${queryParams}`);
    // Dashboard(`${queryParams}`);
    const newGames = await doFilterGames(`${queryParams}`, selectedMode);
    onSearch(newGames);
  };


  const hideList = (input: string) => {
    if (input.length > 3) {
      document.getElementById('find-user')?.setAttribute('list', "users")
    } else {
      document.getElementById('find-user')?.removeAttribute('list')
    }
  }

  return (
    <>
      <div className="bg-none py-2 rounded-lg">
        <div className={`dashfilter grid ${'grid-cols-' + (isAdmin ? '8' : '7')} gap-4 font-bold text-frost`}>

          {isAdmin ? (
            <input
              className="select select-bordered w-full max-w-xs"
              value={selectedUser}
              onChange={(e) => { setSelectedUser(e.target.value) }}
              onInput={(e) => {
                //@ts-ingore
                hideList((e.target as HTMLInputElement).value)
              }
              }
              list={'temp'}
              id={'find-user'}
              placeholder="Type to Search"
            >
            </input>

          ) : (
            ""
          )}
          {isAdmin ? (

            <datalist id="users">
              <option value="">Me</option>
              {users.map((user: any, index: number) => {
                if (user.puuid) {
                  return (
                    <option key={user.puuid + index} data-value={user.puuid}>
                      {user.username + '#' + user.tag}
                    </option>
                  )
                }
              })}
            </datalist>
          ) : (
            ""
          )}

          <select
            className="select select-bordered w-full max-w-xs"
            value={selectedMap}
            onChange={(e) => setSelectedMap(e.target.value)}
          >
            <option value="">All Maps</option>
            {valMaps.map((map) => {
              //@ts-ignore
              if (map.name != "The Range" && map.name != "Basic Training") {
                if (map.sites.length > 1 && (selectedMode != 'Team Deathmatch' || '')) {
                  return (
                    <option key={map.id} value={map.name}>
                      {map.name}
                    </option>
                  )
                }
                //@ts-ignore
                else if (map.sites[0] == "null" && (selectedMode == 'Team Deathmatch' || '')) {
                  return (
                    <option key={map.id} value={map.name}>
                      {map.name}
                    </option>
                  )
                }
              }
            })}
          </select>

          <select
            className="select select-bordered w-full max-w-xs"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            {roleOptions.map((role) => (
              <option key={role.value} value={role.value}>
                {role.text}
              </option>
            ))}
          </select>

          <select
            className="select select-bordered w-full max-w-xs"
            value={selectedAgent}
            onChange={(e) => setSelectedAgent(e.target.value)}
          >
            <option value="">All Agents</option>
            {valAgents.map((agent) => (
              <option key={agent.id} value={agent.name}>
                {agent.name}
              </option>
            ))}
          </select>

          <select
            className="select select-bordered w-full max-w-xs"
            value={selectedMode}
            onChange={(e) => setSelectedMode(e.target.value)}
          >
            {modeOptions.map((mode) => (
              <option key={mode.value} value={mode.value}>
                {mode.text}
              </option>
            ))}
          </select>

          <select
            className="select select-bordered w-full max-w-xs"
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(e.target.value)}
          >
            {actOptions.map((act) => (
              <option key={act.value} value={act.value}>
                {act.text}
              </option>
            ))}
          </select>

          <select
            className="select select-bordered w-full max-w-xs"
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            {sizeOptions.map((size) => (
              <option key={size.value} value={size.value}>
                {size.text}
              </option>
            ))}
          </select>

          <Button
            className="w-full h-full rounded-lg bg-[#f5603c]"
            color="primary"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
      </div>
    </>
  );
};

export default DashboardFilter;
