import http from 'k6/http';
import { check, group } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
import { Trend } from 'k6/metrics';

const light = new Trend('light');
const mid = new Trend('mid');
const heavy = new Trend('heavy');

const now = new Date().toISOString().replace(/[:.]/g, '-');

export const options = {
  scenarios: {
    ramping_rate: {
      executor: 'ramping-arrival-rate',
      startRate: 5, // empieza con 5 req/s
      timeUnit: '1s',
      preAllocatedVUs: 1500,
      maxVUs: 4500,
      stages: [
        { target: 200, duration: '60s' },  // sube a 10 req/s en 30 segundos
        { target: 200, duration: '260s' },  // sube a 20 req/snar
      ],
    },
  },
  tags: {
    testid: 'all-load-' + now, // <--- aquí defines el test ID
  },
};

export default function () {
  group('light', function () {
    var res = http.get('http://localhost/light', { tags: { name: "light" } });
    check(res, {
      'status is 200': (res) => res.status === 200,
    });
    light.add(res.timings.duration, { name: "light" })
  });

  group('mid', function () {
    var res = http.get('http://localhost/mid', { tags: { name: "mid" } });
    check(res, {
      'status is 200': (res) => res.status === 200,
    });
    mid.add(res.timings.duration, { name: "mid" })
  });
  group('heavy', function () {
    var res = http.get('http://localhost/heavy', { tags: { name: "heavy" } });
    check(res, {
      'status is 200': (res) => res.status === 200,
    });
    heavy.add(res.timings.duration, { name: "heavy" })
  });
}

export function handleSummary(data) {
  return {
    [`reporte-all-${now}.html`]: htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true })
  };
}

