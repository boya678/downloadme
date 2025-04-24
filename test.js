import http from 'k6/http';
import { check, group } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
import { Trend } from 'k6/metrics';

const test1 = new Trend('test1');
const test2 = new Trend('test2');

export const options = {
  stages: [
    { duration: '1s', target: 4 },
    { duration: '1s', target: 8 },
    { duration: '1s', target: 0 },
  ],
};

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true })
  };
}

export default function () {
  var params = {
    headers: {
      "Accept": "application/json, text/javascript, *//*; q=0.01",
      "Content-Type": "application/json",
      "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImhvOHh0ODFQdWhEZlFVUjFBQ2pxZHlfRWw0ZlJLME1pQ1B1THEtSVllbDAiLCJ0eXAiOiJKV1QifQ.eyJvaWQiOiJkNjhmZjFiZC03NTM5LTRjMGEtYTVjNi00ZDcyOThlZjEyZjkiLCJuYW1lIjoiVG9rZW4gVGVyY2Vyb3MiLCJlbWFpbCI6Ik5vdCBzdXBwb3J0ZWQgY3VycmVudGx5Iiwic3ViIjoiTm90IHN1cHBvcnRlZCBjdXJyZW50bHkuIFVzZSBvaWQgY2xhaW0uIiwicGF0aHMiOiIvdGlsL1JlY2VpdmVUcmF2ZWwvUmVjaWV2ZVRyYXZlbEluZm9ybWF0aW9uIiwicmNfcm9sZSI6IkJhY2tlbmRTZXJ2aWNlQ29uc3VtZXIiLCJsYXN0X2xvZ2luX2RhdGUiOjI4Mzk5NjgwMSwicGhvdG9fdXJsIjoibm9uZSIsImF6cCI6ImExMDEwODZlLTZkZDktNGZhYS04YWQ4LTZhM2UwYzVhMDA4NiIsInZlciI6IjEuMCIsImlhdCI6MTY5Njk1NTAxNiwiYXVkIjoiYTEwMTA4NmUtNmRkOS00ZmFhLThhZDgtNmEzZTBjNWEwMDg2IiwiZXhwIjoxNjk2OTU4NjE2LCJpc3MiOiJodHRwczovL2IyY3JjZGxsby5iMmNsb2dpbi5jb20vNGQyNzgwZTItZWJjYS00NDc2LWIxMjMtMmRmZGJhMGRjMjdhL3YyLjAvIiwibmJmIjoxNjk2OTU1MDE2fQ.DxKBexa3Xd_tRLgGvIpIY4YSJ4a0IF80C3GT0dgAxGTc1ugbQQ_Tt1Jtv0kQH6SwikGcZadiu2Jb4LtTouo87wFxjTHodg7v7TR6SouLZuVYmD2lKyX5_uGDH5LJR_GPci8FBSRYF6QhQDeKenBzMwcBh7DjEruQrC1fGFuzpNMVVXQa9hhro6J12y_mPusivGjmCQzsZaOC78e2Zzteg1PZbotRnmFat5wUlK2YpgP7BSjLQaTyMqwPyH53AlWG5qXpXaBagVIJ3htdizW0ZVIsW28akJLNDDU7weV71QZ3njPc2kFICFYOzPSd-RHwOvpwebFaXRugu9eY0nNEQA",
      "Ocp-Apim-Subscription-Key": "68c094fd730148298471073a7e8e5715"
    },
    tags: {
      testid: "k6test2"
    }
  }
  group('api', function () {
    params.tags.name="get 1"
    const r = http.get("https://ws3.20d2t2infra.com:35000/docuwaremanagementapi/api/Document/getDocumentsByIdentification?documentNumber=123456", params);
    check(r, {
      'is status 200': (r) => r.status === 200,
    });
    test1.add(r.timings.connecting, { name: params.tags.name});
  });
  group('google', function () {
    params.tags.name="get 2"
    const r = http.get("https://google.com", params);
    check(r, {
      'is status 200': (r) => r.status === 200,
    });
    test2.add(r.timings.connecting, { name: params.tags.name});
  });

}


