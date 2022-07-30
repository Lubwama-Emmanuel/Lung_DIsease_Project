const signUp = async (
  firstName,
  lastName,
  email,
  password,
  passwordConfirm
) => {
  console.log(firstName, lastName, email, password, passwordConfirm);
  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:8080/api/v1/fyp/signUp",
      data: {
        firstName,
        lastName,
        email,
        password,
        passwordConfirm,
      },
    })
    if(res.data.status === 'success'){
      alert('You now logged in!')
      window.setInterval(() => {
        location.assign('dashboard')
      }, 1000)
    }
    console.log("Response from Axios", res);
  } catch (err) {
    console.log("Error from Axios", err);
  }
};

document.querySelector(".signUpForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const passwordConfirm = document.getElementById("passwordConfirm").value;
  signUp(firstName, lastName, email, password, passwordConfirm);
});
