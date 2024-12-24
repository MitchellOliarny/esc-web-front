"use client";

import React, { useState } from "react";
import Image from "next/image";
import disconnectDiscord from "@/app/settings/settingsActions/disconnectDiscord";
import connectDiscord from "@/app/settings/settingsActions/connectDiscord";
import connectRiot from "@/app/settings/settingsActions/connectRiot";
import { toast } from "react-hot-toast";
import updateRiot from "@/app/settings/settingsActions/updateRiot";
import { Spinner } from "@nextui-org/react";
import { api } from "@/app/utils/helpers";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { set } from "zod";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { FaDiscord } from "react-icons/fa";

// import { Orbitron } from "next/font/google";
// const orbitron = Orbitron({
//   subsets: ["latin"],
//   display: "swap",
//   adjustFontFallback: false,
// });

interface ConnectionsSettingsUIProps {
  userInfo: UserInfo;
}

export default function ConnectionsSettingsUI({
  userInfo,
}: ConnectionsSettingsUIProps) {
  const urlParams = new URLSearchParams(location.search);
  const code = urlParams.get("code");
  const isRiot = urlParams.get("iss");
  const session_state = urlParams.get("session_state");

  async function connectToDiscord(discord_code: string) {
    try {
      const response = await connectDiscord(discord_code);
      const urlWithoutCode = window.location.href.split("&code=")[0];
      history.replaceState({}, document.title, urlWithoutCode);
      if (response && response.success) {
        toast.success(response?.message || "Successfully connected to Discord");
        const urlWithoutCode = window.location.href.split("&code=")[0];
        history.replaceState({}, document.title, urlWithoutCode);
      } else {
        toast.error(response?.errors || "Failed to connect to Discord");
      }
    } catch (error) {
      console.error("Error connecting to Discord:", error);
    }
  }
  async function connectToRiot(riot_code: string) {
    try {
      const response = await connectRiot(riot_code);
      const urlWithoutCode = window.location.href.split("iss=")[0];
      history.replaceState({}, document.title, urlWithoutCode);
      if (response && response.success) {
        toast.success(response?.message || "Successfully connected to Riot Games");
        const urlWithoutCode = window.location.href.split("iss=")[0];
        history.replaceState({}, document.title, urlWithoutCode);
      } else {
        toast.error(response?.errors || "Failed to connect to Riot Games");
      }
    } catch (error) {
      console.error("Error connecting to Discord:", error);
    }
  }

  if(code && isRiot == "https://auth.riotgames.com") {
    connectToRiot(code)
  }
  else if (code) {
    connectToDiscord(code);
  }

  const connectDiscordClick = () => {
    window.open(api+"/settings/connections/discord");
  };

  const handleDiscordDisconnect = async () => {
    const response = await disconnectDiscord();

    if (response.success) {
      toast.success("Successfully disconnected from Discord");
      (
        document.getElementById("discord_disconnect") as HTMLDialogElement
      )?.close();
    } else {
      console.log("failure");
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

 

  return (
    <>
      <div className="grid py-8 px-4 gap-5 w-full back-graphite rounded-lg">
        <div
          id="discordConnection"
          className="flex md:flex-row flex-col items-center align-middle p-4 rounded-lg w-full h-full gap-4 connectContainer min-h-32"
        >
          <div className="w-full h-full">
            <h2 className="font-bold text-frost text-lg">Discord</h2>
            <p className="text-ash">{userInfo?.discord_id ? 'Connected! Click the tile to Disconnect.' : 'Connect your Discord with Esports Clubs. '}</p>
          </div>
          <div className="h-full min-h-16 w-full">
            {userInfo?.discord_id ? (
              <div
                onClick={() =>
                  (
                    document.getElementById(
                      "discord_disconnect"
                    ) as HTMLDialogElement
                  ).showModal()
                }
                id="discord-profile"
                className="bg-[#5865F2] hover:!bg-[#637ddb] transition-all h-full w-full flex text-center justify-between px-4 items-center rounded-lg cursor-pointer"
              >
                <div className="flex col-span-2">
                  <Image
                    alt="discord user avatar"
                    width={1000}
                    height={1000}
                    id="discord-avatar"
                    className="h-12 w-12 mr-4 rounded-full"
                    src={`https://cdn.discordapp.com/avatars/${userInfo.discord_id}/${userInfo.discord_avatar}.png`}
                  />
                  <h2
                    id="discord-username"
                    className="font-bold text-white text-lg my-auto text-left"
                  >
                    {/* @ts-ignore */}
                    {userInfo?.discord_username}
                  </h2>

                </div>
                <FaDiscord
                  className="w-auto h-12 mr-4 cursor-pointer"
                />
              </div>
            ) : (
              <div className="h-full w-full">
                <Link href={api+"/settings/connections/discord"}>
                  <div className="bg-[#5865F2] hover:!bg-[#637ddb] transition-all h-full w-full flex text-center justify-between px-4 items-center rounded-lg cursor-pointer">
                    <h2 id="discordConnect" className="font-bold text-white">
                      Connect your Discord
                    </h2>
                    <FaDiscord
                      className="w-auto h-12 mr-4 cursor-pointer"
                    />
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>

        <div
          id="riotConnection"
          className="flex md:flex-row flex-col items-center align-middle p-4 rounded-lg w-full h-full gap-4 connectContainer min-h-32"
        >
          <div className="w-full h-full">
            <h2 className="font-bold text-frost text-lg">Riot Games</h2>
            <p className="text-ash">Connect your Riot Games with Esports Clubs. This is necessary to recieve game data. Click the tile to Update.</p>
          </div>
          <div
            className="transition-all h-full w-full flex text-center justify-center items-center rounded-lg cursor-pointer"
            id="riotConnect"
          >
            {
              userInfo?.puuid ?
                <div
                  className="bg-[#D42B2B] hover:!bg-[#9e2020] transition-all h-full w-full flex text-center justify-between px-6 items-center rounded-lg cursor-pointer"
                  id="updateRiotAccount"
                >
                  <h2 className="font-bold text-white text-red-">
                    {
                      //@ts-ignore
                      userInfo?.riot_name + '#' + userInfo?.riot_tag}
                  </h2>
                  <Image
                    alt="riot games logo"
                    width={1000}
                    height={1000}
                    src="/logos/riot-games.png"
                    className="w-auto h-16 cursor-pointer"
                  />
                </div>
                :
                <div className="h-full w-full">
                  <Link href={api+"/settings/connections/riot"}>
                    <div className="bg-[#D42B2B] hover:!bg-[#9e2020]transition-all h-full w-full flex text-center justify-between px-4 items-center rounded-lg cursor-pointer">
                      <h2 id="riotConnect" className="font-bold text-white">
                        Connect your Riot Account
                      </h2>
                      <Image
                        alt="riot games logo"
                        width={1000}
                        height={1000}
                        src="/logos/riot-games.png"
                        className="w-auto h-16 cursor-pointer"
                      />
                    </div>
                  </Link>
                </div>
            }
          </div>
        </div>
  

        {/* <div
          id="omnicConnection"
          className="bg-slate-800 flex items-center align-middle p-4 rounded-lg w-full h-full gap-4 connectContainer"
        >
          <Image
            alt="riot games logo"
            width={1000}
            height={1000}
            src="/logos/omnic-ai.png"
            className="w-auto h-16 cursor-pointer"
          />
          <div
            className="transition-all h-full w-full flex text-center justify-center items-center rounded-lg cursor-pointer"
            id="riotConnect"
          >
            <div
              className="bg-[#3EB4E5] hover:!bg-[#3eb3e5e3] transition-all h-full w-full flex text-center justify-center items-center rounded-lg cursor-pointer"
              id="omnicConnect"
            >
              <h2 className="font-bold text-white text-red-">
                Connect to Omnic.AI
              </h2>
            </div>
          </div>
        </div> */}

        <dialog id="discord_disconnect" className="modal">
          <div className="modal-box bg-[#1D2F44] w-full max-w-xl">
            <form method="dialog">
              <button className="btn btn-sm border-none btn-circle btn-ghost absolute right-4 top-4 text-white">
                ✕
              </button>
            </form>
            <h3 className={`text-xl font-medium mb-5 text-left`}>
              Are you sure you want to disconnect your Discord,{" "}
              <span className="text-[#F5603C] font-bold italic">
                {userInfo?.discord_id ? userInfo?.discord_username : ""}
              </span>
              ?
            </h3>

            <div className="flex gap-4 justify-end items-center mt-10 w-full">
              <button
                type="button"
                onClick={handleDiscordDisconnect}
                className="btn bg-[#F5603C] hover:bg-[#ac442a] text-white"
              >
                Yes, I&apos;m sure
              </button>
              <button
                type="button"
                onClick={() =>
                  (
                    document.getElementById(
                      "discord_disconnect"
                    ) as HTMLDialogElement
                  ).close()
                }
                className="btn bg-transparent hover:bg-slate-700 text-white"
              >
                Cancel
              </button>
              <button id="saveChangesButtonLoading" className="btn hidden">
                <span className="loading loading-spinner"></span>
                SAVING
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
}
