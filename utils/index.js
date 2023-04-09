// ? Import package
const os = require("os");

//? Function
/**
 * @description Get the ip of the server
 * @returns {String} ip address
 */
 const getIp = function() {
  const netInterfaces = os.networkInterfaces();
  const result = [];
  for (let id in netInterfaces) {
    const netFace = netInterfaces[id];
    for (const element of netFace) {
      const ip = element;
      if (ip.internal === false && ip.family === 'IPv4') {
        result.push(ip.address);
      }
    }
  }
  // log info result
  if (result.length === 0) {
    console.info("❌ NO IP ADDRESS FOUND ❌");
  }
  if (result.length > 1) {
    console.info("❗❗ MORE THAN ONE IP ADDRESS FOUND ❗❗ ", result);
  }
  return result[0];
}

//? Export
export default getIp;
