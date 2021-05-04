import React, { useState, useEffect } from 'react';
import Post from './Post';
import Loading from '../loading.svg';
import axios from 'axios';
axios.defaults.withCredentials = true;

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [username, setUsername] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/posts/')
            .then(res => {
                setPosts(res.data.posts.reverse());
                setUsername(res.data.username);
            })
            .catch(err => console.log(err));
    }, []);

    const afterLike = (id) => {
        setPosts(posts.map(post => {
            if (post._id === id) {
                if (post.likes.includes(username)) {
                    post.likes = post.likes.filter(user => user !== username);
                } else {
                    post.likes.push(username);
                }
            }
            return post;
        }));
    }

    const afterEdit = (id, editedPost) => {
        setPosts(posts.map(post => {
            if (post._id === id) {
                post.title = editedPost.title;
                post.creator = editedPost.creator;
                post.description = editedPost.description;
            }
            return post;
        }));
    }

    const afterDelete = (id) => {
        setPosts(posts.filter(post => post._id !== id));
    }

    return (
        <div className="row">
            <div className="col xl6 l8 m10 s12 offset-xl3 offset-l2 offset-m1">
                {posts.length === 0
                  ? <div style={{ paddingTop: "50px" }} className="center-align">
                        <img src={Loading} alt="Loading..."/>
                    </div>
                  : posts.map(post => {
                        return <Post post={post} username={username} afterLike={afterLike} afterEdit={afterEdit} afterDelete={afterDelete} key={post._id}/>
                    })
                }
            </div>
        </div>
    );
}

export default PostList;