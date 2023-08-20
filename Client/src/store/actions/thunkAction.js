export const makeASandwich = (forPerson, secretSauce) => {
    return {
      type: 'MAKE_SANDWICH',
      forPerson,
      secretSauce
    }
  }
  
  export const apologize = (fromPerson, toPerson, error) => {
    return {
      type: 'APOLOGIZE',
      fromPerson,
      toPerson,
      error
    }
  }

  export const makeASandwichWithSecretSauce = (forPerson) => {
    // Invert control!
    // Return a function that accepts `dispatch` so we can dispatch later.
    // Thunk middleware knows how to turn thunk async actions into actions.
    return function (dispatch) {
      return fetchSecretSauce()  .then(response => {
        // Check if the response status is OK (200)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the JSON data
      })
      .then(data => {
        // You can now access the extracted data
        console.log(data);
        dispatch(makeASandwich(forPerson, data.message))
        // Use the data in your React components
      })
      .catch(error => dispatch(apologize('The Sandwich Shop', forPerson, error)));
    }
  }


  function fetchSecretSauce() {
    return fetch('http://localhost:5001/reactRoute/react/google?q=secret+sauce')
  }

  // function fetchFromMyBackend() {
  //   return fetch('http://localhost:5001/reactRoute/react/test')
  // }