import http from 'k6/http';
import { check } from 'k6';

export const options = {
  scenarios: {
    constant_rate: {
      executor: 'constant-arrival-rate',
      rate: 50, // 10 solicitudes por segundo (más bajo por ser pesado)
      timeUnit: '1s',
      duration: '120s',
      preAllocatedVUs: 20,
      maxVUs: 500,
    },
  },
};

export default function () {
  const res = http.get('http://172.24.177.186:31319/mid');
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
}
