// Open and close Menu
function openMenu() {
  document.getElementById('menu-overlay-wrapper').style.display = 'block';
  document.getElementById('menu-icon').style.display = 'none';
}

function closeMenu() {
  document.getElementById('menu-overlay-wrapper').style.display = 'none';
  document.getElementById('menu-icon').style.display = 'block';
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
    document.getElementById('go-back-button-wrapper').style.display = 'block';
  }, 7000);
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
