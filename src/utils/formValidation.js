export const validate = {
  username: (input) => {
    if (input.trim() !== "") {
      return true;
    }

    return false;
  },
  email: (input) => {
    if (input.trim().includes("@")) {
      return true;
    }

    return false;
  },
  password: (input) => {
    if (input.trim().length > 6) {
      return true;
    }
    return false;
  },
};
