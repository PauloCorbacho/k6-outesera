export const API_BASE_URL = 'https://jsonplaceholder.typicode.com';
export const ENDPOINTS = [
    '/posts/1',
    '/comments?postId=1',
    '/albums/1/photos',
    '/users/1/todos'
];
export const THRESHOLDS = {
    http_req_duration: ['p(95)<800', 'p(99)<1500'],
    http_req_failed: ['rate<0.05']
};