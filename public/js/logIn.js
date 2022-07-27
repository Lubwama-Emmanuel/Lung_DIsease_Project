
const logIn = async (email, password) => {
  console.log(email, password);
  try {
    const res = await axios({
      method: 'POST',
      url: "http://127.0.0.1:8080/api/v1/fyp/logIn",
      data: {
        email,
        password
      }
    })
    // const res = await fetch("http://127.0.0.1:8080/api/v1/fyp/logIn", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     email,
    //     password,
    //   }),
    // });
    console.log('Am inside the try')
    console.log("Response from Axios ", res);
  } catch (err) {
    console.log("An Error from Axios ", err);
  }
};
document.querySelector(".logInForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  logIn(email, password);
});
