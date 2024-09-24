import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import LogInBtn from "./Buttons/LogInBtn";
import SignUpBtn from "./Buttons/SignUpBtn";

interface NavbarUserProps {
  user: string;
  rank: string | number;
  toggleDrawer: boolean;
  setToggleDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NavbarUser({
  user,
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
        <div className="space-x-2">
          <LogInBtn onClick={handleLoginClick} />

          <SignUpBtn onClick={handleSignUpClick} />
        </div>
      )}

      {user && (
        <div
          className="flex items-center gap-2"
          onClick={() => setToggleDrawer(!toggleDrawer)}
        >
          <Image
            height={1000}
            width={1000}
            src={`https://api.esportsclubs.gg/images/ranks/${rank}`}
            className="w-14 h-14 object-cover rounded-full"
            alt="User Rank"
          />
          <Link href="/settings?view=Profile">
            <h2 className="text-white font-bold text-xl cursor-pointer">
              {user}
            </h2>
          </Link>
        </div>
      )}
    </>
  );
}
