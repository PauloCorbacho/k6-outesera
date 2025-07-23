import http from 'k6/http';
import { check } from 'k6';

export default class ApiClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.defaultHeaders = {
            'Content-Type': 'application/json'
        };
    }

    _request(method, endpoint, payload = null, params = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        
        const headers = Object.assign({}, this.defaultHeaders);
        if (params.headers) {
            Object.assign(headers, params.headers);
        }
        
        const response = http.request(method, url, JSON.stringify(payload), {
            headers: headers,
            timeout: params.timeout || '10s'
        });

        return {
            success: check(response, {
                'status was 2xx': (r) => r.status >= 200 && r.status < 300,
                'response time < 500ms': (r) => r.timings.duration < 500
            }),
            response: response
        };
    }
}