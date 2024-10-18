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
    'http_req_duration{group:::spikeTest}': ['p(95)<1000'],       //Set thresholds metrics for Response Time
    'http_req_failed{group:::spikeTest}': ['rate<0.05'],         //Set thresholds metrics for Error Rate
    }
}


//Function to create random number
function randomize(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function getItemsDetails() {
  let num = randomize(1, 10); //Create random number for Product ID

  group('spikeTest', () => {
    let bodyRequest = { id: randomize };
    let response = http.post('https://api.demoblaze.com/view', JSON.stringify(bodyRequest), {
      headers: { 'Content-Type': 'application/json' },
    });
    check(response, { 'status is 200': (r) => r.status === 200 });
  })
}