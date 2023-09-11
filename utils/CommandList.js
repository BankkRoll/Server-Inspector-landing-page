export const commands = [
    {
        command: '/help',
        description: 'List of all commands.',
        embedResponse: true,
        embed: {
            title: '📜 Help Command',
            description:
                'Displays a list of all available commands along with their details and provides buttons for additional bot actions.',
        },
    },
    {
        command: '/ping',
        description: "Check the bot's latency.",
        embedResponse: true,
        embed: {
            title: '🏓 Ping Command',
            description:
                "Replies with 'Ping?' and shows the round trip latency and bot's heartbeat in milliseconds.",
        },
    },
    {
        command: '/raid-block',
        description: 'Configure raid protection settings.',
        embedResponse: true,
        embed: {
            title: '🛡️ Raid Block Command',
            description:
                'Configure and update raid protection parameters like enabling/disabling, join triggers, and duration.',
        },
    },
    {
        command: '/config-rules',
        description: 'Configure rules for verify panel.',
        embedResponse: true,
        embed: {
            title: '⚙️ Config Rules Command',
            description:
                'Open a modal to configure server rules, allowing up to five rules to be set for the verification panel.',
        },
    },
    {
        command: '/scan',
        description: 'Scan all members for blacklisted usernames.',
        embedResponse: true,
        embed: {
            title: '🔍 Scan Command',
            description:
                'Scans all server members against blacklisted usernames and provides options to ban matching users.',
        },
    },
    {
        command: '/server-inspector',
        description: "Check your server's security and permissions.",
        embedResponse: true,
        embed: {
            title: '🔒 Server Inspector Command',
            description:
                'Provides a comprehensive report on server security, permissions, and potential vulnerabilities.',
        },
    },
    {
        command: '/bot-stats',
        description: "Check the bot's stats.",
        embedResponse: true,
        embed: {
            title: '📊 Bot Stats Command',
            description:
                'Displays detailed statistics of the bot, including uptime, total servers, user count, and more.',
        },
    },
    {
        command: '/config-logs',
        description: 'Configure bot logging channel.',
        embedResponse: true,
        embed: {
            title: '🔍 Config Logs Command',
            description:
                'Define the channel where the bot will send its logging messages, keeping a record of bot-related events.',
        },
    },
    {
        command: '/config-panel',
        description: 'Create a verification panel for your server.',
        embedResponse: true,
        embed: {
            title: '✅ Config Panel Command',
            description:
                'Set up a verification panel, defining the channel, role for verified users, and other related settings.',
        },
    },
    {
        command: '/raid-setup',
        description: 'Enable raid protection settings.',
        embedResponse: true,
        embed: {
            title: '🛡️ Raid Setup Command',
            description:
                'Activate or adjust settings for raid protection, defining triggers and protection duration.',
        },
    },
    {
        command: '/whois',
        description: 'Show information about a user.',
        embedResponse: true,
        embed: {
            title: '👤 Whois Command',
            description:
                'Retrieve detailed info about a user like nickname, roles, and account creation date.',
        },
    },
    {
        command: '/password',
        description:
            "Configure a password for your server's verification panel.",
        embedResponse: true,
        embed: {
            title: '🔑 Password Command',
            description:
                'Define or modify a password for server verification, setting optional expiration and usage constraints.',
        },
    },
    {
        command: '/password-status',
        description: 'View password status.',
        embedResponse: true,
        embed: {
            title: '🔒 Password Status Command',
            description:
                "Inspect the current status of the server's password, checking if it's enabled or disabled and viewing details.",
        },
    },
    {
        command: '/blacklist',
        description:
            'Add or remove usernames from a blacklist, preventing those users from joining or being active in the server.',
        embedResponse: true,
        embed: {
            title: '❌ Blacklist Command',
            description:
                'Manage a blacklist of usernames. Any user with a blacklisted username will be flagged or automatically removed from the server.',
        },
    },
    {
        command: '/links',
        description: 'Toggle link protection.',
        embedResponse: true,
        embed: {
            title: '🔗 Links Command',
            description:
                'Activate or deactivate link protection. When enabled, unauthorized links will be automatically deleted from chat.',
        },
    },
    {
        command: '/view-links',
        description: 'View whitelisted (allowed) links.',
        embedResponse: true,
        embed: {
            title: '🔍 View Links Command',
            description:
                'Displays a list of domains that are whitelisted, allowing them to be shared within the server without restrictions.',
        },
    },
    {
        command: '/discord-links',
        description: 'Toggle Discord links from being posted.',
        embedResponse: true,
        embed: {
            title: '🚫 Discord Links Command',
            description:
                'Enable or disable the ability for users to post Discord invitation links in the server.',
        },
    },
    {
        command: '/whitelist-links',
        description: 'Whitelist a domain to be allowed in your server.',
        embedResponse: true,
        embed: {
            title: '✅ Whitelist Links Command',
            description:
                'Add specific domains to a whitelist, allowing links from these domains to be shared within the server.',
        },
    },
    {
        command: '/whitelist',
        description:
            'Whitelist users and roles from being targeted in server scans.',
        embedResponse: true,
        embed: {
            title: '✅ Whitelist Command',
            description:
                'Specify particular users and roles to be exempt from server scans, ensuring they are not falsely flagged or removed.',
        },
    },
];
