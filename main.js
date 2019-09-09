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
  const otherGuests = getInputVal('other-guests');
  const otherGuestsNumber = getInputVal('other-guests-number');
  const message = getInputVal('message');
  const selected = document.querySelector('input[name = "reply"]:checked').value;

  // Save message
  saveMessage(name, otherGuests, otherGuestsNumber, message, selected);

  // Show alert
  document.querySelector('.alert').style.display = 'block';
  document.getElementById('submit').style.display = 'none';

  // Hide alert in 10 seconds
  setTimeout(function () {
    document.querySelector('.alert').style.display = 'none';
    document.getElementById('submit').style.display = 'block';
  }, 7000);

  // Reset form
  setTimeout(function () {
    document.getElementById('rsvp-form').reset();
  }, 7000);
}

// Function to get form values
function getInputVal(id) {
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, otherGuests, otherGuestsNumber, message, selected) {
  const newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: name,
    otherGuests: otherGuests,
    otherGuestsNumber: otherGuestsNumber,
    message: message,
    selected: selected
  });
}
