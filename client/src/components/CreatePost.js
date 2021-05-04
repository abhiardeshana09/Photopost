import React, { useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [creator, setCreator] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState('');

    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    }

    const onChangeCreator = (e) => {
        setCreator(e.target.value);
    }

    const onChangeDescription = (e) => {
        setDescription(e.target.value);
    }

    const onChangeFile = (e) => {
        if (e.target.files.length === 0) {
            setFile('');
        } else {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
                setFile(reader.result);
            }
        }
    }

    const onClear = (e) => {
        e.preventDefault();
        setTitle('');
        setCreator('');
        setDescription('');
        setFile('');
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (file.substring(0, 10).includes('image')) {
            const post = {
                title: title,
                creator: creator,
                description: description,
                file: file
            }
            axios.post('http://localhost:5000/posts/add', post)
                .then(res => {
                    console.log(res.data);
                    window.location = '/posts';
                })
                .catch(err => console.log(err));
        }
    }

    return (
        <div className="row">
            <div className="col xl4 l6 m8 s10 offset-xl4 offset-l3 offset-m2 offset-s1">
                <div className="section center-align">
                    <h3>Create a Post</h3>
                </div>
                <form onSubmit={onSubmit}>
                    <div className="row">
                        <div className="input-field">
                            <input required id="title" type="text" value={title} onChange={onChangeTitle}/>
                            <label htmlFor="title">Title</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field">
                            <input required id="creator" type="text" value={creator} onChange={onChangeCreator}/>
                            <label htmlFor="creator">Creator</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field">
                            <textarea required id="description" className="materialize-textarea" value={description} onChange={onChangeDescription}/>
                            <label htmlFor="description">Description</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="file-field">
                            <div className="btn-small">
                                <span>Upload File</span>
                                <input required type="file" accept="image/*" onChange={onChangeFile}/>
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path" placeholder="Upload an image file"/>
                            </div>
                        </div>
                    </div>
                    <div className="row center-align">
                        {file.length > 0 && <img className="responsive-img" src={file} alt="Invalid file upload."/>}
                    </div>
                    <div className="row">
                        <button type="submit" className="col s12 btn-large waves-effect waves-light">Post</button>
                        <div className="col s12" style={{ paddingBottom: "10px" }}/>
                        <button className="col s12 btn-small waves-effect waves-light" onClick={onClear}>Clear</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreatePost;