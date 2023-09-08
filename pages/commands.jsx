import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";

export default function Commands() {
  const [messages, setMessages] = useState([]);
  const [inputCommand, setInputCommand] = useState("");
  const [suggestedCommands, setSuggestedCommands] = useState([]);
  const chatRef = useRef(null);

  const BOT_ICON = "/img/logo.jpg";
  const USER_ICON = "/img/user.jpg";

  const commands = [
    { command: "/help", description: "List of all commands." },
    {
      command: "/invite",
      description: "Invite Server Inspector to your server.",
    },
    { command: "/ping", description: "Check the bot's latency." },
    { command: "/bot-stats", description: "Check the bot's stats." },
    {
      command: "/server-inspector",
      description: "Check your server's security and permissions.",
    },
    { command: "/config-logs", description: "Configure bot logging channel." },
    {
      command: "/config-rules",
      description: "Configure rules for verify panel.",
    },
    {
      command: "/config-panel",
      description: "Create a verification panel for your server.",
    },
    {
      command: "/raid-block",
      description: "Configure raid protection settings.",
    },
    { command: "/raid-setup", description: "Enable raid protection settings." },
    {
      command: "/scan",
      description: "Scan all members for blacklisted usernames.",
    },
    { command: "/whois", description: "Show information about a user." },
    {
      command: "/password",
      description: "Configure a password for your servers verification panel.",
    },
    { command: "/password-status", description: "View password status." },
    {
      command: "/blacklist",
      description: "Blacklist usernames for server scans.",
    },
    { command: "/links", description: "Toggle link protection." },
    {
      command: "/view-links",
      description: "View whitelisted (allowed) links.",
    },
    {
      command: "/discord-links",
      description: "Toggle Discord links from being posted.",
    },
    {
      command: "/whitelist-links",
      description: "Whitelist a domain to be allowed in your server.",
    },
    {
      command: "/whitelist",
      description:
        "Whitelist users and roles from being targeted in server scans.",
    },
  ];

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getCurrentTimestamp = () => {
    const now = new Date();
    return now.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleCommand = (command) => {
    setMessages((prev) => [...prev, { type: "user", content: command }]);

    setTimeout(() => {
      const cmdObj = commands.find((c) => c.command === command);

      const response = {
        type: "message",
        content: cmdObj ? cmdObj.description : "Unknown command",
      };

      setMessages((prev) => [...prev, response]);
    }, 500);
  };

  useEffect(() => {
    if (inputCommand.startsWith("/")) {
      const filteredCommands = commands
        .filter((cmd) => cmd.command.includes(inputCommand))
        .slice(0, 5); // showing top 5 matches
      setSuggestedCommands(filteredCommands);
    } else {
      setSuggestedCommands([]);
    }
  }, [inputCommand]);

  return (
    <div className="py-12 mx-auto max-w-8xl space-y-12">
      <div className="discord-container rounded-lg p-6 flex flex-col md:flex-row bg-discord-dark">
        {/* Server Icon */}
        <div className="flex-none mb-4 md:mb-0 mx-auto md:mx-0 md:mr-6">
          <Image
            width={60}
            height={60}
            src="/img/discord.gif"
            alt="Discord"
            className="rounded-full"
          />
        </div>

        {/* Channels Section */}
        <div
          className="flex-none bg-discord-middle p-4 md:p-6 rounded-lg mt-4 md:mt-0 md:mr-8 transition-all ease-in-out duration-500"
          style={{ width: "100%", maxWidth: "240px" }}
        >
          <h2 className="font-bold mb-4 md:mb-6 text-md text-white">
            Command Simulator
          </h2>
          <div className="text-discord-light"># general</div>
          <div className="text-white mt-2"># commands</div>
        </div>

        {/* Chat */}
        <div className="flex-grow bg-discord-dark rounded-lg p-4 md:p-6 relative mt-4 md:mt-0">
          <div
            className="chat overflow-y-auto h-[40vh] md:h-[60vh]"
            ref={chatRef}
          >
            {messages.map((msg, idx) => (
              <div key={idx} className={`mb-5`}>
                <div className="flex items-center text-xs text-discord-light mb-2">
                  <Image
                    width={36}
                    height={36}
                    src={msg.type === "user" ? USER_ICON : BOT_ICON}
                    alt="Profile"
                    className="rounded-full"
                  />
                  {msg.type === "user" ? "User" : "ServerInspector"} — Today at{" "}
                  {getCurrentTimestamp()}
                </div>
                <div className="ml-8 text-white">{msg.content}</div>
              </div>
            ))}
          </div>

          {/* Command Input */}
          <div className="command-input flex items-center mt-4 md:mt-5 relative text-white">
            <input
              type="text"
              placeholder="Type / to see available commands..."
              value={inputCommand}
              onChange={(e) => setInputCommand(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && inputCommand) {
                  handleCommand(inputCommand);
                  setInputCommand("");
                }
              }}
              className="flex-grow p-2 md:p-3 mr-2 rounded-lg bg-discord-input placeholder-discord-light"
            />
            <button
              onClick={() => {
                if (inputCommand) {
                  handleCommand(inputCommand);
                  setInputCommand("");
                }
              }}
              className="p-2 md:p-3 bg-discord-light text-discord-dark rounded-lg hover:bg-discord-hover transition"
            >
              Send
            </button>

            {/* Command Suggestions */}
            {suggestedCommands.length > 0 && (
              <div
                className="absolute left-0 w-full bg-discord-suggestion rounded-lg border border-discord-border divide-y divide-discord-border"
                style={{ bottom: "100%", marginBottom: "6px" }}
              >
                {suggestedCommands.map((cmd) => (
                  <div
                    key={cmd.command}
                    className="cursor-pointer px-5 py-2 md:py-3 hover:bg-discord-hover"
                    onClick={() => {
                      setInputCommand(cmd.command);
                      setSuggestedCommands([]);
                    }}
                  >
                    {cmd.command} -{" "}
                    <span className="text-discord-light">
                      {cmd.description}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="animateHeader mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-6">
        <a href="https://discord.com/api/oauth2/authorize?client_id=977774758647189506&permissions=8&scope=applications.commands%20bot">
          <a className="flex items-center px-6 justify-center gap-2 shadow-lg shadow-amber-600/20 rounded-xl py-4 font-medium bg-gradient-to-bl from-amber-700 to-amber-500 hover:opacity-80 transition duration-200 text-white">
            Invite Server Inspector
          </a>
        </a>
        <a href="https://discord.com/invite/gN6zG964bj">
          <a className="px-6 justify-center gap-2 shadow-lg shadow-amber-600/20 rounded-xl py-4 font-medium bg-gradient-to-bl from-amber-700 to-amber-500 hover:opacity-80 transition duration-200 text-white">
            Join Support Server
          </a>
        </a>
        </div>
    </div>
  );
}
