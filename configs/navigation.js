const authPath = "/auth";

const navigation = {
  index: "/",
  auth: {
    signIn: `${authPath}/signin`,
    signUp: `${authPath}/signup`,
    resetPassword: `${authPath}/reset-password`,
    logout: `${authPath}/logout`,
  },
};

// console.log(`${navigation.auth.signUp.path}`);

module.exports = {
  navigation,
  authPath,
};
