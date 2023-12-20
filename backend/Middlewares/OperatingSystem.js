// getUserAgentInfo.js
const useragent = require('express-useragent');

function getUserAgentInfo(req) {
  const os = req.useragent.os || 'Unknown OS';
  return `Operating System: ${os}`;
}

module.exports = {getUserAgentInfo};
