import { useEffect, useState } from 'react';
import Link from "next/link";
import Image from "next/image";

export default function Index() {
  const [botStats, setBotStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/fetch-stats');
        const data = await res.json();
        setBotStats(data);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to fetch bot stats:', err);
        setIsLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <>
      <div className="py-20 mb-30 max-w-3xl mx-auto">
        <div className="flex w-full justify-center">
          <img width="200" src="/img/discord.gif" />
        </div>
        <p className="animateHeader text-4xl font-extrabold text-center text-white">
          Server Inspectorᴮᴱᵀᴬ
        </p>
        <p className="animateHeader text-white text-opacity-50 text-center mt-5">
          Server Inspectorᴮᴱᵀᴬ is here to monitor your server from bots, links, and other security risks!
        </p>
        <div className="animateHeader mt-10 flex flex-wrap items-center justify-center gap-x-4">
            <Link href={"https://discord.com/api/oauth2/authorize?client_id=977774758647189506&permissions=8&scope=applications.commands%20bot"}>
              <a
                className={
                  "flex items-center px-6 justify-center gap-x-2 shadow-lg shadow-amber-600/20 rounded-xl py-4 font-medium bg-gradient-to-bl from-amber-700 to-amber-500 hover:opacity-80 transition duration-200 text-white " 
                }
              >
                Invite Server Inspector
              </a>
            </Link>
            <div className="py-10"></div>
            <Link href={"https://discord.com/invite/gN6zG964bj"}>
              <a className={" px-6 justify-center gap-x-2 shadow-lg shadow-amber-600/20 rounded-xl py-4 font-medium bg-gradient-to-bl from-amber-700 to-amber-500 hover:opacity-80 transition duration-200 text-white " }>
                Join Support Server
              </a>
            </Link>
        </div>

        <div style={{ zIndex: '-1' }} className="hidden xl:block undrag pointer-events-none opacity-10 -left-[10vw] absolute top-[8vw] h-[35vw] flex-shrink-0 grayscale rotate-[1deg]">
          <Image width="600" height="600" src="/img/code-left.png" />
        </div>
        <div style={{ zIndex: '-1' }} className="hidden xl:block undrag opacity-10 pointer-events-none -right-[15vw] absolute top-[13vw] h-[90vw] grayscale -rotate-9">
          <Image  width="600" height="600" src="/img/code-right.png"  />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-y-0 lg:gap-x-12 py-24">
          <div className="col-span-4">
            <p className="text-white text-4xl font-bold">
              Server Inspectorᴮᴱᵀᴬ
            </p>
            <p className="text-white text-md font-medium text-gray-500/75">
              Protect your server from bots, links, and other security risks with Server Inspector.
            </p>
            <a href="https://discord.com/api/oauth2/authorize?client_id=977774758647189506&permissions=8&scope=applications.commands%20bot" className={"mt-10 flex items-center px-4 justify-center gap-x-2 shadow-lg shadow-amber-600/20 cursor-pointer rounded-xl py-4 font-medium bg-gradient-to-r from-amber-700 to-amber-500 hover:opacity-80 transition duration-200 text-white"}>
              <i className="fab fa-discord mr-2" />Invite Server Inspector
            </a>
          </div>

          <div className="col-span-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="text-white">
                <p className="text-xl font-semibold mt-5"><i className={`fa fa-cogs text-2xl text-amber-500`} /> Join Gate</p>
                <p className="text-gray-500 line-clamp-4">Multi-step verification panel with buttons, modals, and a in server 3 step panel. Contains advanced DM reminder for protection & advanced setup for bot defence.</p>
              </div>
            </div>
            <div>
              <div className="text-white">
                <p className="text-xl font-semibold mt-5"><i className={`fa fa-shield text-2xl text-amber-500`} /> Raid/Link Defence</p>
                <p className="text-gray-500 line-clamp-4">Configure raid protection, user names to be kicked, links to be blocked and many more! Set custom parameters for your server.</p>
              </div>
            </div>
            <div>
              <div className="text-white">
                <p className="text-xl font-semibold mt-5"><i className={`fa fa-clock text-2xl text-amber-500`} /> 99.9% Uptime</p>
                <p className="text-gray-500 line-clamp-4">Bot is developed by 1 single dev, with secure hosting platform. If there is any downtime it is likely for updates or new features! Sorry in advance.</p>
              </div>
            </div>
            <div>
              <div className="text-white">
                <p className="text-xl font-semibold mt-5"><i className={`fa fa-lock text-2xl text-amber-500`} /> SECURITY</p>
                <p className="text-gray-500 line-clamp-4">Bot token is occasionally reset on updates. Bot code is only owned by one person and never shared.</p>
              </div>
            </div>
          </div>
      </div>

      <div className={`flex flex-row w-full h-auto lg:h-56 my-14 lg:my-40 bg-gradient-to-br lg:px-30 from-neutral-900/90 items-center justify-start to-neutral-900/50 rounded-lg p-1 shadow-md border border-amber-500/60`}>
          <>
            <div className="lg:mx-4 lg:p-8 py-4 lg:py-16 flex items-center justify-center flex-col text-center w-full lg:w-auto lg:text-left lg:flex-none">
              <img src="/img/panel.gif"  width="256" className="lg:hidden rounded-xl mb-5 shadow-xl shadow-black" />
              <p className="text-3xl text-white font-semibold">Enhance Your Server Security</p>
              <p className="text-md font-medium text-gray-500 line-clamp-5">Are you ready to enhance your server security with Server Inspector?</p>
            </div>
            <img src="/img/panel.gif" className="hidden lg:block rounded-xl perspective-right shadow-xl shadow-black" />
          </>
      </div>

      {botStats && (
        <div className={`mt-16 p-6 text-center border border-amber-500/60 text-white rounded-lg`}>
          <h2 className="text-3xl font-semibold">Live Bot Stats</h2>
          <p className="text-sm text-gray-400">Updates Hourly</p>
          <div className="flex flex-wrap justify-center mt-6 space-x-4">
            <div className="px-2">
              <h3 className="text-xl font-semibold">🆙 Uptime</h3>
              <p className="text-lg">{botStats["Uptime"]}</p>
            </div>
            <div className="px-2">
              <h3 className="text-xl font-semibold">📊 Server Count</h3>
              <p className="text-lg">{botStats["Guild count"]} servers</p>
            </div>
            <div className="px-2">
              <h3 className="text-xl font-semibold">👥 Total Users</h3>
              <p className="text-lg">{botStats["User count"].toLocaleString()} users</p>
            </div>
            <div className="px-2">
              <h3 className="text-xl font-semibold">⛔️ Kicked Spammers</h3>
              <p className="text-lg">{botStats["Spammers kicked"].toLocaleString()} spammers</p>
            </div>
            <div className="px-2">
              <h3 className="text-xl font-semibold">🔗 Blocked Links</h3>
              <p className="text-lg">{botStats["Links blocked"].toLocaleString()} links</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}