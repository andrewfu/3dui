import { connect } from "react-redux";
import Startup from "./startup";
import { bindActionCreators } from "redux";
import { GetSite } from "../../actions/site";

const mapDispatchToProps = (dispatch) => bindActionCreators({ GetSite }, dispatch);

const mapStateToProps = (state) => {
  return {
    siteTitle: state.site.title,
    sitefetching: state.site.sitefetching,
    sitefetched: state.site.sitefetched,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Startup);
