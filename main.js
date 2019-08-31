// Shrink "navigation" when user scrolls down # pixels from the top of the document
function shrinkNavbar() {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    document.getElementById('navigation').style.top = '4%';
    document.getElementById('navigation').style.fontSize = '1em';
    document.getElementById('logo').style.top = '1%';
  } else {
    document.getElementById('navigation').style.top = '';
    document.getElementById('navigation').style.fontSize = '';
    document.getElementById('logo').style.top = '';
  }
}

window.onscroll = function () {
  shrinkNavbar()
};

// open main when arrow down btns or nav links are clicked
function openMain() {
  document.getElementById('main').style.display = 'block';
}

// close main when arrow up or logo is clicked
function closeMain() {
  setTimeout(
    function () {
      document.getElementById('main').style.display = 'none';
    }, 800);
}

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxTapWuLADB3EsH8YR3D5IT86muIYjoBU",
  authDomain: "wedding-website-bcf1f.firebaseapp.com",
  databaseURL: "https://wedding-website-bcf1f.firebaseio.com",
  projectId: "wedding-website-bcf1f",
  storageBucket: "gs://wedding-website-bcf1f.appspot.com",
  messagingSenderId: "694498651753",
  appId: "1:694498651753:web:b7de133f80c5d7f6"
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
