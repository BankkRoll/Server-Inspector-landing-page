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
    // console.log('Starting to fetch the stats...');
    // Use process.env.CHANNEL_ID to access the channel ID from the environment variables
    const response = await axios.get(`https://discord.com/api/channels/${process.env.CHANNEL_ID}/messages`, {
      headers: {
        'Authorization': `Bot ${process.env.TOKEN}`
      },
      params: {
        limit: 1
      }
    });

    // console.log('Response received from Discord API:', response.data);

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

    // Convert uptime to a human-readable format
    stats.Uptime = msToTime(stats.Uptime);

    // console.log('Parsed stats:', stats);

    res.status(200).json(stats);
  } catch (error) {
    // console.error('Error in fetch-stats:', error);
    res.status(500).json({ error: error.message });
  }
}
