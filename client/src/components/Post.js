import React, { useState } from 'react';
import EditPost from './EditPost';
import moment from 'moment';
import axios from 'axios';
axios.defaults.withCredentials = true;

const Post = ({ post, username, afterLike, afterEdit, afterDelete }) => {
    const [isEditing, setEditingState] = useState(false);

    const onLike = () => {
        axios.post('http://localhost:5000/posts/like/' + post._id)
            .then(res => {
                console.log(res.data);
                afterLike(post._id);
            })
            .catch(err => console.log(err));
    }

    const onDelete = () => {
        axios.delete('http://localhost:5000/posts/delete/' + post._id)
            .then(res => {
                console.log(res.data);
                afterDelete(post._id);
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="section">
            <div className="card z-depth-1 hoverable">
                <div className="card-action">
                    <span><b>{post.username}</b></span>
                    <span className="grey-text right">{moment(post.date).fromNow()}</span>
                </div>
                <div className="card-image">
                    <img src={post.file} alt="An error occurred."/>
                </div>
                {!isEditing
                  ? <div className="card-content">
                        <span><big><b>{post.title}</b></big></span>
                        {username === post.username &&
                            <span className="right">
                                <span style={{ paddingLeft: '5px' }}/>
                                <button className="btn-floating btn-small waves-effect waves-light" onClick={() => setEditingState(true)}><i className="material-icons">edit</i></button>
                                <span style={{ paddingLeft: '5px' }}/>
                                <button className="btn-floating btn-small waves-effect waves-light" onClick={onDelete}><i className="material-icons">delete</i></button>
                            </span>
                        }
                        <span className="right">
                            <span className="btn-floating btn-small btn-flat white"><big>{post.likes.length}</big></span>
                            {post.likes.includes(username)
                              ? <button className="btn-floating btn-small waves-effect waves-light red lighten-1" onClick={onLike}><i className="material-icons">thumb_up</i></button>
                              : <button className="btn-floating btn-small waves-effect waves-light" onClick={onLike}><i className="material-icons">thumb_up</i></button>
                            }
                        </span>
                        <div className="grey-text">{'By: ' + post.creator}</div>
                        <div>{post.description}</div>
                    </div>
                  : <EditPost post={post} afterEdit={afterEdit} setEditingState={setEditingState}/>
                }
            </div>
        </div>
    );
}

export default Post;