"use client";
import React from "react";
import Image from "next/image";
import { FaCheck, FaXmark } from "react-icons/fa6";
import acceptInvite from "@/app/settings/settingsActions/acceptInvite";
import toast from "react-hot-toast";
import declineInvite from "@/app/settings/settingsActions/declineInvite";

interface TeamInvitesUIProps {
  userInvites: UserInvites[];
}

const TeamInvitesUI = ({ userInvites }: TeamInvitesUIProps) => {
  const handleAcceptInvite = async (inviteId: string): Promise<void> => {
    const response = await acceptInvite(inviteId);
    if (response.success) {
      toast.success("Invite accepted successfully!");
    } else {
      toast.error(response.errors);
    }
  };

  const handleDeclineInvite = async (inviteId: string): Promise<void> => {
    const response = await declineInvite(inviteId);
    if (response.success) {
      toast.success("Invite declined successfully!");
    } else {
      toast.error(response.errors);
    }
  };

  return (
    <>
      <div className="mt-5 border border-slate-400 rounded-md ml-10">
        <div className="grid grid-cols-6 items-center border-b border-slate-600 p-4">
          <h2 className="col-span-3 text-white text-sm font-bold">Team Name</h2>
          {/* <!-- ADD LATER --> */}
          {/* <h2 className="hidden flex justify-center text-white text-sm font-bold">
            Members
          </h2> */}

          <h2 className="col-start-4 flex justify-center text-white text-sm font-bold">
            Division
          </h2>
          <h2 className="flex justify-center text-white text-sm font-bold">
            Season
          </h2>
          <h2 className="flex justify-center text-white text-sm font-bold">
            Actions
          </h2>
        </div>

        {userInvites ? (
          <>
            {userInvites?.map((invite) => (
              <div id="teamInviteContainer" key={invite.id}>
                <div
                  id="teamInviteOrigin"
                  className="p-4 grid grid-cols-6 items-center "
                >
                  <div className="flex text-white col-span-3 text-sm items-center">
                    <Image
                      src={`https://api.esportsclubs.gg/images/${invite.logo}`}
                      height={100}
                      width={100}
                      alt=""
                      className="inviteTeamImage w-16 h-16 rounded-md"
                    />
                    <div className="ml-4">
                      <h3 className="inviteTeamName text-white text-xl font-medium">
                        {invite.name}
                      </h3>
                      <p className="teamInviteFrom text-white">
                        Invited by: {invite.riot_name}#{invite.riot_tag}
                      </p>
                    </div>
                  </div>

                  {/* <!-- ADD LATER --> */}
                  <div className="hidden">
                    <p className="teamMemberCount text-white text-center font-bold">
                      3 / 7
                    </p>
                  </div>

                  <div className="col-start-4">
                    <p className="inviteTeamDivision text-white text-center font-bold">
                      {invite.league}
                    </p>
                  </div>

                  {/* {invite.location} */}
                  <div className="">
                    <p className="inviteTeamSeason text-white text-center font-bold">
                      {invite.season}
                    </p>
                  </div>

                  <div className="flex gap-5 justify-center">
                    <FaCheck
                      className="text-xl cursor-pointer"
                      onClick={() => handleAcceptInvite(invite.id)}
                    />
                    <FaXmark
                      className="text-xl cursor-pointer"
                      onClick={() => handleDeclineInvite(invite.id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          "No invites found"
        )}
      </div>
    </>
  );
};

export default TeamInvitesUI;
