import ApiClient from './ApiClient.js';

export default class PostService extends ApiClient {
    constructor(baseUrl) {
        super(baseUrl);
    }

    createPost(postData) {
        return this._request('POST', '/posts', postData);
    }

    getPost(postId) {
        return this._request('GET', `/posts/${postId}`);
    }

    updatePost(postId, updateData) {
        return this._request('PUT', `/posts/${postId}`, updateData);
    }

    deletePost(postId) {
        return this._request('DELETE', `/posts/${postId}`);
    }

    getComments(postId) {
        return this._request('GET', `/posts/${postId}/comments`);
    }
}