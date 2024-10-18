import http from 'k6/http'
import { check, group } from 'k6';


export const options = {
  vus: 20,
  duration: '15s',
  thresholds: {
    'http_reqs{group:::smokeTest}': ['rate>=40'],               //Set thresholds metrics for Throughput
    'http_req_duration{group:::smokeTest}': ['p(95)<1000'],     //Set thresholds metrics for Response Time
    'http_req_failed{group:::smokeTest}': ['rate<0.05'],       //Set thresholds metrics for Error Rate
  },
}

export default function addItemsToCart() {

  group('smokeTest', () => {
    let bodyRequest = {'id':'640f946e-ee77-b4a2-3da8-0ae1a709788b','cookie':'user=966d800a-4077-4d7a-8688-0a270f85b583','prod_id':10,'flag':false};
    let response = http.post('https://api.demoblaze.com/addtocart', JSON.stringify(bodyRequest), {
      headers: { 'Content-Type': 'application/json' },
    });
    check(response, { 'status is 200': (r) => r.status === 200 });
  })
}