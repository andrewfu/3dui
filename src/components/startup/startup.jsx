import React from "react";
import WithSpAuth from "../with-sp-auth";
import { msalInstance } from "../with-sp-auth/with-sp-auth";
import Scene3 from "../scene3";
import { useState } from "react";
import Speech from "../speech";

export default WithSpAuth(({ GetLists, listsfetching, listsfetched }) => {
  const [searchText, SetSearchText] = useState("");
  if (!listsfetching && !listsfetched) GetLists();
  if (listsfetched) {
    return (
      <React.Fragment>
        <Speech GetCommand={(command) => SetSearchText(command)} />
        <Scene3 objectToSearch={searchText} />
      </React.Fragment>
    );
  }
  return <div>Loading...</div>;
});
