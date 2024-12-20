import React from "react";
import AgentBox from "./AgentBox";

interface AgentUIProps {
  agentGames: any;
  topAgents: any;
  valAverage: any;
  valAgents: any;
  maps: any;
}

const AgentsUI = ({agentGames, topAgents, valAverage, maps, valAgents}: AgentUIProps) => {

  //console.log(maps)
  console.log(agentGames);
  let maps_array: { [key: string]: any } = {};
  for (const x in maps) {
    maps_array[maps[x].name] = maps[x];
  }
  let agent_array: { [key: string]: any } = {};
  for (const x in valAgents) {
    agent_array[valAgents[x].name] = valAgents[x];
  }

  return (
    <>
      <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-x-4 gap-y-6 mt-12">
        {topAgents.map((value: any, index: number)=>{
          return (
            <div key={value.agent}>
            <AgentBox agentGames={agentGames[value.agent]} agentAverages={valAverage[Object.keys(valAverage)[0]][value.agent]} agentId={agentGames[value.agent][0].agent_id} maps={maps_array} agentInfo={agent_array[value.agent]}/>
            </div>
          )
        })}
      </div>
    </>
  );
};

export default AgentsUI;
