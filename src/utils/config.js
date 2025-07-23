export const API_BASE_URL = 'https://jsonplaceholder.typicode.com';
export const ENDPOINTS = [
    '/posts/1',
    '/comments?postId=1',
    '/albums/1/photos',
    '/users/1/todos'
];
export const THRESHOLDS = {
    http_req_duration: ['p(95)<500', 'max<3000'],  
    http_req_failed: ['rate<0.05'],                
    http_req_tls_handshaking: ['max<100'],         
    iteration_duration: ['p(95)<2500']            
};