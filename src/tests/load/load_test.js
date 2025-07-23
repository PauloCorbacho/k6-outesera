import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { Trend, Counter, Rate } from 'k6/metrics';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

// Custom metrics
const metrics = {
    responseTime: new Trend('response_time_ms'),
    errors: new Counter('errors'),
    errorRate: new Rate('error_rate')
};

// Correct threshold syntax
export const options = {
    scenarios: {
        constant_load: {
            executor: 'constant-vus',
            vus: 500,
            duration: '5m',
            gracefulStop: '30s'
        }
    },
    thresholds: {
        'http_req_duration': ['p(95)<500', 'max<2000'],  
        'http_req_failed': ['rate<0.05'],                
        'error_rate': ['rate<0.05'],                     
        'errors': ['count<100']                          
    }
};

export default function () {
    try {
        const params = {
            timeout: '5s',
            tags: { name: 'API_Call' }
        };

        const res = http.get('https://jsonplaceholder.typicode.com/posts/1', params);
        
        const isSuccess = check(res, {
            'Status 200': (r) => r.status === 200,
            'Response OK': (r) => r.json().id === 1
        });

        metrics.responseTime.add(res.timings.duration);
        
        if (!isSuccess) {
            metrics.errors.add(1);
            metrics.errorRate.add(1);
            console.error(`Failed request - Status: ${res.status}`);
        }
        
        sleep(1);
        
    } catch (error) {
        metrics.errors.add(1);
        metrics.errorRate.add(1);
        console.error(`Critical error: ${error}`);
    }
}

export function handleSummary(data) {
    return {
        'results/report.html': htmlReport(data),
        stdout: textSummary(data, { indent: ' ', enableColors: true })
    };
}
