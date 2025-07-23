import ApiClient from './ApiClient.js';

export default class CommentService extends ApiClient {
    constructor(baseUrl) {
        super(baseUrl);
    }

    getCommentsByPost(postId) {
        return this._request('GET', `/comments?postId=${postId}`);
    }

    createComment(commentData) {
        return this._request('POST', '/comments', commentData);
    }

    updateComment(commentId, updateData) {
        return this._request('PUT', `/comments/${commentId}`, updateData);
    }

    deleteComment(commentId) {
        return this._request('DELETE', `/comments/${commentId}`);
    }
}