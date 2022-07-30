const test = async (email, password) => {
  console.log(email, password);
  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:8080/api/v1/fyp/logIn",
      data: {
        email,
        password,
      },
    });
    if (res.data.status === "success") {
      alert("You now logged in!");
      window.setInterval(() => {
        location.assign("dashboard");
      }, 1000);
    }
    console.log("Response from Axios", res);
  } catch (err) {
    console.log("Error from Axios", err);
  }
};

document.querySelector(".logInForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  test(email, password);
});
