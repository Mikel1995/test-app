export const revertValueAsync = (setter, seconds) => {
  setInterval(() => {
    setter(false);
  }, seconds * 1000);
};

export const isValidFormValid = (user, pageType, password, retypedPassword) => {
  const { first_name, last_name, email, username } = user;

  if (
    first_name === undefined ||
    first_name === "" ||
    (last_name === undefined || last_name === "") ||
    (email === undefined || email === "") ||
    (username === undefined || username === "") ||
    (first_name === undefined || first_name === "") ||
    (first_name === undefined || first_name === "") ||
    (first_name === undefined || first_name === "")
  ) {
    return false;
  }

  if (pageType === "Add") {
    if (password.length < 4 || password !== retypedPassword) {
      return false;
    }
  }

  return true;
};

export const isUserValid = user => {
  if (user === null || localStorage.getItem("token") === null) {
    return false;
  }
  return true;
};

export const isInputDisabled = (pageType, loggedUser, userId) => {
  if (loggedUser?.userLevel === "User" && loggedUser?.id !== userId) {
    return true;
  }
  return false;
};

export const getPageType = router => {
  return router.path === "/add" ? "Add" : "Update";
};
