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
  // error.map((error) => console.log(error));

  if (error != 0) {
    errorDisplay = (
      <div>
        <h2 className="validation--errors--label">Validation errors</h2>
        <div className="validation-errors">
          <ul>
            {error.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return errorDisplay;
}
