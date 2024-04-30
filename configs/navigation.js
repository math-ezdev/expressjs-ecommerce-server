const authPath = "/auth";
const userPath = "/users";

const navigation = {
  index: "/",
  auth: {
    signIn: `${authPath}/signin`,
    signUp: `${authPath}/signup`,
    resetPassword: `${authPath}/reset-password`,
    logout: `${authPath}/logout`,
  },
  user: {
    profile: `${userPath}/profile`,
    changePassword: `${userPath}/change-password`
  },
};

// console.log(`${navigation.auth.signUp.path}`);

module.exports = {
  navigation,
};
