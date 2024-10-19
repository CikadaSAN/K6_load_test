import http from 'k6/http'
import { check, group } from 'k6';


export const options = {
  stages: [
    { duration: '30s', target: 750 },
    { duration: '1m', target: 750 },
    { duration: '30s', target: 0 }
  ],
  thresholds: {
    'http_reqs{group:::spikeTest}': ['rate>=200'],               //Set thresholds metrics for Throughput
    'http_req_duration{group:::spikeTest}': ['p(95)<1000'],     //Set thresholds metrics for Response Time
    'http_req_failed{group:::spikeTest}': ['rate<0.05'],       //Set thresholds metrics for Error Rate
    }
}


export default function addItemsToCart() {

  group('spikeTest', () => {
    let bodyRequest = {'id':'640f946e-ee77-b4a2-3da8-0ae1a709788b','cookie':'user=966d800a-4077-4d7a-8688-0a270f85b583','prod_id':10,'flag':false};
    let response = http.post('https://api.demoblaze.com/addtocart', JSON.stringify(bodyRequest), {
      headers: { 'Content-Type': 'application/json' },
    });
    check(response, { 'status is 200': (r) => r.status === 200 });
  })
}