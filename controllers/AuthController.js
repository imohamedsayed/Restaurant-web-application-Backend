const handleErrors = (err) => {
  let errors = { name: "", email: "", password: "" };

  // unique error code
  if (err.code == 11000) {
    errors.email = "This email is already exists";
  }

  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  if (err.message.includes("Incorrect email")) {
    errors.email = "This email is not registered";
  }
  if (err.message.includes("Incorrect Password")) {
    errors.password = "Password is incorrect";
  }

  return errors;
};

const signup = (req, res) => {
    
};

module.exports = {
  signup,
};
