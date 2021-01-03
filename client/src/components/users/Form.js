import React from "react";

export default (props) => {
  const { cancel, errors, submit, submitButtonText, elements } = props;

  //The submit function from the signUp component is called
  function handleSubmit(event) {
    event.preventDefault();
    submit();
  }

  //The cancel function from the signUp component is called
  function handleCancel(event) {
    event.preventDefault();
    cancel();
  }

  return (
    <div>
      <ErrorsDisplay errors={errors} />
      <form onSubmit={handleSubmit}>
        {elements()}
        <div className="pad-bottom">
          <button className="button" type="submit">
            {submitButtonText}
          </button>
          <button className="button button-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

//ErrorDisplay function checks if there are any errors with the inputs and then render the errors if they exist
function ErrorsDisplay({ errors }) {
  let errorsDisplay = null;

  if (errors.length) {
    errorsDisplay = (
      <div>
        <h2 className="validation--errors--label">
          Error Creating Your Account:
        </h2>
        <div className="validation-errors">
          <ul>
            {errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return errorsDisplay;
}
