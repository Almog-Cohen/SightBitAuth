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

export function validateRoomName(roomName) {
  const errors = {};

  const validateUserName3Chars = /^[a-zA-Z]{3,}\d*$/;
  if (!roomName) {
    errors.roomName = "Required";
  } else if (!validateUserName3Chars.test(roomName)) {
    errors.roomName = "RoomName invaild ";
  }

  return errors;
}

export function validatePassword(password) {
  const errors = {};

  const containsOneCapitalLetterAndNumbers = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  // const containsOneCapitalLetterAndNumbers = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/i;

  if (!password) {
    errors.password = "Required";
  } else if (!containsOneCapitalLetterAndNumbers.test(password)) {
    errors.password =
      "Password  must  include one lowercase character, one uppercase character, a number, a special character and length 8.";
  }

  return errors;
}
