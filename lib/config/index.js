const stage = {
  apiGateway: {
    socketPay: "wss://stageservice.oyeti.com/cable",
    socketCall: "wss://stageweb.oyeti.com/cable",
  },
  button: {
    enableTestPayment: true,
    enableApayPayment: true,
  },
  settings: {
    phoneNumber: "+918431244396",
  },
};

const development = {
  apiGateway: {
    socketPay: "wss://stageservice.oyeti.com/cable",
    socketCall: "wss://stageweb.oyeti.com/cable",
  },
  button: {
    enableTestPayment: false,
    enableApayPayment: false,
  },
  settings: {
    phoneNumber: "+918431244396",
  },
};

const prod = {
  apiGateway: {
    socketPay: "wss://service.oyeti.com/cable",
    socketCall: "wss://web.oyeti.com/cable",
  },
  button: {
    enableTestPayment: false,
    enableApayPayment: true,
  },
  settings: {
    phoneNumber: "+916366200200",
  },
};

// Default to dev if not set

//const config = process.env.NODE_ENV == "production" ? prod : stage;
// REACT_APP_BUILD_ENV is set in .env
const config = process.env.NODE_ENV === "production" ? prod : stage;

export default {
  ...config,
};
