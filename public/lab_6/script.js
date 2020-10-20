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

      /* .map() allows us to put an array in,
       do something with it, and return the full array
       Use .map() to map countries from tempArr to new array
       Also want to use randomizer function (with an upper
       limit of 244) to get random countries from fromServer */
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
      ol.className = 'flex-inner';

      // append or prepend list to form
      $('form').append(oList);

      /* Inject list element where each country has
      a checkbox and label
      -label: country name (name)
      -input: country code
      -all checkbox elements have the same name (key for form data)
      -labels are attached to inputs using
      "for" and "id" attributes */
      reverseArr.forEach((el, i) => {
        const nuList = document.createElement('li');
        $(nuList).append('<input type="checkbox" value=$(el.code) id=$(el.code) />');
        $(nuList).append('label for=$(el.code)>$(el.name)</label>');
        $(oList).append(nuList);
      });

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < reverseArr.length; i++) {
        console.log(reverseArr[i].name);
      }

      reverseArr.forEach((el) => {
        console.log(el.name);
      });

      console.log('fromServer', fromServer);
    })
    .catch((err) => console.log(err));
});