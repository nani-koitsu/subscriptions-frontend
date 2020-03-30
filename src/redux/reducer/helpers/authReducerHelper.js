import jwtDecode from "jwt-decode";

const stateHelperFunc = (oldState, newState) => {
  return {
    ...oldState,
    ...newState
  };
};

export const jwtDecodeTokenAndSetUser = (oldState, token) => {
  console.log(`Token : ${token}`);
  let decodedToken = jwtDecode(token);
  console.log("DecodedToken from authReducerHelper :", decodedToken);
  let user = {};

  if (decodedToken.linkedinID) {
    user = decodedToken;
  } else {
    user = {
      email: decodedToken.email,
      id: decodedToken.id
    };
  }

  return stateHelperFunc(oldState, {
    isAuthenticated: true,
    user: user
  });
};
