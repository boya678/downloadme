import http from 'k6/http';
import { check } from 'k6';

export const options = {
  scenarios: {
    constant_rate: {
      executor: 'constant-arrival-rate',
      rate: 5000, // 50 solicitudes por segundo
      timeUnit: '1s',
      duration: '30s',
      preAllocatedVUs: 10,
      maxVUs: 5000,
    },
  },
};

export default function () {
  const res = http.get('http://172.24.177.186:31319/light');
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
}
