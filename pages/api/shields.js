import axios from 'axios';

// Function to convert milliseconds to human-readable format
function msToTime(duration) {
  let seconds = parseInt((duration / 1000) % 60),
    minutes = parseInt((duration / (1000 * 60)) % 60),
    hours = parseInt((duration / (1000 * 60 * 60)) % 24),
    days = parseInt(duration / (1000 * 60 * 60 * 24));

  let uptime = "";

  if(days > 0) uptime += `${days} days, `;
  if(hours > 0) uptime += `${hours} hours, `;
  if(minutes > 0) uptime += `${minutes} minutes, `;
  uptime += `${seconds} seconds`;

  return uptime;
}

export default async function handler(req, res) {
  try {
    const statName = req.query.stat;  // Get the stat name from the query parameters

    const response = await axios.get(`https://discord.com/api/channels/${process.env.CHANNEL_ID}/messages`, {
      headers: {
        'Authorization': `Bot ${process.env.TOKEN}`
      },
      params: {
        limit: 1
      }
    });

    if (!response.data || response.data.length === 0) {
      throw new Error('No messages found in the channel.');
    }

    const lastMessage = response.data[0];
    const embed = lastMessage.embeds[0];

    if (!embed || !embed.description) {
      throw new Error('The last message in the channel does not contain an embed with a description.');
    }

    const statsString = embed.description;
    const statsJsonString = statsString.slice(8, -3);
    const stats = JSON.parse(statsJsonString);

    let statValue = stats[statName];  // Get the value of the requested stat

    // If the requested stat is "Uptime", convert it to a human-readable format
    if (statName === "Uptime") {
      statValue = msToTime(statValue);
    }

    // Return a Shields.io-compatible response
    res.status(200).json({
      schemaVersion: 1,
      label: statName,
      message: String(statValue)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
