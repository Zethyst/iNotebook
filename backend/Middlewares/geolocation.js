// geolocation.js
const axios = require('axios');

async function getGeolocation(ip) {
  try {
    const response = await axios.get(`http://api.ipstack.com/${ip}?access_key=a2cbee53961742db77acee54e7bf6827`);
    // const response = await axios.get(`https://ipinfo.io/${ip}?token=bb3ca894f04f1a`);
    return response.data;
  } catch (error) {
    console.error('Error fetching geolocation:', error.message);
    return null;
  }
}

module.exports = { getGeolocation };
