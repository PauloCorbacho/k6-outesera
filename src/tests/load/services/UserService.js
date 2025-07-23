import ApiClient from './ApiClient.js';

export default class UserService extends ApiClient {
    constructor(baseUrl) {
        super(baseUrl);
    }

    getUser(userId) {
        return this._request('GET', `/users/${userId}`);
    }

    getUserPosts(userId) {
        return this._request('GET', `/users/${userId}/posts`);
    }

    getUserTodos(userId) {
        return this._request('GET', `/users/${userId}/todos`);
    }

    createUser(userData) {
        return this._request('POST', '/users', userData);
    }
}