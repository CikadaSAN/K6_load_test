import http from 'k6/http'
import { check, group } from 'k6';


export const options = {
  vus: 100,
  duration: '30s',
  thresholds: {
    'http_reqs{group:::loadTest}': ['rate>=280'],               //Set thresholds metrics for Throughput
    'http_req_duration{group:::loadTest}': ['p(95)<1000'],     //Set thresholds metrics for Response Time
    'http_req_failed{group:::loadTest}': ['rate<0.05'],       //Set thresholds metrics for Error Rate
  },
}

//Function to create random number
function randomize(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function getItemsDetails() {
  let num = randomize(1, 10); //Create random number for Product ID

  group('loadTest', () => {
    let bodyRequest = { id: randomize };
    let response = http.post('https://api.demoblaze.com/view', JSON.stringify(bodyRequest), {
      headers: { 'Content-Type': 'application/json' },
    });
    check(response, { 'status is 200': (r) => r.status === 200 });
  })
}