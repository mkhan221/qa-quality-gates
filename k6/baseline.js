import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 10 },
    { duration: '1m', target: 20 },
    { duration: '30s', target: 10 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<800'],
  },
};

const BASE_URL = 'https://fakestoreapi.com';

export default function () {
  const productsRes = http.get(`${BASE_URL}/products`);
  check(productsRes, {
    'products list status is 200': (r) => r.status === 200,
  });

  const productRes = http.get(`${BASE_URL}/products/1`);
  check(productRes, {
    'product detail status is 200': (r) => r.status === 200,
  });

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
    'login endpoint responded': (r) => r.status !== 0,
  });

  sleep(1);
}
