import React from "react";
import AgentBox from "./AgentBox";

interface AgentUIProps {
  agentGames: any;
  topAgents: any;
  valAverage: any;
}

const AgentsUI = ({agentGames, topAgents, valAverage}: AgentUIProps) => {

  //console.log(topAgents)

  return (
    <>
      <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4">
        {topAgents.map((value: any, index: number)=>{
          return (
            <div key={value.agent}>
            <AgentBox agentGames={agentGames[value.agent]} agentAverages={valAverage[Object.keys(valAverage)[0]][value.agent]} agentId={agentGames[value.agent][0].agent_id}/>
            </div>
          )
        })}
      </div>
    </>
  );
};

export default AgentsUI;
