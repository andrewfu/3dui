import { connect } from "react-redux";
import Scene3 from "./scene3";

const mapStateToProps = (state) => {
  return {
    lists: state.site.lists,
    listsfetching: state.site.listsfetching,
    listsfetched: state.site.listsfetched,
  };
};

export default connect(mapStateToProps)(Scene3);
