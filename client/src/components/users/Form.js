import React from "react";

export default (props) => {
  const { cancel, error, submit, elements } = props;

  function handleSubmit(event) {
    event.preventDefault();
    submit();
  }

  function handleCancel(event) {
    event.preventDefault();
    cancel();
  }

  return (
    <div>
      <ErrorsDisplay error={error} />
      <form onSubmit={handleSubmit}>
        {elements()}
        <div className="pad-bottom">
          <button className="button" type="submit">
            Sign Up
          </button>
          <button className="button button-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

function ErrorsDisplay({ error }) {
  let errorDisplay = null;

  if (error != 0) {
    errorDisplay = (
      <div>
        <div className="validation-errors">
          <ul>{error.errors.Error}</ul>
        </div>
      </div>
    );
  }

  return errorDisplay;
}
