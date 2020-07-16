import { sp } from "@pnp/sp";
import * as React from "react";

import config, { siteUrl } from "../../config/config";
import { PnPFetchClient } from "./pnp";
import { UserAgentApplication } from "msal";

export const msalInstance = new UserAgentApplication({ auth: config });

export default function withAuth(WrappedComponent) {
  return class Auth extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authenticated: false,
        renewIframe: false,
        hasError: false,
        errorMessage: null,
      };
    }

    componentWillMount() {
      msalInstance.handleRedirectCallback(
        () => {
          this.setState({
            authenticated: true,
          });
          this.InitPnP();
        },
        (authErr, accountState) => {
          console.log(authErr);
          this.setState({
            hasError: true,
            errorMessage: authErr.errorMessage,
          });
        }
      );

      if (msalInstance.isCallback(window.location.hash)) {
        this.setState({
          renewIframe: true,
        });
        return;
      }

      if (!msalInstance.getAccount()) {
        msalInstance.loginRedirect({});
        return;
      } else {
        this.setState({ authenticated: true });
        this.InitPnP();
      }
    }

    render() {
      if (this.state.renewIframe) {
        return <div>hidden renew iframe - not visible</div>;
      }

      if (this.state.authenticated) {
        return <WrappedComponent {...this.props} />;
      }

      if (this.state.hasError) {
        return <div>{this.state.errorMessage}</div>;
      }

      return <div>Login in progress...</div>;
    }

    InitPnP() {
      console.log(`init pnp`);
      const fetchClientFactory = () => new PnPFetchClient(msalInstance);
      sp.setup({ sp: { fetchClientFactory, baseUrl: siteUrl } });
    }
  };
}
