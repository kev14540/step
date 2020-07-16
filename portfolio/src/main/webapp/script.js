// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

//adds event listener for when page loads
window.addEventListener('load', (event) => {
    console.log('The page has fully loaded');
    fetchUser();
    addBlob();
});

/**
 * Adds a random greeting to the page.
 */
function addRandomGreeting() {
  const greetings =
      ['Hello world!', '¡Hola Mundo!', '你好，世界！', 'Bonjour le monde!'];
  
  const quotes = 
    ["They may take our lives, but they\'ll never take our freedom", 
     "Chewie, we\'re home", "Just when I thought I was out, they pull me back in",
     "Im having an old friend for dinner this evening"
    ];
  // Pick a random greeting.
  const greeting = quotes[Math.floor(Math.random() * greetings.length)];

  // Add it to the page.
  const greetingContainer = document.getElementById('greeting-container');
  greetingContainer.innerText = greeting;
}

/**
 * fetches message from servlet and adds it to the dom
 */
function addComment(){
  console.log('Fetching a random quote.');
  const responsePromise = fetch('/data');
  responsePromise.then(handleResponse);
}

function handleResponse(response) {
  console.log('Handling the response.');
  const textPromise = response.json();
  textPromise.then(addQuoteToDom);
}

function addQuoteToDom(comment) {
  console.log('Adding quote to dom: ' + comment[0]);
  const quoteContainer = id('mystery-container');
  quoteContainer.innerHTML = '';
  console.log(comment);
  for(let x = 0; x < comment.length; x++) {
    quoteContainer.appendChild(createListElement(comment[x].user + ": " +
      comment[x].text));
    if( comment[x].imageURL !== null)  {
      let img = document.createElement('img');
      console.log(comment[x].imageURL);
      img.src = comment[x].imageURL;
      img.style.width = '200px';
      img.style.length = '200px';
      quoteContainer.appendChild(img);
    }
  }
}

/** Creates an <li> element containing text. */
function createListElement(text) {
  const liElement = document.createElement('li');
  liElement.innerText = text;
  return liElement;
}

/**gets the user and sets the dom */
function fetchUser() {
  fetch('/login?alt=json').then(response => {
      return response.json();
    }).then((user) => {
      console.log(user);
      if(user.loggedIn) {
        id('comment-adder').classList.remove('hidden');
      } else {
        id('login-link').classList.remove('hidden');
      }
  });
}

function addBlob() {
  fetch('/get-blobstore-url?alt=json').then(response => {
    return response.json();
  }).then((url) => {
    console.log(url);
    id("comment-adder").action = url;
  });
}

//helper function to get id of element
function id(text) {
    return document.getElementById(text);
}