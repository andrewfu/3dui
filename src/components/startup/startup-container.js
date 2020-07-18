import { connect } from "react-redux";
import Startup from "./startup";
import { bindActionCreators } from "redux";
import { GetLists } from "../../actions/site";

const mapDispatchToProps = (dispatch) => bindActionCreators({ GetLists }, dispatch);

const mapStateToProps = (state) => {
  return {
    listsfetching: state.site.listsfetching,
    listsfetched: state.site.listsfetched,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Startup);
