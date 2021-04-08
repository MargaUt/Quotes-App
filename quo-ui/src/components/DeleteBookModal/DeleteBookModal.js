import './DeleteBookModal.css';
import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

function DeleteBookModal(props) {
  return (
    <div
      className="modal fade"
      id={props.id}
      tabIndex="-1"
      aria-labelledby={props.id + "-label"}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={props.id + "-label"}>
              Attention!
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true"></span>
            </button>
          </div>
          <div className="modal-body">{props.children}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button type="submit" className="btn btn-primary" onClick={props.handleDelete} data-dismiss="modal">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

DeleteBookModal.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

export default withRouter(DeleteBookModal);
