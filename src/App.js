import React from "react";
import { connect } from "react-redux";
import { toggleStatus } from "./functionals/common/commonAction";
function App(props) {
  const { toggleStatus, status } = props;
  return (
    <div className="App">
      <button onClick={toggleStatus}>Toogle status</button>
      {status && <p>Toogle done</p>}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    status: state.commonReducer.status,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    toggleStatus: () => dispatch(toggleStatus()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
