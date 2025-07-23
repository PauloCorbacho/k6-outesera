import { sleep } from 'k6';
import { Trend, Counter, Rate } from 'k6/metrics';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import PostService from './services/PostService.js';
import CommentService from './services/CommentService.js';
import UserService from './services/UserService.js';
import { API_BASE_URL } from '../../utils/config.js';

const metrics = {
    post: new Trend('post_latency'),
    comment: new Trend('comment_latency'),
    user: new Trend('user_latency'),
    errors: new Counter('errors'),
    errorRate: new Rate('error_rate')
};

export const options = {
    scenarios: {
        constant_load: {
            executor: 'constant-vus',
            vus: 500,
            duration: '1m',
        },
    },
    thresholds: {
        'post_latency': ['p(95)<500'],
        'comment_latency': ['p(95)<400'],
        'user_latency': ['p(95)<300'],
        'error_rate': ['rate<0.10'],
    }
};

export default function () {
    const postService = new PostService(API_BASE_URL);
    const commentService = new CommentService(API_BASE_URL);
    const userService = new UserService(API_BASE_URL);

    try {
        const userRes = userService.getUser(1);
        if (!userRes.success) {
            metrics.errors.add(1);
            metrics.errorRate.add(1);
        } else {
            metrics.user.add(userRes.response.timings.duration);
        }
        sleep(0.5);

        const postRes = postService.createPost({
            title: `Test Post ${__VU}`,
            body: 'Content',
            userId: 1
        });
        
        if (!postRes.success) {
            metrics.errors.add(1);
            metrics.errorRate.add(1);
        } else {
            metrics.post.add(postRes.response.timings.duration);
            const postId = postRes.response.json().id;
            
            const commentRes = commentService.createComment({
                postId: postId,
                name: 'Test Comment',
                email: 'test@example.com',
                body: 'Comment content'
            });
            
            if (!commentRes.success) {
                metrics.errors.add(1);
                metrics.errorRate.add(1);
            } else {
                metrics.comment.add(commentRes.response.timings.duration);
            }
        }
        sleep(1);

    } catch (error) {
        metrics.errors.add(1);
        metrics.errorRate.add(1);
    }
}

export function handleSummary(data) {
    return {
        'results/load_test.html': htmlReport(data),
    };
}