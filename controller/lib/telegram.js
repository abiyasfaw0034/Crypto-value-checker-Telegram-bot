const { axiosInstance } = require("./axios");

function sendMessage(messageObj, messageText) {
  return axiosInstance.get("sendMessage", {
    chat_id: messageObj.chat.id,
    text: messageText,
  });
}

async function handleMessage(messageObj) {
  const messageText = messageObj.text.toLowerCase() || "";

  if (messageText.charAt(0) === "/") {
    const command = messageText.substr(1);
    switch (command) {
      case "start":
        return sendMessage(
          messageObj,
          "Enter a cryptocurrency (id, symbol, or name)"
        );

      default:
        return sendMessage(
          messageObj,
          "i cant understand ur instrucitons, either /start or give crypto name"
        );
    }
  } else {
    const message = await getCryptoPrice(messageText, "usd");
    console.log(message);
    return sendMessage(messageObj, message);
  }
}
module.exports = { handleMessage };

async function getCryptoPrice(crypto, currency) {
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=${currency}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const string = `The current price of ${crypto} in ${currency}: ${data[crypto][currency]}`;
    return string;
  } catch (error) {
    return `Error fetching the crypto price:, ${error}`;
  }
}
