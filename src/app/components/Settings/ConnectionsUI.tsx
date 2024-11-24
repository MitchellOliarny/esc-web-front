"use client";

import React, { useState } from "react";
import Image from "next/image";
import disconnectDiscord from "@/app/settings/settingsActions/disconnectDiscord";
import connectDiscord from "@/app/settings/settingsActions/connectDiscord";
import { toast } from "react-hot-toast";
import updateRiot from "@/app/settings/settingsActions/updateRiot";
import { Spinner } from "@nextui-org/react";

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
  const discord_code = urlParams.get("code");

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

  if (discord_code) {
    connectToDiscord(discord_code);
  }

  const connectDiscordClick = () => {
    window.open("https://api.esportsclubs.gg/settings/connections/discord");
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

  const handleRiotAccountUpdate = async (formData: FormData) => {
    const response = await updateRiot(formData);
    if (response?.success) {
      setIsLoading(false);
      toast.success("Riot account updated successfully");
    } else {
      setIsLoading(false);
      //@ts-ignore
      const error = response?.errors ? response?.errors[0]?.msg : null
      toast.error(error || response?.message || "Something went wrong.");
    }
  };

  return (
    <>
      <div className="grid p-8 mt-5 gap-5 w-full back-graphite rounded-lg">
        <div
          id="discordConnection"
          className="grid grid-cols-2 p-4 rounded-lg w-full h-full gap-4 connectContainer min-h-24"
        >
          <div className="w-full h-full">
            <h2 className="font-bold text-frost text-lg">Discord</h2>
            <p className="text-ash">Connect your Discord with Esports Clubs.</p>
          </div>
          <div className="h-full">
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
              <div className="col-span-2">
              <Image
                alt="discord user avatar"
                width={1000}
                height={1000}
                id="discord-avatar"
                className="h-14 w-14 mr-4 rounded-full"
                src={`https://cdn.discordapp.com/avatars/${userInfo.discord_id}/${userInfo.discord_avatar}.png`}
              />
                <h2
                  id="discord-username"
                  className="font-bold text-white text-left"
                >
                  {/* @ts-ignore */}
                  {userInfo?.discord_username}
                </h2>
                <p className="text-white text-left text-xs">Disconnect</p>
              
              </div>
              <Image
                  alt="discord logo"
                  width={1000}
                  height={1000}
                  src="/logos/discord.png"
                  className="w-auto h-16 cursor-pointer"
                />
            </div>
          ) : (
            <div className="h-full w-full">
              <Link href="https://api.esportsclubs.gg/settings/connections/discord">
                <div className="bg-[#5865F2] hover:!bg-[#637ddb] transition-all h-full w-full flex text-center justify-between px-4 items-center rounded-lg cursor-pointer">
                  <h2 id="discordConnect" className="font-bold text-white">
                    Connect your Discord
                  </h2>
                  <FaDiscord
                    className="w-auto h-12 cursor-pointer"
                  />
                </div>
              </Link>
            </div>
          )}
          </div>
        </div>

        <div
          id="riotConnection"
          className="bg-slate-800 flex items-center align-middle p-4 rounded-lg w-full h-full gap-4 connectContainer"
          onClick={onOpen}
        >
          <Image
            alt="riot games logo"
            width={1000}
            height={1000}
            src="/logos/riot-games.png"
            className="w-auto h-16 cursor-pointer"
          />
          <div
            className="transition-all h-full w-full flex text-center justify-center items-center rounded-lg cursor-pointer"
            id="riotConnect"
          >
            <div
              className="bg-[#D42B2B] hover:!bg-[#9e2020] transition-all h-full w-full flex text-center justify-center items-center rounded-lg cursor-pointer"
              id="updateRiotAccount"
            >
              <h2 className="font-bold text-white text-red-">
                Update Riot Account
              </h2>
            </div>
          </div>
        </div>

        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          className="bg-[#1D2F44] max-w-xl"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  <h3 className={`text-2xl font-medium`}>
                    Update Riot Account
                  </h3>
                </ModalHeader>
                <ModalBody>
                  <form action={handleRiotAccountUpdate}>
                    <div className="flex justify-center items-center mb-2">
                      <label className="form-control w-full">
                        <input
                          defaultValue={userInfo?.riot_name}
                          type="text"
                          name="riotName"
                          className="text input input-bordered w-full border border-white bg-slate-800 text-slate-200 text-lg"
                          id="riotName"
                          autoComplete="off"
                          placeholder="Riot Username..."
                        />
                        <div className="label hidden">
                          <div
                            id="riotName-error"
                            className="error-message riotUserName"
                          ></div>
                        </div>
                      </label>

                      <span className="text-white text-2xl mx-2">#</span>

                      <label className="form-control w-full">
                        <input
                          defaultValue={userInfo?.riot_tag}
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
                    <div className="flex justify-end gap-2 pt-4 pb-2">
                      {!isLoading ? (
                        <Button
                          className="bg-transparent text-white border-1 border-slate-600 rounded-md"
                          onPress={onClose}
                        >
                          Cancel
                        </Button>
                      ) : (
                        ""
                      )}
                      <Button
                        className={`bg-[#F5603C] ${isLoading ? "btn-disabled !bg-[#ac442a]/50" : ""
                          } text-white rounded-md`}
                        type="submit"
                        onClick={(e) => {
                          setIsLoading(true);
                        }}
                      >
                        {isLoading ? (
                          <Spinner color="default" size="sm" />
                        ) : (
                          "Continue"
                        )}
                      </Button>
                    </div>
                  </form>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>

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
