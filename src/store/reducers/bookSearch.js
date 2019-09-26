import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    BookInfos:null,
    error: false,
    loading: 'disabled'
};
const getBookData = (state,action) => {
    return updateObject( state, {BookInfos: action.BookInfos,error:false,loading: 'disabled'});
   
};

const fetchBookInfosFailed = (state, action) => {
    return updateObject( state, { BookInfos:null,error: true,loading: 'disabled' } );
};
const fetchBookStart = ( state, action ) => {
    return updateObject( state, { loading:'active' } );
};

const bookSearch = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SEARCH_BOOK_START: return fetchBookStart( state, action );
        case actionTypes.SEARCH_BOOK: return getBookData( state, action );
        case actionTypes.FETCH_BOOK_INFOS_FAILED: return fetchBookInfosFailed( state, action );
        default: return state;
    }
};

export default bookSearch;