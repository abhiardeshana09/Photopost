import mongoose from 'mongoose';

const PostSchema = mongoose.Schema({
    username: { type: String, required: true },
    title: { type: String, required: true },
    creator: { type: String, required: true },
    description: { type: String, required: true },
    file: { type: String, required: true },
    date: { type: Date, required: true },
    likes: [String]
});

const Post = mongoose.model('Post', PostSchema);

export default Post;