// const logIn = async (email, password) => {
//   console.log(email, password);
//   try {
//     console.log('inside try')

//     // const res = await fetch({

//     //   url: "http://127.0.0.1:8080/api/v1/fyp/logIn",
//     //   data: {
//     //     email,
//     //     password,
//     //   },
//     // });
//     const res =  await fetch("http://localhost:8080/api/v1/fyp/logIn",{
//       method:"POST",
//       body:JSON.stringify({
//             email,
//         password,
//       }),
//       headers:{
//         "Content-type":"application/json"
//       }
//     })
//     console.log(res);
//   } catch (err) {
//     console.log('an error occured',err)

//     // console.log(err.response.data);
//   }
// };

const logIn = async (email, password) => {
  console.log(email, password);
  try {
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:8080/api/v1/fyp/logIn",
      data: {
        email,
        password,
      },
    });
    console.log('Response from Axios',res);
  } catch (err) {
    console.log('Error from axios', err);
  }
};
document.querySelector(".logInForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  logIn(email, password);
});
