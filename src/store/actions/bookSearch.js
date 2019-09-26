import * as actionTypes from "./actionTypes";

export const setBookData = ( BookInfos ) => {
  return {
      type: actionTypes.SEARCH_BOOK,
      BookInfos: BookInfos,
  };
};

export const fetchBookInfosFailed = () => {
  return {
      type: actionTypes.FETCH_BOOK_INFOS_FAILED
  };
};
export const fetchBookStart = () => {
  return {
      type: actionTypes.SEARCH_BOOK_START
  };
};


export const getBookData = (searchTerm) => {
    
    const apiKey = process.env.REACT_APP_API_KEY;
    return dispatch => {
      dispatch(fetchBookStart());
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${apiKey}`)
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }
  
        // Examine the text in the response
        response.json().then(function(data) {
            dispatch(setBookData(data.items));

        });
      }
    )
    .catch(function(err) {
      dispatch(fetchBookInfosFailed());
      console.log('Fetch Error :-S', err);
    });
  }
}
