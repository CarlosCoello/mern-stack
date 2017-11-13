const Blog =  require('../models/blog');
const config = require('../config/database');

module.exports = (router) => {

    router.get('/getPosts', (req, res) => {
        Blog.find({}, (err, posts) => {
            if(err){
                res.send({ success: false, message: 'unable to get posts ' + err });
            } else {
                if(!posts){
                    res.send({ success: false, message: 'there are no posts' });
                } else {
                    res.send({ success: true, posts: posts });
                }
            }
        }).sort({ createdAt: -1 });
    });
    
    router.post('/newPost', (req, res) => {
        if(!req.body.title){
            res.send({ success: false, message: 'a title is required' });
        } else {
            if(!req.body.image){
                res.send({ success: false, message: 'a image is required' });
            } else {
                if(!req.body.message){
                    res.send({ success: false, message: 'a message is required' });
                } else {
                    if(!req.body.postedBy){
                        res.send({ success: false, message: 'post author name is required' });
                    } else {
                        let post = new Blog({
                            title: req.body.title,
                            image: req.body.image,
                            body: req.body.message,
                            postedBy: req.body.postedBy
                        });
                        post.save( (err, post) => {
                            if(err){
                                res.send({ success: false, message: 'an error occured: ' + err });
                            } else {
                                res.send({ success: true, message: 'post successfully saved', post: post });
                            }
                        })
                    }
                }
            }
        }
    });

    router.delete('/deletePost/:id', (req,res) => {
        if(!req.params.id){
            res.send({ success: false, message: 'no id submitted, post was not deleted' });
        } else {
            Blog.findOneAndRemove({ _id: req.params.id }, (err, post) => {
                if(err){
                    res.send({ success: false, message: 'an error happened ' + err });
                } else {
                    res.send({ success: true, post: post._id });
                }
            })
        }
    });

    router.delete('/deleteAllPosts', (req, res) => {
        Blog.remove({}, (err) => {
            if(err){
                res.send({ success: false, message: 'an error ocurred ' + err });
            } else {
                res.send({ success: true, message: 'all posts have been removed' });
            }
        })
    });
    
    return router;
}