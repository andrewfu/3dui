import React from "react";
import WithSpAuth from "../with-sp-auth";
import { msalInstance } from "../with-sp-auth/with-sp-auth";
import Scene3 from "../scene3";

export default WithSpAuth(({ siteTitle, GetSite, sitefetching, sitefetched }) => {
  if (!sitefetching && !sitefetched) GetSite();
  if (sitefetched) return <Scene3 />;
  return <div>Loading...</div>;
});
