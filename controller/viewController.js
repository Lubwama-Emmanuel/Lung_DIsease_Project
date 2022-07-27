exports.logIn = (req, res) => {
  res.status(201).render("logIn", {
    title: "Log Into Your Account",
  });
};
exports.signUp = (req, res) => {
  res.status(201).render("signUp", {
    title: "Sign Up Here",
  });
};
exports.home = (req, res) => {
  res.render("/", {
    title: "Home",
  });
};
