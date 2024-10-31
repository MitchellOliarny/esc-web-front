import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import MainNavbar from "./components/MainNavbarV2";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { Providers } from "./providers";
import { cookies } from "next/headers";
import { userSession } from "./utils/authHelpers";
import { userInfo } from "./utils/authHelpers";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "ESC || %s",
    default: "ESC || Home",
  },
  description:
    "Esports Clubs is focused on providing third-party esports events, competitions, and tools designed to provide exposure and opportunity for players on their path to pro!",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const data = await userSession();
  const user = await userInfo();
  const info = user.data.info;
   //console.log(info);

  return (
    <html lang="en">
      <body className="">
        <Providers>
          <MainNavbar
            user={info?.first_name || info?.email as string}
            rank={info?.val_rank || 0 as number}
            riot={info?.riot_name || ''}
            pfp={//'https://files.esportsclubs.gg/' + info?.profile_picture || 
              `https://cdn.discordapp.com/avatars/${info?.discord_id}/${info?.discord_avatar}.png`}
          >
            <div className="">{children}</div>
            <Toaster position="bottom-right" reverseOrder={false} />
          </MainNavbar>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
