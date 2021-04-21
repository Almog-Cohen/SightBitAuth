// Function for validating the email is in correct form.
export function validateEmail(email) {
  const errors = {};
  const validEmailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  if (!email) {
    errors.email = "Required";
  } else if (!validEmailRegex.test(email)) {
    errors.email = "Invalid email address";
  }

  return errors;
}
// Function for validating the username is in correct form.
export function validateUserName(username) {
  const errors = {};

  const validateUserName3Chars = /^[a-zA-Z]{3,}\d*$/;
  if (!username) {
    errors.username = "Required";
  } else if (!validateUserName3Chars.test(username)) {
    errors.username = "Username invaild ";
  }

  return errors;
}
// Function for validating the password is in correct form.
export function validatePassword(password) {
  const errors = {};

  const containsOneCapitalLetterAndNumbers = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  if (!password) {
    errors.password = "Required";
  } else if (!containsOneCapitalLetterAndNumbers.test(password)) {
    errors.password =
      "Password  must  include one lowercase character, one uppercase character, a number, a special character and length 8.";
  }

  return errors;
}
