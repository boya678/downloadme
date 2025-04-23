import http from 'k6/http';
import { check } from 'k6';

export const options = {
  scenarios: {
    constant_rate: {
      executor: 'constant-arrival-rate',
      rate: 1000, // 50 solicitudes por segundo
      timeUnit: '1s',
      duration: '120s',
      preAllocatedVUs: 15000,
      maxVUs: 30000,
    },
  },
};

export default function () {
  const res = http.get('http://localhost/light');
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
}
