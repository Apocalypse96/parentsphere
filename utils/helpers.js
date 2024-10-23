// Helper function to find a post by ID
const findPostById = async (Post, postId) => {
    try {
        const post = await Post.findByPk(postId);
        return post;
    } catch (error) {
        console.error(`Error finding post with ID ${postId}:`, error);
        return null;
    }
};

// Helper function to find a reply by ID
const findReplyById = async (Reply, replyId) => {
    try {
        const reply = await Reply.findByPk(replyId);
        return reply;
    } catch (error) {
        console.error(`Error finding reply with ID ${replyId}:`, error);
        return null;
    }
};

// Helper function to validate vote type (upvote/downvote)
const isValidVoteType = (voteType) => {
    return voteType === 'upvote' || voteType === 'downvote';
};

// Helper function to check if a parent is part of a circle
const isParentInCircle = async (Circle, circleId, parentId) => {
    try {
        const circle = await Circle.findByPk(circleId, {
            include: ['Parents'],
        });

        if (!circle) {
            return false;
        }

        return circle.Parents.some(parent => parent.id === parentId);
    } catch (error) {
        console.error(`Error checking if parent ${parentId} is in circle ${circleId}:`, error);
        return false;
    }
};

module.exports = {
    findPostById,
    findReplyById,
    isValidVoteType,
    isParentInCircle,
};
