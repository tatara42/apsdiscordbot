const axios = require("axios");
const apiKey = process.env["gelbooru_api_key"];
const userId = process.env["gelbooru_user_id"];

if (!apiKey) {
  console.log("Missing gelbooru Api Key!");
  return;
}
if (!userId) {
  console.log("Missing gelbooru User Id!");
  return;
}
async function getApiRequest(route) {
  const option = {
    baseURL: "https://gelbooru.com",
    url: `index.php?page=dapi&s=${route}&api_key=${apiKey}&user_id=${userId}&json=1`,
  };

  // console.log(option.baseURL + option.url);
  try {
    const req = await axios.request(option);
    return await req;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getPost: async function(args) {
    var tags = ``;
    var route = ``;
    if (typeof args === "string") {
      tags = args;
      route = `post&q=index&limit=1&tags=${tags}`;
    } else if (typeof args === "object") {
      const { limit = 1, tags = "" } = args;
      route = `post&q=index&limit=${limit}&tags=${tags}`;
    } else console.log("Invalid argument type!");
    return await getApiRequest(route);
  },

  getTag: async function(name = "", limit = 1) {
    const route = `tag&q=index&limit=${limit}&name=${name}`;
    return await getApiRequest(route);
  },
};