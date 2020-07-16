import * as Actions from "../utl/actions";
import { Fetch } from "../utl/common";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";

export const GetSite = () =>
  Fetch({
    type: Actions.FETCH_SITE,
    ServiceAction: async () => {
      const site = await sp.web.get();
      console.log(site.Title);
      return site;
    },
  });
