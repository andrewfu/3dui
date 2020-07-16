import { MsalAuthProvider, LoginType } from "react-aad-msal";
import { Logger, LogLevel } from "msal";

const config = {
  auth: {
    authority: "https://login.microsoftonline.com/common",
    clientId: "993dcb6f-07c4-41dc-b789-0185c110408e",
    postLogoutRedirectUri: window.location.origin,
    redirectUri: window.location.origin,
    validateAuthority: true,
  },
  system: {
    logger: new Logger(
      (logLevel, message, containsPii) => {
        console.log("[MSAL]", message);
      },
      {
        level: LogLevel.Verbose,
        piiLoggingEnabled: false,
      }
    ),
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true,
  },
};

const authenticationParameters = { scopes: ["openid"] };

const options = {
  loginType: LoginType.Popup,
  tokenRefreshUri: window.location.origin + "/auth.html",
};

export default new MsalAuthProvider(config, authenticationParameters, options);
