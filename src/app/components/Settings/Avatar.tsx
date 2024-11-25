"use client";
import updateProfilePicture from "@/app/settings/settingsActions/updateProfilePicture";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@nextui-org/react";
import { FaEdit } from "react-icons/fa";
import Image from "next/image";
import { GetFile } from "@/app/utils/helpers";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";

interface AvatarProps {
  profile_picture: string;
}

export default function Avatar({ profile_picture }: AvatarProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const uploadProfilePicture = async (formData: FormData) => {
    setIsLoading(true);
    if (!profilePicture) return setIsLoading(false);
    const response = await updateProfilePicture(formData);
    if (response?.success === true) {
      toast.success("Profile updated successfully");
      setIsLoading(false);
    } else {
      toast.error("Something went wrong.");
      setIsLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfilePicture(file);
    }
  };
  return (
    <div>
      <div className="flex gap-12">
        <Image
          alt="Profile Picture"
          width={1000}
          height={1000}
          src={
            profile_picture
              ? GetFile(profile_picture)
              : "/avatar.png"
          }
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = "/avatar.png";
        }}
          className="rounded-full w-16 h-16 border-2 cursor-pointer object-cover"
        />
        <button onClick={onOpen} className="action-button">Change Avatar</button>
        <button className="action-button-nobg">Remove Avatar</button>
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="bg-[#1D2F44]"
      >
        <ModalContent>
          {(onClose) => (
            <div className="back-graphite">
              <ModalHeader className="flex flex-col gap-1">
                Choose a new profile picture
                <p className="text-xs">
                  Preview of your new profile picture will be shown here
                </p>
              </ModalHeader>
              <ModalBody className="flex items-center flex-col justify-center">
                <form action={uploadProfilePicture}>
                  <label
                    htmlFor="profile_picture_upload"
                    className="profile-picture-upload cursor-pointer relative inline-block"
                  >
                    <svg
                      id="upload_icon"
                      className="w-48 h-48 rounded-full border-2 hidden bg-[#1d2f4499]"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="#fff"
                        d="M288 109.3V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3l-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352H192c0 35.3 28.7 64 64 64s64-28.7 64-64H448c35.3 0 64 28.7 64 64v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V416c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"
                      />
                    </svg>
                    <input
                      type="file"
                      id="profile_picture_upload"
                      name="profile_picture"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                    <div className="relative">
                      <Image
                        alt="Profile Picture"
                        width={1000}
                        height={1000}
                        src={
                          profilePicture
                            ? URL.createObjectURL(profilePicture)
                            : GetFile(profile_picture) ||
                              "/avatar.png"
                        }
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null; // prevents looping
                          currentTarget.src = "/avatar.png";
                      }}
                        className="rounded-full w-48 h-48 overflow-hidden border-2 cursor-pointer object-cover"
                      />
                      <FaEdit
                        className="text-6xl text-gray-200 opacity-50"
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                        }}
                      />
                    </div>
                  </label>
                  <div className="flex items-center justify-center my-4">
                    <Button
                      color="primary"
                      className="bg-esc-primary"
                      radius="sm"
                      type="submit"
                      isDisabled={!profilePicture}
                      isLoading={isLoading}
                    >
                      Apply Changes
                    </Button>
                  </div>
                </form>
              </ModalBody>
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
