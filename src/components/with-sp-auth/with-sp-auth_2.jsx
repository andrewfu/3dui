import React, { useState } from "react";
import { UserAgentApplication } from "msal";
import config from "../../config/config";
import { siteUrl } from "../../config/config";
import { sp } from "@pnp/sp";
import { PnPFetchClient } from "./pnp";

const msalInstance = new UserAgentApplication({
  auth: config,
});

const InitPnP = () => {
  const fetchClientFactory = () => new PnPFetchClient(msalInstance);
  sp.setup({ sp: { fetchClientFactory, baseUrl: siteUrl } });
};

const WithSpAuth = (Component) => {
  const WrappedComponent = (props) => {
    const [authenticated, SetAuth] = useState(false);
    /*const [renewIFrame, SetIFrame] = useState(false);
    const [hasError, SetHasError] = useState(false);
    const [errorMessage, SetErrorMessage] = useState(null);*/
    const [isRendered, SetIsRendered] = useState(false);
    if (!isRendered) {
      msalInstance.handleRedirectCallback(
        () => {
          // on success
          SetAuth(true);
          SetIsRendered(true);
          InitPnP();
          return <Component {...props} />;
        },
        (authErr, accountState) => console.log(authErr)
      );

      if (msalInstance.isCallback(window.location.hash)) {
        return;
      }

      if (!msalInstance.getAccount()) {
        msalInstance.loginRedirect({});
        return;
      } else {
        // logged in, set authenticated state and init pnpjs library
        SetAuth(true);
        SetIsRendered(true);
        return <Component {...props} />;
        //this.initPnPjs();
      }
    }
    return null;
  };
  return WrappedComponent;
};

export default WithSpAuth;
