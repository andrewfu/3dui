import React from "react";
import WithSpAuth from "../with-sp-auth";

import { msalInstance } from "../with-sp-auth/with-sp-auth";

export default WithSpAuth(({ siteTitle, GetSite, sitefetching, sitefetched }) => {
  if (!sitefetching && !sitefetched) GetSite();
  const user = ""; //msalInstance.getAccount().name;
  if (sitefetched) return <div>{siteTitle}</div>;
  return <div>Loading...</div>;
});
