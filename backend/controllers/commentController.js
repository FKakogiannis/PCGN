import Comment from '../models/Comment.js';

export const getComments = async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const addComment = async (req, res) => {
    const { username, comment } = req.body;
    const newComment = new Comment({ username, comment });

    try {
        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
    } catch (error) {
        res.status(400).json({ message: 'Bad request' });
    }
};
