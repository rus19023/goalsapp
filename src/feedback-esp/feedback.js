//get the form by its id
const form = document.getElementById("contact-form");
const formEvent = form.addEventListener("submit", (event) => {
  event.preventDefault();
  let mail = new FormData(form);
  sendMail(mail);
})

const sendMail = (mail) => {
    //1.
    fetch("https://nodemailer-vic-lo.herokuapp.com/send", {
      method: "post", 
      body: mail,  
    }).then((response) => {
      return response.json();
    });
  };