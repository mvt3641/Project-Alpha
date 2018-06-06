// Initialize Firebase
var config = {
    apiKey: "AIzaSyBh47eYdLXMxwMP-IXLMj2WvC4Bl3W7xk0",
    authDomain: "projectadmin-16c22.firebaseapp.com",
    databaseURL: "https://projectadmin-16c22.firebaseio.com",
    projectId: "projectadmin-16c22",
    storageBucket: "projectadmin-16c22.appspot.com",
    messagingSenderId: "654965337739"
  };
firebase.initializeApp(config);


  //Getting the Email/Password and Signin button from the the inputs above.
  let signIn = document.getElementById('login');
  //Listening on thesignIn button click.
  signIn.addEventListener('click', (ev) => {
      let email = document.getElementById('exampleInputEmail3').value;
      let password = document.getElementById('exampleInputPassword3').value;
      ev.preventDefault();
      console.log(email, password);
      firebase.auth().signInWithEmailAndPassword(email, password)
          .then(user => {
              alert('you succeeded')
              //Handling the successful authentication.
              window.location = "site.html";
          }).catch(function (error) {
          //Handling the error showcasing. });
              alert('you failed. try again')
      }, false);
  });

  let phoneSignIn = document.getElementById('login2');
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('login2', {
      'size': 'invisible',
      'callback': function(response) {
          console.log("callback fired")
      }
  });

  phoneSignIn.addEventListener('click', (ev) => {
      console.log("phoneSignIn fired")
      ev.preventDefault();
      var appVerifier = window.recaptchaVerifier;
      let phoneNumber = document.getElementById('phonenumber').value;
      firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
          .then(function (confirmationResult) {
              resetRecaptcha();
              // SMS sent. Prompt user to type the code from the message, then sign the
              // user in with confirmationResult.confirm(code).
              var code = window.prompt('Enter the verification code you received by SMS');
              if (code) {
                  confirmationResult.confirm(code).then(function () {
                      console.log("success! user is logged in")
                      window.close();
                  }).catch(function (error) {
                      // User couldn't sign in (bad verification code?)
                      console.error('Error while checking the verification code', error);
                      window.alert('Error while checking the verification code:\n\n'
                          + error.code + '\n\n' + error.message)
                  });
              }
          }).catch(function (error) {
          // Error; SMS not sent
          // ...
      })
  });

  function resetRecaptcha() {
      return window.recaptchaVerifier.render().then(function(widgetId) {
          grecaptcha.reset(widgetId);
      });
  }

  /*
          let facebookLogin = document.getElementById('fcbLogin');
          facebookLogin.addEventListener('click', () => {
              console.log("will connect using facebook");
              // 1. Get a FacebookAuthProvider instance.
              let facebookProvider = new firebase.auth.FacebookAuthProvider();

              //2. Add some permissions & scopes (optional)
              facebookProvider.addScope('public_profile');

              //3. Make the call
              firebase.auth().signInWithPopup(facebookProvider).then(function (result) {
                  var user = result.user;
                  console.log(result);

              }).catch(function (error) {
                  //TODO:  Handle Errors here.
              });
          }, false);

          let twitterLogin = document.getElementById('twitterLogin');
          twitterLogin.addEventListener('click', () => {
              //1. Get a TwitterAuthProvider instance.
              var twitterProvider = new firebase.auth.TwitterAuthProvider();

              firebase.auth().signInWithPopup(twitterProvider).then(function (result) {
                  console.log(result);
                  var user = result.profile;
              }).catch(function (error) {
                  //TODO:  Handle Errors here.
              });
          });

          let googleLogin = document.getElementById('googleLogin');
          googleLogin.addEventListener('click', () => {
              //1. Get a TwitterAuthProvider instance.
              var googleProvider = new firebase.auth.GoogleAuthProvider();

              firebase.auth().signInWithPopup(googleProvider).then(function (result) {
                  console.log(result);
                  var user = result.user;
              }).catch(function (error) {
                  //TODO:  Handle Errors here.
                  console.log(error);
              });
          });
          */
