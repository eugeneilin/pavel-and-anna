// Open and close Menu
function openMenu() {
  document.getElementById('menu-overlay-wrapper').style.display = 'block';
  document.getElementById('menu-icon').style.display = 'none';
  document.getElementById('exit-menu').style.display = 'block';
}

function closeMenu() {
  document.getElementById('menu-overlay-wrapper').style.display = 'none';
  document.getElementById('menu-icon').style.display = 'block';
  document.getElementById('exit-menu').style.display = 'none';
}

// Set the date we're counting down to
let countDownDate = new Date('Oct 12, 2019 10:00:00').getTime();

// Update the count down every 1 second
let x = setInterval(function () {

  let now = new Date().getTime();

  let distance = countDownDate - now;

  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById('days').innerHTML = days;
  document.getElementById('hours').innerHTML = hours;
  document.getElementById('minutes').innerHTML = minutes;
  document.getElementById('seconds').innerHTML = seconds;

  // If the count down is over, write some text
  // if (distance < 0) {
  //   clearInterval(x);
  //   document.getElementById("rsvp-count-down").innerHTML = "EXPIRED";
  // }
}, 1000);

// 'Moments' controls
function openMoments() {
  document.getElementById('header').style.display = 'none';
  document.getElementById('schedule').style.display = 'none';
  document.getElementById('rsvp').style.display = 'none';
  document.getElementById('registry').style.display = 'none';
  document.getElementById('footer').style.display = 'none';
  document.getElementById('moments').style.display = 'block';
}

function closeMoments() {
  document.getElementById('header').style.display = 'block';
  document.getElementById('schedule').style.display = 'block';
  document.getElementById('rsvp').style.display = 'block';
  document.getElementById('registry').style.display = 'block';
  document.getElementById('footer').style.display = 'block';
  document.getElementById('moments').style.display = 'none';
}

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMjYbR2lBr0R50c8Xl7O_MngivRxATJSY",
  authDomain: "pavel-and-anna.firebaseapp.com",
  databaseURL: "https://pavel-and-anna.firebaseio.com",
  projectId: "pavel-and-anna",
  storageBucket: "gs://pavel-and-anna.appspot.com",
  messagingSenderId: "1057009153151",
  appId: "1:1057009153151:web:f56253596f9f0dfc"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference messages collection
const messagesRef = firebase.database().ref('messages');

// Listen for form submit
document.getElementById('rsvp-form').addEventListener('submit', submitForm);

// Submit form
function submitForm(e) {
  e.preventDefault();

  // Get values
  const name = getInputVal('name');
  const otherGuestsNames = getInputVal('other-guests-names');
  const otherGuestsNumber = getInputVal('other-guests-number');
  const message = getInputVal('message');
  const selected = document.querySelector('input[name = "reply"]:checked').value;

  // Save message
  saveMessage(name, otherGuestsNames, otherGuestsNumber, message, selected);

  // Show alert
  document.getElementById('thank-you-wrapper').style.display = 'block';
  document.getElementById('submit-button-wrapper').style.display = 'none';

  // Show Go to Back button after 7 seconds
  setTimeout(function () {
    document.getElementById('thank-you-wrapper').style.display = 'none';
    document.getElementById('rsvp-form').reset();
    document.getElementById('submit-button-wrapper').style.display = 'none';
    document.getElementById('rsvp-form').style.opacity = '.4';
    document.getElementById('go-back-button-wrapper').style.display = 'block';
  }, 4000);
}

// Function to get form values
function getInputVal(id) {
  return document.getElementById(id).value;
}

// Save message to Firebase
function saveMessage(name, otherGuestsNames, otherGuestsNumber, message, selected) {
  const newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: name,
    otherGuestsNames: otherGuestsNames,
    otherGuestsNumber: otherGuestsNumber,
    message: message,
    selected: selected
  });
}
