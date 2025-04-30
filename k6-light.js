import http from 'k6/http';
import { check } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

const now = new Date().toISOString().replace(/[:.]/g, '-');

export const options = {
  scenarios: {
    ramping_rate: {
      executor: 'ramping-arrival-rate',
      startRate: 5, // empieza con 5 req/s
      timeUnit: '1s',
      preAllocatedVUs: 50,
      maxVUs: 1500,
      stages: [
        { target: 2000, duration: '10s' },  // sube a 10 req/s en 30 segundos
        { target: 4000, duration: '260s' },  // sube a 20 req/snar
      ],
    },
  },
  tags: {
    testid: 'light-load-' + now, // <--- aquí defines el test ID
  },
};

export default function () {
  const res = http.get('http://localhost/light');
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
}

export function handleSummary(data) {
  return {
    [`reporte-light-${now}.html`]: htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true })
  };
}
