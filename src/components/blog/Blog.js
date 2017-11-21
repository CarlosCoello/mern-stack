import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPosts, addPost, deletePost, deleteAllPosts } from '../../actions';
import { bindActionCreators } from 'redux';
//import moment from 'moment';

class Blog extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            image: '',
            message: '',
            date: '',
            id: '',
            show: true
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.props.getPosts();
    }

    handleSubmit(event){
        event.preventDefault();
        const blog = {
            title: this.refs.title.value,
            image: this.refs.image.value,
            message: this.refs.message.value,
            postedBy: this.refs.author.value,
            id: Math.random()
        }
        this.props.addPost(blog);
        this.refs.title.value = '';
        this.refs.image.value = '';
        this.refs.message.value = '';
        this.refs.author.value = '';
    }

    deletePost(postId){
        this.props.deletePost(postId);
    }

    deleteAllPosts(){
        this.props.deleteAllPosts();
    }

    renderTheBlogs(){
        const { blogs } = this.props;
        const marginTB = { marginTop: 20, marginBottom: 20 };
        return (
            <div className="each-blog">
            {
                blogs.map( (blog) => {
                    return (
                        <div className="card" key={JSON.stringify(blog._id) + Math.random()} style={marginTB}>
                            <img className="card-img-top" src={blog.image} alt={blog.title} />
                            <div className="card-body">
                            <h4><strong>{blog.title}</strong></h4>
                            <p className="card-text">{blog.body}</p>
                            </div>
                            <div className="card-footer d-inline-flex justify-content-between align-items-center">
                            <span><strong>Posted by: &nbsp;</strong>{blog.postedBy}</span>
                            <button type="button" className="btn btn-danger" onClick={() => this.deletePost(blog._id)} >&#9747;</button>
                            </div>
                        </div>
                    )
                })
            }
            </div>
        )
    }

    render(){
        const hideCreateButton = this.state.show ? false : true;
        const hideCancelButtonAndForm = this.state.show ? true : false;
        console.log(this.props);
        return(
            <div id="blog-page">
                <button className="btn btn-primary" hidden={hideCreateButton} onClick={() => this.setState({show: false})}>Create New Post</button>
                <button className="btn btn-warning" hidden={hideCancelButtonAndForm} onClick={() => this.setState({show: true})}>Cancel Creation</button>&nbsp;
                <button className="btn btn-danger" hidden={hideCancelButtonAndForm} onClick={() => this.deleteAllPosts()}>Delete All Posts</button>
                <br />
                <br />
                <form onSubmit={this.handleSubmit} hidden={hideCancelButtonAndForm}>
                    <div className="form-group">
                        <label>title: </label>
                        <input type="text" className="form-control" ref="title" />
                    </div>
                    <div className="form-group">
                        <label>image url: </label>
                        <input type="text" className="form-control" ref="image" />
                    </div>
                    <div className="form-group">
                        <label>message: </label>
                        <textarea rows="5" className="form-control" ref="message"></textarea>
                    </div>
                    <div className="form-group">
                        <label>posted by: </label>
                        <input type="text" className="form-control" ref="author" />
                    </div>
                    <div className="form-group">
                        <input type="submit" className="btn btn-primary" />
                    </div>
                </form>
                <br />
                <br />
                {this.renderTheBlogs()}
                <br />
                <br />
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        blogs: state.theBlogs
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getPosts, addPost, deletePost, deleteAllPosts}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog);