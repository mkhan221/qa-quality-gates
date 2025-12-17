import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 3,
  duration: '30s',
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<1000'],
  },
};

const BASE_URL = 'https://fakestoreapi.com';

export default function () {
  // Product list
  const productsRes = http.get(`${BASE_URL}/products`);
  check(productsRes, {
    'products list status is 200': (r) => r.status === 200,
  });

  // Product detail
  const productRes = http.get(`${BASE_URL}/products/1`);
  check(productRes, {
    'product detail status is 200': (r) => r.status === 200,
  });

  // Login
  const loginPayload = JSON.stringify({
    username: 'mor_2314',
    password: '83r5^_',
  });

  const loginHeaders = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const loginRes = http.post(
    `${BASE_URL}/auth/login`,
    loginPayload,
    loginHeaders
  );

  check(loginRes, {
   'login request returned a response': (r) => r.status !== 0,
   'login response contains token or error': (r) =>
     r.json('token') !== undefined || r.status === 401 || r.status === 403,
  });


  sleep(1);
}
