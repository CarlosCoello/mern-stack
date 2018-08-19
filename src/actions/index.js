export const GET_POSTS = 'GET_POST';
export const DELETE_ALL_POSTS = 'DELETE_ALL_POSTS';
export const DELETE_POST = 'DELETE_POST';

export const getPosts = (posts) => {
    return dispatch => {
        return fetch('https://shrouded-forest-43181.herokuapp.com/blogs/getPosts').then( res => res.json()).then( data => {
            console.log('action ', data);
           dispatch({
                type: GET_POSTS,
                posts: data.posts
            })
        })
    }
}

export const addPost = (blog) => {
    let myHeader = new Headers({
        'Content-Type': 'application/json'
    });
    let options = {
        method: 'post',
        body: JSON.stringify(blog),
        headers: myHeader
    }
    return dispatch => {
        return fetch('https://shrouded-forest-43181.herokuapp.com/blogs/newPost', options).then( res => res.json()).then(() => {
            dispatch(getPosts());
        })
    }
}

export const deletePost = (postId) => {
    let myHeader = new Headers({
        'Content-Type': 'application/json'
    });
    let options = {
        method: 'delete',
        headers: myHeader
    }
   return dispatch => {
       return fetch('https://shrouded-forest-43181.herokuapp.com/blogs/deletePost/' + postId, options).then( res => res.json()).then( data => {
        dispatch({
            type: DELETE_POST,
            post: data.post
        })
    })
   }
}

export const deleteAllPosts = () => {
    let myHeader = new Headers({
        'Content-Type': 'application/json'
    });
    let options = {
        method: 'delete',
        headers: myHeader
    }
    return dispatch => {
        return fetch('https://shrouded-forest-43181.herokuapp.com/blogs/deleteAllPosts', options).then( res => res.json()).then( data => {
         dispatch({
             type: DELETE_ALL_POSTS,
             posts: data.message 
         })
     })
    }
}