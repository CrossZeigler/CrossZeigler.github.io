// You may wish to find an effective randomizer function on MDN.
// Randomizer from:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function range(int) {
  const arr = [];
  for (let i = 0; i < int; i += 1) {
    arr.push(i);
  }
  console.log('yeet');
  return arr;
}

// Descending Sort
// sortFunction(b, a, key)
function sortFunction(a, b, key) {
  if (a[key] < b[key]) {
    return -1;
  } if (a[key] > b[key]) {
    return 1;
  }
  return 0;
}

document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray(); // here we're using jQuery to serialize the form
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((fromServer) => {
      // Lab Code Starts Here
      /* Make sure to remove any pre-existing lists
       from the document. Need .remove()
       Can do this by using querySelector to check
       for elements with .flex-inner (there should
        only be one element like this) */
      if (document.querySelector('.flex-inner')) {
        document.querySelector('.flex-inner').remove();
      }

      // Create a new list of 10 elements
      const tempArr = range(10);

      // Array to check for repeating values
      const repArr = range(10);

      /* .map() allows us to put an array in,
       do something with it, and return the full array
       Use .map() to map countries from tempArr to new array
       Also want to use randomizer function (with an upper
       limit of 244) to get random countries from fromServer 
       Can also check to see if we have any repeating values
       using .includes() for another array */
      const nuArr = tempArr.map(() => {
        const ranNum = getRandomInt(244);
        console.log(fromServer[ranNum].name);
        return fromServer[ranNum];
      });

      // Use trick to sort these values in the reverse order
      // to a new array (reverse order of a and b in sortFunction)
      const reverseArr = nuArr.sort((a, b) => sortFunction(b, a, 'name'));

      // Create new ordered list to append to the index.html file
      // Also make its class flex-inner
      const oList = document.createElement('ol');
      oList.className = 'flex-inner';

      // append or prepend list to form
      $('form').prepend(oList);

      /* Inject list element where each country has
      a checkbox and label
      -label: country name (name)
      -input: country code
      -all checkbox elements have the same name (key for form data)
      -labels are attached to inputs using
      "for" and "id" attributes */
      const nuFlex = document.querySelector('.flex-inner');

      reverseArr.forEach((el) => {
        // const nuList = document.createElement('li');
        const nuList = nuFlex.appendChild(document.createElement('li'));
        const checkBox = document.createElement('input');
        checkBox.setAttribute('type', 'checkbox');
        checkBox.setAttribute('id', `${el.code}`);
        checkBox.setAttribute('value', `${el.code}`);
        checkBox.setAttribute('name', `${el.name}`);
        /* checkBox.type = 'checkbox';
        checkBox.value = el.code;
        checkBox.id = el.code; */

        const nuLabel = document.createElement('label');
        nuLabel.setAttribute('for', `${el.code}`);
        nuLabel.innerText = `${el.name}`;
        
        /* nuLabel.htmlFor = el.code;
        nuLabel.textContent = el.name; */
        nuList.appendChild(checkBox);
        nuList.appendChild(nuLabel);
        $(oList).append(nuList);
      });
      console.log('fromServer', fromServer);
    })
    .catch((err) => console.log(err));
});