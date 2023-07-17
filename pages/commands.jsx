import { useState } from 'react';
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import { toast } from 'react-hot-toast';

export default function Commands() {
  const [selectedCommand, setSelectedCommand] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleUseCommand = async (command) => {
    try {
      await navigator.clipboard.writeText(command);
      toast.success('Command copied to clipboard');
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 5000);
    } catch (err) {
      toast.error('Failed to copy text');
      console.error('Failed to copy text: ', err);
    }
  };

  const commands = [
    { command: "/help", description: "List of all commands."},
    { command: "/invite", description: "Invite Server Inspector to your server."},
    { command: "/ping", description: "Check the bot's latency."},
    { command: "/bot-stats", description: "Check the bot's stats."},
    { command: "/server-inspector", description: "Check your server's security and permissions."},
    { command: "/config-logs", description: "Configure bot logging channel."},
    { command: "/config-rules", description: "Configure rules for verify panel."},
    { command: "/config-panel", description: "Create a verification panel for your server."},
    { command: "/raid-block", description: "Configure raid protection settings."},
    { command: "/raid-setup", description: "Enable raid protection settings."},
    { command: "/scan", description: "Scan all members for blacklisted usernames."},
    { command: "/whois", description: "Show information about a user."},
    { command: "/password", description: "Configure a password for your servers verification panel."},
    { command: "/password-status", description: "View password status."},
    { command: "/blacklist", description: "Blacklist usernames for server scans."},
    { command: "/links", description: "Toggle link protection."},
    { command: "/view-links", description: "View whitelisted (allowed) links."},
    { command: "/discord-links", description: "Toggle Discord links from being posted."},
    { command: "/whitelist-links", description: "Whitelist a domain to be allowed in your server."},
    { command: "/whitelist", description: "Whitelist users and roles from being targeted in server scans."},
  ];

  return (
    <>
      <div className="px-4 md:px-5 py-10 mx-auto max-w-7xl space-y-10 text-white">
        <div className="flex justify-center w-full">
        <Image
            width={200}
            height={200}
            src="/img/discord.gif"
            alt="Discord"
          />
        </div>
        <h1 className="text-2xl md:text-4xl font-bold text-center">
          <i className="fal fa-cogs text-amber-400 mr-2" />
          Server Inspector Commands
        </h1>
        <p className="text-base md:text-xl text-center text-opacity-75 mb-10">
          Here you can find information about all the commands of the Server Inspector bot.
        </p>

        <div>
          <Menu as="div" className="w-full relative inline-block text-left">
            <div>
              <Menu.Button className="left-0 transition w-full duration-200 hover:bg-opacity-50 bg-black bg-opacity-30 text-white focus:text-amber-400 rounded-xl border border-white/10 focus:border-amber-400 focus:outline-none py-4 px-6 flex justify-between items-center">
                <div className="flex items-center gap-x-1 text-white text-opacity-60">
                  <i className="fa fa-hashtag text-white text-opacity-20" />
                  View Commands List
                </div>
              </Menu.Button>
            </div>

            <Transition
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95">
              <Menu.Items className="z-1 custom-scroll absolute left-0 w-full mt-2 origin-top-right bg-black overflow-auto max-h-60 border border-black border-opacity-20 bg-opacity-95 rounded-lg p-1">
                <div className="px-1 py-1 w-full">
                {commands.map((command, index) => (
                  <Menu.Item key={index}>
                    <div 
                      onClick={() => setSelectedCommand(command)}
                      className={`w-full rounded-lg p-2 cursor-pointer text-white flex items-center space-x-3 transition-all duration-200`}
                    >
                      <i className="fa-spin text-xl text-white text-opacity-20" />
                      <div>
                        <p className="font-bold">{command.command}</p>
                        <p className="text-sm text-opacity-75">{command.description}</p>
                      </div>
                    </div>
                  </Menu.Item>
                ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          {selectedCommand && (
            <div className="mt-5 p-4 rounded-md border border-amber-500 text-white shadow-md bg-gray-800">
                <div className="flex justify-between items-center mb-2 border-b border-amber-500 pb-2">
                    <h2 className="text-lg font-medium">Selected Command</h2>
                    <button onClick={() => handleUseCommand(selectedCommand.command)} className="flex items-center px-2 justify-center gap-2 shadow-lg shadow-amber-600/20 rounded-xl py-2 font-medium bg-gradient-to-bl from-amber-700 to-amber-500 hover:opacity-80 transition duration-200 text-white">
                      <i className="fas fa-clipboard"></i>{isCopied ? " Copied!" : " Copy"}
                    </button>
                </div>
                <div className="bg-amber-700 p-4 rounded-md mt-4 flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="mb-4 md:mb-0 pr-10">
                        <p className="font-semibold text-xl md:text-2xl mb-2">{selectedCommand.command}</p>
                        <p className="text-opacity-75 text-lg">{selectedCommand.description}</p>
                    </div>
                </div>
            </div>
          )}
        </div>
        <div className="animateHeader mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-6">
        <Link href="https://discord.com/api/oauth2/authorize?client_id=977774758647189506&permissions=8&scope=applications.commands%20bot">
          <a className="flex items-center px-6 justify-center gap-2 shadow-lg shadow-amber-600/20 rounded-xl py-4 font-medium bg-gradient-to-bl from-amber-700 to-amber-500 hover:opacity-80 transition duration-200 text-white">
            Invite Server Inspector
          </a>
        </Link>
        <Link href="https://discord.com/invite/gN6zG964bj">
          <a className="px-6 justify-center gap-2 shadow-lg shadow-amber-600/20 rounded-xl py-4 font-medium bg-gradient-to-bl from-amber-700 to-amber-500 hover:opacity-80 transition duration-200 text-white">
            Join Support Server
          </a>
        </Link>
        </div>
      </div>
      <div className="py-20"></div>
    </>
  )
}
