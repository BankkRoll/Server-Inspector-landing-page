import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { commands } from '../utils/CommandList';
import { Embed } from '../utils/Embed';
import 'animate.css';
import { useTheme } from 'next-themes';

export default function Commands() {
    const [messages, setMessages] = useState([]);
    const [botStats, setBotStats] = useState(null);
    const [inputCommand, setInputCommand] = useState('');
    const [suggestedCommands, setSuggestedCommands] = useState([]);
    const [selectedCommandIndex, setSelectedCommandIndex] = useState(-1);
    const chatRef = useRef(null);
    const [showChannels, setShowChannels] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [userIcon, setUserIcon] = useState(() => {
        const randomAvatarNumber = Math.floor(Math.random() * 6);
        return `https://cdn.discordapp.com/embed/avatars/${randomAvatarNumber}.png`;
    });
    const BOT_ICON = '/img/logo.jpg';
    const { theme } = useTheme();

    const colorMap = {
        blue: 'border-l-4 border-blue-700',
        violet: 'border-l-4 border-violet-700',
        emerald: 'border-l-4 border-emerald-700',
        rose: 'border-l-4 border-rose-700',
        amber: 'border-l-4 border-amber-700',
        red: 'border-l-4 border-red-700',
        yellow: 'border-l-4 border-yellow-700',
        cyan: 'border-l-4 border-cyan-700',
        default: 'border-l-4 border-gray-700',
    };

    const getCurrentTimestamp = () => {
        const now = new Date();
        return now.toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    useEffect(() => {
        async function fetchBotStats() {
            try {
                const response = await axios.get('./api/fetch-stats');
                setBotStats(response.data);
            } catch (error) {
                console.error('Failed to fetch bot stats:', error);
            }
        }
        fetchBotStats();
    }, []);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && inputCommand) {
            if (selectedCommandIndex !== -1) {
                handleCommand(suggestedCommands[selectedCommandIndex].command);
                setInputCommand('');
            } else {
                handleCommand(inputCommand);
                setInputCommand('');
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault(); // Prevent the default behavior
            setSelectedCommandIndex((prevIndex) =>
                Math.min(prevIndex + 1, suggestedCommands.length - 1),
            );
        } else if (e.key === 'ArrowUp') {
            e.preventDefault(); // Prevent the default behavior
            setSelectedCommandIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        }
    };

    const toggleChannels = () => {
        setShowChannels((prev) => !prev);
        setIsAnimating(true);

        setTimeout(() => {
            setIsAnimating(false);
        }, 1000);
    };

    useEffect(() => {
        if (inputCommand.startsWith('/')) {
            const filteredCommands = commands
                .filter((cmd) =>
                    cmd.command.includes(inputCommand.replace('/', '')),
                )
                .slice(0, 5);
            setSuggestedCommands(filteredCommands);
        } else {
            setSuggestedCommands([]);
            setSelectedCommandIndex(-1);
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
        const userTimestamp = getCurrentTimestamp();
        const embedBorderColorClass = colorMap[theme] || colorMap.default;
        setMessages((prev) => [
            ...prev,
            { type: 'user', content: command, timestamp: userTimestamp },
        ]);

        setTimeout(() => {
            const botTimestamp = getCurrentTimestamp();

            if (command === '/help') {
                const commandList = commands
                    .map((cmd) => `${cmd.command}: ${cmd.description}`)
                    .join('\n');
                const embedContent = {
                    title: 'Available Commands',
                    description:
                        'Server Inspectorᴮᴱᵀᴬ is your one-stop solution for robust server security, offering advanced verification, raid/link protection, near-perfect uptime, and stringent code security.' +
                        '\n\n' +
                        commandList,
                    thumbnail: BOT_ICON,
                    color: embedBorderColorClass,
                    buttons: [
                        {
                            label: 'Add Bot',
                            link: 'https://discord.com/api/oauth2/authorize?client_id=977774758647189506&permissions=8&scope=applications.commands%20bot',
                        },
                        {
                            label: 'Support',
                            link: 'https://discord.com/invite/gN6zG964bj',
                        },
                        {
                            label: 'Website',
                            link: 'https://serverinspector.vercel.app/',
                        },
                        {
                            label: 'Developer',
                            link: 'https://twitter.com/bankkroll_eth',
                        },
                    ],
                };
                setMessages((prev) => [
                    ...prev,
                    {
                        type: 'embed',
                        content: embedContent,
                        timestamp: botTimestamp,
                    },
                ]);
            } else if (command === '/bot-stats' && botStats) {
                const emojiMap = {
                    'Guild count': '📊',
                    'User count': '👥',
                    Uptime: '🆙',
                    'Spammers kicked': '🔨',
                    'Links blocked': '🔗',
                };
                const statsDescription = Object.entries(botStats)
                    .map(
                        ([key, value]) =>
                            `${emojiMap[key] || ''} ${key}: ${value}`,
                    )
                    .join('\n');
                const embedContent = {
                    title: 'Bot Statistics',
                    description: statsDescription,
                    thumbnail: BOT_ICON,
                    color: embedBorderColorClass,
                };
                setMessages((prev) => [
                    ...prev,
                    {
                        type: 'embed',
                        content: embedContent,
                        timestamp: botTimestamp,
                    },
                ]);
            } else {
                const cmdObj = commands.find((c) => c.command === command);
                if (cmdObj && cmdObj.embedResponse) {
                    const embedContent = {
                        title: cmdObj.embed.title,
                        description: cmdObj.embed.description,
                        thumbnail: BOT_ICON,
                        color: embedBorderColorClass,
                    };
                    setMessages((prev) => [
                        ...prev,
                        {
                            type: 'embed',
                            content: embedContent,
                            timestamp: botTimestamp,
                        },
                    ]);
                } else {
                    setMessages((prev) => [
                        ...prev,
                        {
                            type: 'message',
                            content: cmdObj
                                ? cmdObj.description
                                : 'Unknown command',
                            timestamp: botTimestamp,
                        },
                    ]);
                }
            }
        }, 500);
    };

    return (
        <div className="py-12 mx-auto max-w-8xl space-y-12">
            <div className="discord-container rounded-lg p-6 flex flex-col md:flex-row bg-discord-dark">
                {/* Server Icon */}
                <div
                    className="flex-none mb-4 md:mb-0 mx-auto md:mx-0 md:mr-6 cursor-pointer md:pointer-events-none"
                    onClick={() => setShowChannels((prev) => !prev)}
                >
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
                    onClick={toggleChannels}
                    className={`flex-none bg-discord-middle p-4 md:p-6 md:max-w-[235px] rounded-lg md:mt-0 transition-all ease-in-out duration-500 
              ${
                  showChannels
                      ? 'animate__animated animate__fadeInDown md:animate__none'
                      : isAnimating
                      ? 'animate__animated animate__fadeOutUp md:animate__none'
                      : 'hidden md:block'
              }`}
                >
                    <h2 className="font-bold mb-4 md:mb-6 text-md text-white">
                        Command Simulator
                    </h2>
                    <div className="text-discord-light"># general</div>
                    <div className="text-white mt-2"># commands</div>

                    {commands.map((cmd) => (
                        <div key={cmd.command} className="text-discord-light">
                            - {cmd.command.replace('/', '/')}
                        </div>
                    ))}
                </div>

                <div className="text-center text-discord-light md:hidden mb-2">
                    <div className="text-discord-light animate__animated animate__bounce animate__infinite animate__slow">
                        ⬆️
                    </div>
                    <div className="text-discord-light text-sm mb-1">
                        {showChannels
                            ? 'Click the logo again to close'
                            : 'Click the logo to see all commands'}
                    </div>
                </div>

                {/* Chat */}
                <div className="flex-grow bg-discord-dark rounded-lg py-4 md:p-6 relative mt-4 md:mt-0">
                    <div
                        className="chat overflow-y-auto h-[50vh] md:h-[60vh]"
                        ref={chatRef}
                    >
                        {messages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full">
                                <div className="text-4xl wave-emoji mb-4">
                                    👋
                                </div>
                                <div className="text-discord-light text-center">
                                    <p className="text-lg font-bold">
                                        Welcome to Server Inspector!
                                    </p>
                                    <p>Type / to see available commands...</p>
                                </div>
                            </div>
                        ) : (
                            messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`mb-5 ${
                                        msg.type === 'user'
                                            ? 'bg-discord-dark'
                                            : 'bg-discord-hover'
                                    }`}
                                >
                                    <div className="flex text-xs text-discord-light mb-2">
                                        <div className="flex-none">
                                            <Image
                                                width={36}
                                                height={36}
                                                src={
                                                    msg.type === 'user'
                                                        ? userIcon
                                                        : BOT_ICON
                                                }
                                                alt="Profile"
                                                className="rounded-full"
                                            />
                                        </div>
                                        <div className="flex-grow ml-3">
                                            <div>
                                                {msg.type === 'user'
                                                    ? 'User'
                                                    : 'ServerInspector'}{' '}
                                                — Today at {msg.timestamp}
                                            </div>
                                            {msg.type === 'embed' ? (
                                                <Embed {...msg.content} />
                                            ) : (
                                                <div className="text-sm text-white">
                                                    {msg.content}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
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
                                    setInputCommand('');
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
                                style={{ bottom: '100%', marginBottom: '6px' }}
                            >
                                {suggestedCommands.map((cmd, index) => (
                                    <div
                                        key={cmd.command}
                                        className={`cursor-pointer px-5 py-2 md:py-3 hover:bg-discord-hover ${
                                            index === selectedCommandIndex
                                                ? 'bg-discord-selected'
                                                : ''
                                        }`}
                                        onClick={() => {
                                            setInputCommand(cmd.command);
                                            setSuggestedCommands([]);
                                        }}
                                    >
                                        {cmd.command} -{' '}
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
