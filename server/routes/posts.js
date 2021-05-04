import express from 'express';
import Post from '../models/post.js';

const router = express.Router();

router.route('/').get((req, res) => {
    const username = req.session.user.username;
    Post.find()
        .then(posts => res.json({ posts: posts, username: username }))
        .catch(err => res.status(400).json(err));
});

router.route('/add').post((req, res) => {
    const username = req.session.user.username;
    const { title, creator, description, file } = req.body;
    const date = new Date();
    const newPost = new Post({ username, title, creator, description, file, date });
    newPost.save()
        .then(() => res.json('Post added'))
        .catch(err => res.status(400).json(err));
});

router.route('/delete/:id').delete((req, res) => {
    Post.findByIdAndDelete(req.params.id)
        .then(() => res.json('Post deleted'))
        .catch(err => res.status(400).json(err));
});

router.route('/edit/:id').post((req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            post.title = req.body.title;
            post.creator = req.body.creator;
            post.description = req.body.description;
            post.save()
                .then(() => res.json('Post updated'))
                .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(400).json(err));
});

router.route('/like/:id').post((req, res) => {
    const username = req.session.user.username;
    Post.findById(req.params.id)
        .then(post => {
            if (post.likes.includes(username)) {
                post.likes = post.likes.filter(user => user !== username);
            } else {
                post.likes.push(username);
            }
            post.save()
                .then(() => res.json('Likes updated'))
                .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(400).json(err));
});

export default router;