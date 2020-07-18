import * as Actions from "../utl/actions";
import { Fetch } from "../utl/common";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";

export const GetLists = () =>
  Fetch({
    type: Actions.FETCH_LISTS,
    ServiceAction: async () => await sp.web.lists.get(),
  });

export const GetSite = () =>
  Fetch({
    type: Actions.FETCH_SITE,
    ServiceAction: async () => await sp.web.get(),
  });
