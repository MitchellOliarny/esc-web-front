"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaCircleInfo, FaXmark, FaPlus } from "react-icons/fa6";
import toast from "react-hot-toast";
import removeMember from "@/app/settings/settingsActions/removeMember";
import invitePlayer from "@/app/settings/settingsActions/invitePlayer";

interface MyTeamsUIProps {
  userTeams: Teams[];
  userInfo: UserInfo;
}

const MyTeamsUI = ({ userTeams, userInfo }: MyTeamsUIProps) => {
  const [playerToRemove, setPlayerToRemove] = useState("");
  const [riotUsername, setRiotUsername] = useState("");
  const [riotTag, setRiotTag] = useState("");

  const handleRemoveMember = async (
    teamId: string,
    playerId: string,
    playerName: string
  ): Promise<void> => {
    const response = await removeMember(teamId, playerId, playerName);
    if (response.success) {
      toast.success("Player removed from team successfully!");
      {
        () => {
          const modal = document.getElementById(
            "remove-member"
          ) as HTMLDialogElement;
          modal.close();
        };
      }
    } else {
      toast.error("Failed to remove player from team");
    }
  };

  const handleInvitePlayer = async (
    teamId: string,
    riotUsername: string,
    riotTag: string
  ): Promise<void> => {
    const response = await invitePlayer(teamId, riotUsername, riotTag);
    if (response.success) {
      toast.success(`Invitation sent to ${riotUsername}#${riotTag}`);
      setRiotUsername("");
      setRiotTag("");
      // window.location.reload();
    } else {
      toast.error(response.errors);
    }
  };

  // console.log(userTeams.length);

  return (
    <>
      {userTeams?.length != 0 ? (
        <div className="mt-5 px-10 gap-5 overflow-y-auto overflow-x-hidden h-full max-h-[600px]">
          <div id="myTeamsList" className="">
            {userTeams?.map((team) => (
              <div
                id="teamsContainerOrigin"
                className="border-b border-slate-400 mb-5"
                key={team.id}
              >
                <div
                  id="teamInfoContainer"
                  className="grid grid-cols-2 w-full items-center"
                >
                  <div id="teamName_Division" className="flex items-center">
                    <Image
                      width={1000}
                      height={1000}
                      id="teamLogo"
                      src={`https://api.esportsclubs.gg/images/${team.logo}`}
                      alt={`Team Logo of ${team.name}`}
                      className="teamLogo w-24 h-24 rounded-lg"
                    />
                    <div className="ml-4">
                      <h2
                        id="teamName"
                        className="teamName text-white text-2xl font-bold mb-2"
                      >
                        {team.name}
                      </h2>
                      <div className="flex gap-6">
                        <p
                          id="teamDivision"
                          className="teamDivision text-white"
                        >
                          Division: {team.league}
                        </p>
                        <p id="teamSeason" className="teamSeason text-white">
                          Season: {team.season}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-end items-end">
                    <button
                      className={
                        team.total_owed != 0
                          ? "payFeesButton btn uppercase bg-[#F5603C] hover:bg-[#AC442A] text-white px-5 mb-1"
                          : "payFeesButton btn btn-disabled uppercase text-white px-5 mb-1"
                      }
                    >
                      Pay Fees
                    </button>
                    {team.total_owed != 0 ? (
                      <div className="flex items-center">
                        <div
                          className="tooltip mr-1 text-white "
                          data-tip="You can pay partial or full amount"
                        >
                          <FaCircleInfo />
                        </div>
                        <p className="teamStatus text-center">
                          Owed: ${(team.total_owed / 100).toFixed(2)}
                        </p>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div id="teamRosterPaymentContainer" className="my-8">
                  <div
                    id="teamRoster"
                    className="collapse w-full border rounded-lg mb-5"
                  >
                    <input className="rosterDropdown" type="checkbox" />
                    <div className="memberDropdown collapse-title border-slate-400 border-b grid grid-cols-2 pr-4">
                      <div className="flex items-center align-middle gap-4">
                        <h2 className="font-medium text-white text-xl">
                          Team Roster&nbsp;
                          <span className="text-white playerAndCount text-lg">
                            &#40;
                            {
                              Object.values(team.roster).filter(
                                (player: any) => player.id !== 0
                              ).length
                            }{" "}
                            / 7&#41;
                          </span>
                        </h2>
                      </div>

                      <div className="flex justify-end items-center">
                        <i className="dropImage fa-solid fa-chevron-up fa-lg text-white/90"></i>
                      </div>
                    </div>
                    <div className="collapse-content p-0">
                      <div className="grid grid-cols-6 px-4 py-2 border-b border-slate-600">
                        <div className="flex font-bold text-white col-span-3 text-sm items-center">
                          <p className="text-white">Players Name</p>
                          {/* <i
                                                        className="teamOpen flex items-center align-middle fa-solid fa-lock fa-lg text-slate-600 hover:text-white/80 transition-all cursor-pointer ml-4"></i> */}
                        </div>

                        <div className="hidden font-bold text-white col-span-2 text-sm">
                          <p className="text-white">Date Joined</p>
                        </div>

                        <div className="col-start-6 font-bold text-white text-sm">
                          <p className="text-white">Actions</p>
                        </div>
                      </div>

                      <div className="playersCont">
                        {Object.keys(team.roster).map((playerKey) => {
                          const player = team.roster[playerKey];
                          return (
                            <div key={playerKey}>
                              {player.id != 0 ? (
                                <div className="grid grid-cols-6 items-center border-b border-slate-700 p-4">
                                  <div className="flex text-white col-span-3 text-sm items-center">
                                    <Image
                                      width={1000}
                                      height={1000}
                                      src={
                                        player.profile_picture != null
                                          ? `https://api.esportsclubs.gg/images/${player.profile_picture}`
                                          : "/avatar.png"
                                      }
                                      alt=""
                                      className="memberpfp w-16 h-16 rounded-md"
                                    />
                                    <div className="ml-4">
                                      <h3 className="playername text-white text-base font-medium">
                                        {player.riot_name}#{player.riot_tag}
                                      </h3>
                                      <p className="role text-white italic tracking-wider">
                                        {player.preferred_role}
                                      </p>
                                    </div>
                                  </div>

                                  {/* Add later */}
                                  {/* <div className="hidden text-white col-span-2 text-sm">
                                  <p className="text-white">
                                    November 23, 2023
                                  </p>
                                </div> */}

                                  <div
                                    id="actions-container"
                                    className="col-start-6 font-bold text-white text-sm flex gap-6"
                                  >
                                    {userInfo.id === team.captain_esc_id &&
                                    player.id !== userInfo.id ? (
                                      <FaXmark
                                        className="remove-member text-xl cursor-pointer"
                                        onClick={() => {
                                          const modal = document.getElementById(
                                            "remove-member"
                                          ) as HTMLDialogElement;
                                          modal.dataset.teamId =
                                            team.id.toString();
                                          modal.dataset.playerId =
                                            player.id.toString();
                                          modal.dataset.playerName = `${player.riot_name}#${player.riot_tag}`;
                                          setPlayerToRemove(
                                            `${player.riot_name}#${player.riot_tag}`
                                          );
                                          modal.showModal();
                                        }}
                                      />
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          );
                        })}

                        {Object.values(team.roster).filter(
                          (player: any) => player.id !== 0
                        ).length != 7 && userInfo.id === team.captain_esc_id ? (
                          <div
                            id="invitePlayerOrigin"
                            className="invitePlayer grid grid-cols-6 items-center px-4 pt-4"
                            onClick={() => {
                              const modal = document.getElementById(
                                "invitePlayer_modal"
                              ) as HTMLDialogElement;
                              modal.dataset.teamId = team.id.toString();
                              modal.showModal();
                            }}
                          >
                            <div className="flex text-white col-span-3 text-sm items-center">
                              <div
                                id="invitePlayerBtn"
                                className="w-16 h-16 rounded-full bg-slate-300 hover:bg-slate-400 flex justify-center items-center cursor-pointer transition-all"
                              >
                                <FaPlus className="text-2xl text-slate-800" />
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>

                  <div
                    id="teamPayment"
                    className="collapse w-full border rounded-lg"
                  >
                    <input id="teamPaymentCheckbox" type="checkbox" />
                    <div className="collapse-title border-slate-400 border-b grid grid-cols-2 pr-4">
                      <div className="flex items-center align-middle gap-4">
                        <h2 className="font-medium text-white text-xl">
                          Payments
                        </h2>
                      </div>

                      <div className="flex justify-end items-center">
                        <i
                          id="teamPaymentChevron"
                          className="fa-solid fa-chevron-up fa-lg text-white/90"
                        ></i>
                      </div>
                    </div>
                    <div className="collapse-content p-0">
                      <div className="grid grid-cols-6 px-4 py-2 border-b border-slate-600">
                        <div className="flex font-bold text-white col-span-4 text-sm items-center">
                          <p className="text-white">Payor</p>
                        </div>

                        <div className="font-bold text-white text-sm">
                          <p className="text-white">Amount Paid</p>
                        </div>
                      </div>

                      <div className="paymentPlayersCont">
                        {team.payments.map((payment: any, index: number) => (
                          <div
                            key={index}
                            id="playerPaymentOrigin"
                            className="grid grid-cols-6 items-center px-4 py-4 border-b border-slate-700"
                          >
                            <div className="flex text-white col-span-4 text-sm items-center">
                              <div>
                                <h3 className="playerName text-white text-base font-medium">
                                  {payment.riot_name}
                                </h3>
                              </div>
                            </div>

                            <div className="text-white text-sm">
                              <p className="amountPaid text-white">
                                ${(payment.amount / 100).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <dialog id="remove-member" className="modal text-left">
            <div className="modal-box w-full h-fit bg-[#0C131D] overflow-y-auto">
              <h3 className={`font-bold text-xl font-orbitron pb-2`}>
                Remove {playerToRemove} from the team?
              </h3>
              <div className="modal-action py-2">
                <form method="dialog">
                  <button
                    className="btn bg-[#F5603C] hover:bg-[#AC442A] text-white px-8 justify-start"
                    onClick={() => {
                      const modal = document.getElementById(
                        "remove-member"
                      ) as HTMLDialogElement;
                      handleRemoveMember(
                        modal.dataset.teamId
                          ? String(parseInt(modal.dataset.teamId))
                          : "",
                        modal.dataset.playerId
                          ? String(parseInt(modal.dataset.playerId))
                          : "",
                        modal.dataset.playerName ?? ""
                      );
                    }}
                  >
                    Remove
                  </button>
                  <button
                    className="btn bg-transparent hover:bg-[#888888]/20 text-white px-8 justify-start ml-2"
                    onClick={() => {
                      const modal = document.getElementById(
                        "remove-member"
                      ) as HTMLDialogElement;
                      modal.close();
                    }}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </dialog>

          <dialog id="invitePlayer_modal" className="modal">
            <div className="modal-box bg-[#1D2F44] w-full max-w-xl">
              <form method="dialog">
                <button className="btn btn-sm border-none btn-circle btn-ghost absolute right-4 top-4 text-white">
                  ✕
                </button>
              </form>
              <h3 className={`text-2xl font-medium mb-5`}>
                Invite Player to {userTeams[0]?.name}
              </h3>
              <div className="flex justify-center items-center">
                <label className="form-control w-full">
                  <input
                    value={riotUsername}
                    onChange={(e) => setRiotUsername(e.target.value)}
                    type="text"
                    name="riotName"
                    className="text input input-bordered w-full border border-white bg-slate-800 text-slate-200 text-lg"
                    id="riotName"
                    autoComplete="off"
                    placeholder="Riot Username..."
                  />
                  {/* <div className="label hidden">
                    <div
                      id="riotName-error"
                      className="error-message riotUserName"
                    ></div>
                  </div> */}
                </label>

                <span className="text-white text-2xl mx-2">#</span>

                <label className="form-control w-full">
                  <input
                    value={riotTag}
                    onChange={(e) => setRiotTag(e.target.value)}
                    type="text"
                    name="riotTag"
                    className="text input input-bordered w-full border border-white bg-slate-800 text-slate-200 text-lg"
                    id="riotTag"
                    autoComplete="off"
                    placeholder="Riot Tag..."
                  />
                  <div className="label hidden">
                    <div
                      id="riotTag-error"
                      className="error-message riotTag"
                    ></div>
                  </div>
                </label>
              </div>

              <div className="flex justify-center items-center mt-10 w-full">
                <button
                  id="saveChangesButton"
                  type="button"
                  onClick={() => {
                    const modal = document.getElementById(
                      "invitePlayer_modal"
                    ) as HTMLDialogElement;
                    handleInvitePlayer(
                      modal.dataset.teamId
                        ? String(parseInt(modal.dataset.teamId))
                        : "",
                      riotUsername,
                      riotTag
                    );
                  }}
                  className="btn bg-[#F5603C] hover:bg-[#ac442a] text-white"
                >
                  Send Invite
                </button>
                <button id="saveChangesButtonLoading" className="btn hidden">
                  <span className="loading loading-spinner"></span>
                  SAVING
                </button>
              </div>
            </div>
          </dialog>
        </div>
      ) : (
        <div className="px-10 pt-2">
          <p>You are not part of any team at this time.</p>
        </div>
      )}
    </>
  );
};

export default MyTeamsUI;
