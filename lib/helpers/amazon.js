import {getAmazonCallBackUrl} from './helpers'

export const LinkAccount = () => {
    var params = ""
    const options = {
      scope: "payments::conduct_silentpay",
      response_type: "code",
      state: params,
      popup: true
    }
    window.amazon.Login.authorize(
      options,
      getAmazonCallBackUrl()
    )
}

export const scriptLoaded = () => {

}

export const _loadAmazonScript = () => {
  window.onAmazonLoginReady = function () {
    window.amazon.Login.setClientId(
      "amzn1.application-oa2-client.74bc2e89a903431980d83f5244522d3c"
    )
  }

  const script = document.createElement("script");
  script.src = "https://assets.loginwithamazon.com/sdk/na/login1.js";
  script.async = true;
  script.onload = () => scriptLoaded();
  document.body.appendChild(script);
}