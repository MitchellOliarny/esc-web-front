"use client";

import React, { useState, useEffect } from "react";
import updateProfile from "@/app/settings/settingsActions/updateProfile";
import { toast } from "react-hot-toast";
import Avatar from "./Avatar";
import { updateUserSchema } from "@/app/utils/validations";
import { Spinner } from "@nextui-org/react";

interface ProfileSettingsUIProps {
  userInfo: UserInfo;
}

export default function ProfileSettingsUI({
  userInfo,
}: ProfileSettingsUIProps) {
  const roleOptions = [
    { value: "", text: "Select your preferred role" },
    { value: "Duelist", text: "Duelist" },
    { value: "Controller", text: "Controller" },
    { value: "Initiator", text: "Initiator" },
    { value: "Sentinel", text: "Sentinel" },
  ];

  const [preferredRole, setPreferredRole] = useState<string>(
    roleOptions[0].value
  );

  const getNameById = (
    id: string,
    agentsArray: { id: string; name: string }[]
  ): string => {
    const agent = agentsArray.find((agent) => agent.id === id);
    return agent ? agent.name : "Agent not found";
  };

  useEffect(() => {
    const fetchAgentOptions = async () => {
      try {
        const response = await fetch(
          "https://api.esportsclubs.gg/val/data/agents"
        );
        const agents = await response.json();
        // console.log(response);

        if (agents.data) {
          const agentsArray = agents.data.map(
            (agent: { key: string; id: string; name: string }) => ({
              key: agent.id,
              id: agent.id,
              name: agent.name,
            })
          );

          const updatedAgentOptions = [
            { id: "", name: "Select your preferred agent" },
            ...agentsArray,
          ];
          setAgentOptions(updatedAgentOptions);
        }
      } catch (error) {
        console.error("Error fetching agent options:", error);
      }
    };

    fetchAgentOptions();
  }, []);

  const [agentOptions, setAgentOptions] = useState<
    { id: string; name: string }[]
  >([{ id: "", name: "Select your preferred agent" }]);
  const [preferredAgent, setPreferredAgent] = useState<string>("");

  useEffect(() => {
    if (userInfo?.val_display_agent) {
      setPreferredAgent(userInfo?.val_display_agent);
    }
  }, [userInfo]);

  const handleAgentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPreferredAgent(e.target.value);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPreferredRole(e.target.value);
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateProfile = async (formData: FormData) => {

    const error_fields = document.getElementsByClassName('error-message');
    for (const x in error_fields) {
      if (typeof error_fields[x] == 'object'){
        error_fields[x].innerHTML = '';
      }
    }

    const plainData = Object.fromEntries(formData.entries());
    const validatedFields = updateUserSchema.safeParse(plainData);
    if (!validatedFields.success) {
      setIsLoading(false);
      const fieldErrors = validatedFields.error.flatten().fieldErrors;
      console.log(fieldErrors)
      for (const field in fieldErrors) {
        //@ts-ignore
        const errorElement = document.getElementById(field + "-error");
        if (errorElement) {
          // @ts-ignore
          errorElement.textContent = fieldErrors[field]
        }
      }
      return;
    }
    const response = await updateProfile(formData);

    if (response?.success) {
      setIsLoading(false);
      toast.success("Profile updated successfully");
    } else {
      setIsLoading(false);
      toast.error("Something went wrong. Check form and try again.");
      for (const field in response.errors) {
        const errorElement = document.getElementById(response.errors[field].param ? response.errors[field].param : response.errors[field].path + "-error");
        if (errorElement) {
          // @ts-ignore
          errorElement.innerHTML = response.errors[field].msg;
        }
      }
    }
  };

  const handlePasswordInput = (e: any) => {
    const errorElement = document.getElementById("password-error");
    if (errorElement) {
      errorElement.innerHTML = "";
    }
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <Avatar profile_picture={userInfo?.profile_picture} />
      </div>

      <div className="flex flex-col justify-center items-center mt-5">
        <form
          id="user-profile-edit"
          action={handleUpdateProfile}
          className="w-full"
        >
          <div className="grid grid-cols-2 w-full mt-6 gap-x-6 px-10">
            <div id="preferred-role-cont">
              <div className="label">
                <span className="label-text text-white">
                  Select your preferred role
                </span>
              </div>
              <label className="form-control w-full">
                <select
                  defaultValue={
                    userInfo?.val_rec_preferred_role
                      ? userInfo?.val_rec_preferred_role
                      : roleOptions[0].text
                  }
                  onChange={handleRoleChange}
                  id="preferred_role"
                  name="preferred_role"
                  className="text border border-white bg-slate-800 text-slate-200 text-lg select select-bordered"
                >
                  {roleOptions.map((role) => (
                    <option key={role.value} disabled={role.value === ""}>
                      {role.text}
                    </option>
                  ))}
                </select>
                <div className="label">
                  <div
                    id="preferred_role-error"
                    className="error-message preferred_role"
                  ></div>
                </div>
              </label>
            </div>
            <div id="favorite-agent-cont">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-white">
                    Select your preferred agent
                  </span>
                </div>
                <select
                  value={preferredAgent}
                  onChange={handleAgentChange}
                  name="display_agent"
                  id="display_agent"
                  className="text border border-white bg-slate-800 text-slate-200 text-lg select select-bordered"
                >
                  {agentOptions.map((agent, index) => (
                    <option
                      key={index}
                      value={agent.id}
                      disabled={agent.id === ""}
                    >
                      {agent.name}
                    </option>
                  ))}
                </select>
                <div className="label">
                  <div
                    id="display_agent-error"
                    className="error-message display_agent"
                  ></div>
                </div>
              </label>
            </div>
            <div id="email-cont">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-white">Email address</span>
                </div>
                <input
                  defaultValue={userInfo?.email}
                  id="email"
                  name="email"
                  type="text"
                  placeholder="someone@email.com..."
                  className="text input input-bordered w-full border border-white bg-slate-800 text-slate-200 text-lg"
                  autoComplete="on"
                />
                <div className="label">
                  <div id="email-error" className="error-message"></div>
                </div>
              </label>
            </div>
            <div id="zip-cont">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-white">Zipcode</span>
                </div>
                <input
                  defaultValue={userInfo.zipcode}
                  type="text"
                  className="text input input-bordered w-full border border-white bg-slate-800 text-slate-200 text-lg"
                  id="zipcode"
                  name="zipcode"
                  placeholder="Zipcode..."
                  autoComplete="off"
                />
                <div className="label">
                  <div id="zipcode-error" className="error-message"></div>
                </div>
              </label>
            </div>
            <div id="firstName-cont">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-white">First Name</span>
                </div>
                <input
                  defaultValue={userInfo.first_name}
                  type="text"
                  className="text input input-bordered w-full border border-white bg-slate-800 text-slate-200 text-lg"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name..."
                  autoComplete="off"
                />
                <div className="label">
                  <div
                    id="firstName-error"
                    className="error-message fName"
                  ></div>
                </div>
              </label>
            </div>
            <div id="lastName-cont">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-white">Last Name</span>
                </div>
                <input
                  defaultValue={userInfo.last_name}
                  type="text"
                  className="text input input-bordered w-full border border-white bg-slate-800 text-slate-200 text-lg"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name..."
                  autoComplete="off"
                />
                <div className="label">
                  <div id="lastName-error" className="error-message"></div>
                </div>
              </label>
            </div>
            <div id="password-cont">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-white">
                    Enter your <span className="font-semibold">current</span>{" "}
                    password to apply changes
                  </span>
                </div>
                <input
                  defaultValue=""
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="text input input-bordered w-full border border-white bg-slate-800 text-slate-200 text-lg"
                  id="password"
                  autoComplete="off"
                  onChange={handlePasswordInput}
                />
                <div className="label">
                  <div id="password-error" className="error-message"></div>
                </div>
              </label>
            </div>
            <div className="">
              <div className="label">
                <span className="label-text text-white">
                  <br />
                </span>
              </div>
              <button
                onClick={() => setIsLoading(true)}
                type="submit"
                id="applyChanges"
                className={`self-center submit btn ${isLoading ? "btn-disabled !bg-[#ac442a]/50" : "btn-ghost"
                  } submit bg-[#f5603c] hover:bg-[#ac442a] text-white w-full`}
              >
                {isLoading ? <Spinner color="default" /> : "Apply Changes"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
