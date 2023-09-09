import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import axios from 'axios';

export default function Commands() {
  const [messages, setMessages] = useState([]);
  const [botStats, setBotStats] = useState(null);
  const [inputCommand, setInputCommand] = useState("");
  const [suggestedCommands, setSuggestedCommands] = useState([]);
  const [selectedCommandIndex, setSelectedCommandIndex] = useState(-1);
  const chatRef = useRef(null);

  const BOT_ICON = "/img/logo.jpg";
  const USER_ICON = "/img/user.jpg";

  const commands = [
    {
      command: "/help",
      description: "List of all commands.",
      embedResponse: true,
      embed: {
        title: "📜 Help Command",
        description: "Displays a list of all available commands.",
        color: "#3498db",
      }
    },
    {
      command: "/ping",
      description: "Check the bot's latency.",
      embedResponse: true,
      embed: {
        title: "🏓 Ping Command",
        description: "Replies with 'Ping?' and shows the round trip latency and bot's heartbeat.",
        color: "#3498db",
      }
    },
    {
      command: "/raid-block",
      description: "Configure raid protection settings.",
      embedResponse: true,
      embed: {
        title: "🛡️ Raid Block Command",
        description: "Configure parameters for raid protection including enabling/disabling, triggers, and duration.",
        color: "#3498db",
      }
    },
    {
      command: "/config-rules",
      description: "Configure rules for verify panel.",
      embedResponse: true,
      embed: {
        title: "⚙️ Config Rules Command",
        description: "Open a modal to configure server rules, allowing up to five rules.",
        color: "#3498db",
      }
    },
    {
      command: "/scan",
      description: "Scan all members for blacklisted usernames.",
      embedResponse: true,
      embed: {
        title: "🔍 Scan Command",
        description: "Scans server members against blacklisted usernames and provides banning options.",
        color: "#3498db",
      }
    },
    {
      command: "/server-inspector",
      description: "Check your server's security and permissions.",
      embedResponse: true,
      embed: {
        title: "🔒 Server Inspector Command",
        description: "Inspects server security and permissions, providing a detailed security report.",
        color: "#3498db",
      }
    },
    {
      command: "/bot-stats",
      description: "Check the bot's stats.",
      embedResponse: true,
      embed: {
        title: "📊 Bot Stats Command",
        description: "Displays bot statistics including uptime, server count, total users, and more.",
        color: "#3498db",
      }
    },
    {
      command: "/config-logs",
      description: "Configure bot logging channel.",
      embedResponse: true,
      embed: {
        title: "🔍 Config Logs Command",
        description: "Configure the channel where the bot sends log messages.",
        color: "#3498db",
      }
    },
    {
      command: "/config-panel",
      description: "Create a verification panel for your server.",
      embedResponse: true,
      embed: {
        title: "✅ Config Panel Command",
        description: "Set up a verification panel with server information and verification process.",
        color: "#3498db",
      }
    },
    {
      command: "/raid-setup",
      description: "Enable raid protection settings.",
      embedResponse: true,
      embed: {
        title: "🛡️ Raid Setup Command",
        description: "Enable or adjust settings for raid protection.",
        color: "#3498db",
      }
    },
    {
      command: "/whois",
      description: "Show information about a user.",
      embedResponse: true,
      embed: {
        title: "👤 Whois Command",
        description: "Retrieve detailed info about a user like nickname, roles, and account creation date.",
        color: "#3498db",
      }
    },
    {
      command: "/password",
      description: "Configure a password for your servers verification panel.",
      embedResponse: true,
      embed: {
        title: "🔑 Password Command",
        description: "Set a password for server verification with optional duration and usage limits.",
        color: "#3498db",
      }
    },
    {
      command: "/password-status",
      description: "View password status.",
      embedResponse: true,
      embed: {
        title: "🔒 Password Status Command",
        description: "Check if the server is locked/unlocked and view password details.",
        color: "#3498db",
      }
    },
    {
      command: "/blacklist",
      description: "Blacklist usernames for server scans.",
      embedResponse: true,
      embed: {
        title: "❌ Blacklist Command",
        description: "Add usernames to a blacklist to prevent them from joining or participating in the server.",
        color: "#3498db",
      }
    },
    {
      command: "/links",
      description: "Toggle link protection.",
      embedResponse: true,
      embed: {
        title: "🔗 Links Command",
        description: "Enable or disable link protection in the server.",
        color: "#3498db",
      }
    },
    {
      command: "/view-links",
      description: "View whitelisted (allowed) links.",
      embedResponse: true,
      embed: {
        title: "🔍 View Links Command",
        description: "Display a list of domains that are whitelisted and allowed in the server.",
        color: "#3498db",
      }
    },
    {
      command: "/discord-links",
      description: "Toggle Discord links from being posted.",
      embedResponse: true,
      embed: {
        title: "🚫 Discord Links Command",
        description: "Enable or disable the sharing of Discord links in the server.",
        color: "#3498db",
      }
    },
    {
      command: "/whitelist-links",
      description: "Whitelist a domain to be allowed in your server.",
      embedResponse: true,
      embed: {
        title: "✅ Whitelist Links Command",
        description: "Add or remove domains from the whitelist.",
        color: "#3498db",
      }
    },
    {
      command: "/whitelist",
      description: "Whitelist users and roles from being targeted in server scans.",
      embedResponse: true,
      embed: {
        title: "✅ Whitelist Command",
        description: "Allow specific users and roles to bypass certain server restrictions.",
        color: "#3498db",
      }
    }
];

const getCurrentTimestamp = () => {
  const now = new Date();
  return now.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
};

useEffect(() => {
  async function fetchBotStats() {
    try {
      const response = await axios.get("./api/fetch-stats");
      setBotStats(response.data);
    } catch (error) {
      console.error("Failed to fetch bot stats:", error);
    }
  }
  fetchBotStats();
}, []);

const handleKeyDown = (e) => {
  if (e.key === "Enter" && inputCommand) {
    if (selectedCommandIndex !== -1) {
      handleCommand(suggestedCommands[selectedCommandIndex].command);
      setInputCommand("");
    } else {
      handleCommand(inputCommand);
      setInputCommand("");
    }
  } else if (e.key === "ArrowDown") {
    e.preventDefault(); // Prevent the default behavior
    setSelectedCommandIndex((prevIndex) =>
      Math.min(prevIndex + 1, suggestedCommands.length - 1)
    );
  } else if (e.key === "ArrowUp") {
    e.preventDefault(); // Prevent the default behavior
    setSelectedCommandIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  }
};


useEffect(() => {
  if (inputCommand.startsWith("/")) {
    const filteredCommands = commands
      .filter((cmd) => cmd.command.includes(inputCommand.replace("/", "")))
      .slice(0, 5);
    setSuggestedCommands(filteredCommands);
  } else {
    setSuggestedCommands([]);
    setSelectedCommandIndex(-1);  // Reset the selected command index
  }
}, [inputCommand]);



  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  const handleCommand = (command) => {
    setMessages((prev) => [...prev, { type: "user", content: command }]);
  
    setTimeout(() => {
      if (command === "/help") {
        const commandList = commands
          .map(cmd => `${cmd.command}: ${cmd.description}`)
          .join('\n');
        const embedContent = {
          title: "Available Commands",
          description: "Server Inspectorᴮᴱᵀᴬ is your one-stop solution for robust server security, offering advanced verification, raid/link protection, near-perfect uptime, and stringent code security." + "\n\n" + commandList,
          thumbnail: BOT_ICON,
          color: "#3498db",
          buttons: [
            { label: "Add Bot", link: "https://discord.com/api/oauth2/authorize?client_id=977774758647189506&permissions=8&scope=applications.commands%20bot" },
            { label: "Support", link: "https://discord.com/invite/gN6zG964bj" },
            { label: "Website", link: "https://serverinspector.vercel.app/" },
            { label: "Developer", link: "https://twitter.com/bankkroll_eth" }
          ]
        };
        setMessages((prev) => [...prev, { type: "embed", content: embedContent }]);
      } else if (command === "/bot-stats" && botStats) {
        const emojiMap = {
          "Guild count": "📊",
          "User count": "👥",
          "Uptime": "🆙",
          "Spammers kicked": "🔨",
          "Links blocked": "🔗"
        };
        const statsDescription = Object.entries(botStats)
          .map(([key, value]) => `${emojiMap[key] || ""} ${key}: ${value}`)
          .join('\n');
        const embedContent = {
          title: "Bot Statistics",
          description: statsDescription,
          thumbnail: BOT_ICON,
          color: "#3498db"
        };
        setMessages((prev) => [...prev, { type: "embed", content: embedContent }]);
      } else {
        const cmdObj = commands.find((c) => c.command === command);
        if (cmdObj && cmdObj.embedResponse) {
          const embedContent = {
            title: cmdObj.embed.title,
            description: cmdObj.embed.description,
            thumbnail: BOT_ICON,
            color: cmdObj.embed.color
          };
          setMessages((prev) => [...prev, { type: "embed", content: embedContent }]);
        } else {
          setMessages((prev) => [...prev, { type: "message", content: cmdObj ? cmdObj.description : "Unknown command" }]);
        }
      }
    }, 500);
  };

  function EmbedButtons({ buttons }) {
    return (
        <div className="mt-4 grid md:grid-cols-4 grid-cols-2 gap-2">
            {buttons.map((button, index) => (
                <a 
                    key={index} 
                    href={button.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex justify-center items-center bg-discord-hover text-white py-2 px-2 rounded hover:bg-opacity-80 transition space-x-2"
                >
                    <span>{button.label}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 48 48">
                    <path fill="#ffffff" d="M 40.960938 4.9804688 A 2.0002 2.0002 0 0 0 40.740234 5 L 28 5 A 2.0002 2.0002 0 1 0 28 9 L 36.171875 9 L 22.585938 22.585938 A 2.0002 2.0002 0 1 0 25.414062 25.414062 L 39 11.828125 L 39 20 A 2.0002 2.0002 0 1 0 43 20 L 43 7.2460938 A 2.0002 2.0002 0 0 0 40.960938 4.9804688 z M 12.5 8 C 8.3826878 8 5 11.382688 5 15.5 L 5 35.5 C 5 39.617312 8.3826878 43 12.5 43 L 32.5 43 C 36.617312 43 40 39.617312 40 35.5 L 40 26 A 2.0002 2.0002 0 1 0 36 26 L 36 35.5 C 36 37.446688 34.446688 39 32.5 39 L 12.5 39 C 10.553312 39 9 37.446688 9 35.5 L 9 15.5 C 9 13.553312 10.553312 12 12.5 12 L 22 12 A 2.0002 2.0002 0 1 0 22 8 L 12.5 8 z"></path>
                    </svg>
                </a>
            ))}
        </div>
    );
}


function Embed({ title, description, fields = [], footer, thumbnail, color, buttons = null }) {
    return (
      <div className="bg-discord-middle text-white rounded p-4 mt-5 border-l-4 max-w-xl" style={{ borderColor: color }}>
        <div className="flex flex-col md:flex-row">
          <div className="flex-grow">
            {title && <div className="font-bold md:text-md text-sm mb-2">{title}</div>}
            {description && <div className="mb-3 text-xs whitespace-pre-line">{description}</div>}
            <div className="space-y-2">
              {fields.map((field, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="font-semibold text-xs">{field.name}</div>
                  <div className="text-xs">{field.value}</div>
                </div>
              ))}
            </div>
            {footer && <div className="mt-4 text-discord-light md:text-sm text-xs">{footer}</div>}
          </div>
          {thumbnail && (
            <img src={thumbnail} alt="Thumbnail" className="w-12 h-12 rounded-md mr-1 mt-4 md:mt-0" />
          )}
        </div>
        {buttons && <EmbedButtons buttons={buttons} />}
      </div>
    );
}



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
          className="flex-none bg-discord-middle p-4 md:p-6 rounded-lg mt-4 md:mt-0 transition-all ease-in-out duration-500"
          style={{ width: "100%", maxWidth: "240px" }}
        >
          <h2 className="font-bold mb-4 md:mb-6 text-md text-white">
            Command Simulator
          </h2>
          <div className="text-discord-light"># general</div>
          <div className="text-white mt-2"># commands</div>
        </div>

          {/* Chat */}
    <div className="flex-grow bg-discord-dark rounded-lg py-4 md:p-6 relative mt-4 md:mt-0">
      <div className="chat overflow-y-auto h-[50vh] md:h-[60vh]" ref={chatRef}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-5 ${msg.type === "user" ? "bg-discord-dark" : "bg-discord-hover"}`}>
            <div className="flex text-xs text-discord-light mb-2">
              <div className="flex-none">
                <Image
                  width={36}
                  height={36}
                  src={msg.type === "user" ? USER_ICON : BOT_ICON}
                  alt="Profile"
                  className="rounded-full"
                />
              </div>
              <div className="flex-grow ml-3">
                <div>{msg.type === "user" ? "User" : "ServerInspector"} — Today at {getCurrentTimestamp()}</div>
                {msg.type === "embed" ? (
                  <Embed {...msg.content} />
                ) : (
                  <div className="text-sm text-white">{msg.content}</div>
                )}
              </div>
            </div>
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
              onKeyDown={handleKeyDown}
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
                {suggestedCommands.map((cmd, index) => (
                  <div
                    key={cmd.command}
                    className={`cursor-pointer px-5 py-2 md:py-3 hover:bg-discord-hover ${index === selectedCommandIndex ? 'bg-discord-selected' : ''}`}
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
          <div className="flex items-center px-6 justify-center gap-2 shadow-lg shadow-amber-600/20 rounded-xl py-4 font-medium bg-gradient-to-bl from-amber-700 to-amber-500 hover:opacity-80 transition duration-200 text-white">
            Invite Server Inspector
          </div>
        </a>
        <a href="https://discord.com/invite/gN6zG964bj">
          <div className="px-6 justify-center gap-2 shadow-lg shadow-amber-600/20 rounded-xl py-4 font-medium bg-gradient-to-bl from-amber-700 to-amber-500 hover:opacity-80 transition duration-200 text-white">
            Join Support Server
          </div>
        </a>
        </div>
    </div>
  );
}
