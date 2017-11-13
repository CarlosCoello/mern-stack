import { combineReducers } from 'redux';
import { GET_POSTS, ADD_POST, DELETE_POST, DELETE_ALL_POSTS } from '../actions';

const theBlogs = (state = [], action) => {
    let blogs = null;
    //state = read_cookie('blogs');
    switch(action.type){
        case GET_POSTS:
        blogs = action.posts;
            return blogs;
        case ADD_POST:
        blogs = [action.post, ...state];
            return blogs;
        case DELETE_POST:
        blogs = deleteOnePost(state, action.post);
            return blogs;
        case DELETE_ALL_POSTS:
        blogs = [];
        return blogs;
            default:
            return state;
    }
}

//helper functions

const deleteOnePost = (state, id) => {
  const blogs =  state.filter( post => post._id !== id);
  return blogs;
}

export const rootReducer = combineReducers({
    theBlogs
});