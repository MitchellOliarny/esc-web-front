import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import LogInBtn from "./Buttons/LogInBtn";
import SignUpBtn from "./Buttons/SignUpBtn";

interface NavbarUserProps {
  user: string;
  riot: string;
  pfp: string;
  rank: string | number;
  toggleDrawer: boolean;
  setToggleDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NavbarUser({
  user,
  riot,
  pfp,
  rank,
  toggleDrawer,
  setToggleDrawer,
}: NavbarUserProps) {
  const pathname = usePathname();

  const handleLoginClick = () => {
    localStorage.setItem("previousPath", pathname);
    window.location.href = "/login?form=Log-In";
  };

  const handleSignUpClick = () => {
    localStorage.setItem("previousPath", pathname);
    window.location.href = "/login?form=Sign-Up";
  };

  return (
    <>
      {!user && (
        <div className="space-x-4 my-4">
          <LogInBtn onClick={handleLoginClick} />

          <SignUpBtn onClick={handleSignUpClick} />
        </div>
      )}

      {user && (
        <Link href="/settings?view=Profile" className="w-full py-4">
          <div
            className="flex items-center justify-between"
            onClick={() => setToggleDrawer(!toggleDrawer)}
          >
            <div className="flex content-center gap-2">
              {pfp ? 
              <img src={pfp} alt='user pfp' className="w-6 h-6 rounded-full"></img>
              :
              ''
              }
              <h2 className="self-center text-sm">{user}</h2>
            </div>
            <div className="flex content-center gap-2">
              <Image
                height={1000}
                width={1000}
                src={`https://api.esportsclubs.gg/images/ranks/${rank}`}
                className="w-4 h-4object-cover rounded-full"
                alt="User Rank"
              />

              <h2 className="text-ash font-bold text-xs cursor-pointer">
                {riot}
              </h2>
            </div>
          </div>
        </Link>
      )}
    </>
  );
}
