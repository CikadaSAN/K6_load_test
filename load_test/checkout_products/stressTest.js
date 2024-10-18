import http from 'k6/http'
import { check, group } from 'k6';

// after i inspect the element for the demoblaze feature, demoblaze did not have any "Purchase" API, if you tried to checkout item in the cart, demoblaze will hit API Delete Cart

export const options = {
  stages: [
    { duration: '20s', target: 100 },
    { duration: '40s', target: 100 },
    { duration: '20s', target: 300 },
    { duration: '40s', target: 300 },
    { duration: '20s', target: 700 },
    { duration: '40s', target: 700 },
    { duration: '20s', target: 1200 },
    { duration: '40s', target: 1200 },
    { duration: '40s', target: 0 }
  ],
  thresholds: {
    'http_reqs{group:::stressTest}': ['rate>=250'],               //Set thresholds metrics for Throughput
    'http_req_duration{group:::stressTest}': ['p(95)<1000'],     //Set thresholds metrics for Response Time
    'http_req_failed{group:::stressTest}': ['rate<0.05'],       //Set thresholds metrics for Error Rate
  }
}


export default function purchaseItem() {

  group('spikeTest', () => {
    let bodyRequest = {'cookie':'user=dc7bb379-66bf-c208-21d0-afccfa1a139d'};
    let response = http.post('https://api.demoblaze.com/deletecart', JSON.stringify(bodyRequest), {
      headers: { 'Content-Type': 'application/json' },
    });
    check(response, { 'status is 200': (r) => r.status === 200 });
  })
}