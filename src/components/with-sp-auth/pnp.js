import { BearerTokenFetchClient, isUrlAbsolute } from "@pnp/common";

export class PnPFetchClient extends BearerTokenFetchClient {
  constructor(authContext) {
    super(null);
    this.authContext = authContext;
  }

  async fetch(url, options = {}) {
    if (!isUrlAbsolute(url)) {
      throw new Error("You must supply absolute urls to PnPFetchClient.fetch.");
    }

    const token = await this.getToken(this.getResource(url));
    this.token = token;
    return super.fetch(url, options);
  }

  async getToken(resource) {
    const request = {};

    if (resource.indexOf("sharepoint") !== -1) {
      request.scopes = [`${resource}/AllSites.Read`];
    } else if (resource.indexOf("graph") !== -1) {
      request.scopes = [
        `${resource}/Group.Read.All`,
        `${resource}/User.Read`,
        `${resource}/profile`,
      ];
    }

    try {
      const response = await this.authContext.acquireTokenSilent(request);

      return response.accessToken;
    } catch (error) {
      if (this.requiresInteraction(error.errorCode)) {
        this.authContext.acquireTokenRedirect(request);
      } else {
        throw error;
      }
    }
  }

  requiresInteraction(errorCode) {
    if (!errorCode || !errorCode.length) {
      return false;
    }
    return (
      errorCode === "consent_required" ||
      errorCode === "interaction_required" ||
      errorCode === "login_required"
    );
  }

  getResource(url) {
    const parser = document.createElement("a");
    parser.href = url;
    return `${parser.protocol}//${parser.hostname}`;
  }
}
