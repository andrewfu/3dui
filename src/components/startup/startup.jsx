import React from "react";
import WithSpAuth from "../with-sp-auth";
import { msalInstance } from "../with-sp-auth/with-sp-auth";
import Scene3 from "../scene3";

export default WithSpAuth(({ GetLists, listsfetching, listsfetched }) => {
  if (!listsfetching && !listsfetched) GetLists();
  if (listsfetched) {
    return <Scene3 />;
  }
  return <div>Loading...</div>;
});
