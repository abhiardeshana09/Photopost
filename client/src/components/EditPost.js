import React, { useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

const EditPost = ({ post, afterEdit, setEditingState }) => {
    const [title, setTitle] = useState(post.title);
    const [creator, setCreator] = useState(post.creator);
    const [description, setDescription] = useState(post.description);

    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    }

    const onChangeCreator = (e) => {
        setCreator(e.target.value);
    }

    const onChangeDescription = (e) => {
        setDescription(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const updatedPost = {
            title: title,
            creator: creator,
            description: description
        }
        axios.post('http://localhost:5000/posts/edit/' + post._id, updatedPost)
            .then(res => {
                console.log(res.data);
                afterEdit(post._id, updatedPost);
                setEditingState(false);
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="card-content">
            <form onSubmit={onSubmit}>
                <div className="input-field">
                    <input required id="title" type="text" value={title} onChange={onChangeTitle}/>
                    <label className="active" htmlFor="title">Title</label>
                </div>
                <div className="input-field">
                    <input required id="creator" type="text" value={creator} onChange={onChangeCreator}/>
                    <label className="active" htmlFor="creator">Creator</label>
                </div>
                <div className="input-field">
                    <textarea required id="description" className="materialize-textarea" value={description} onChange={onChangeDescription}/>
                    <label className="active" htmlFor="description">Description</label>
                </div>
                <div className="right-align">
                    <button className="btn-small waves-effect waves-light" onClick={() => setEditingState(false)}>Cancel</button>
                    <span style={{ paddingRight: "10px" }}/>
                    <button type="submit" className="btn-small waves-effect waves-light">Save</button>
                </div>
            </form>
        </div>
    );
}

export default EditPost;