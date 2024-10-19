import http from 'k6/http'
import { check, group } from 'k6';

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


//Function to create random number
function randomize(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function getItemsCategory() {

  const category = ["notebook", "phone", "monitor"];   //Create Array of Categories
  let num = randomize(0, 2); //Create random number for array categories

  group('stressTest', () => {
    let bodyRequest = { cat: category[num] };
    let response = http.post('https://api.demoblaze.com/bycat', JSON.stringify(bodyRequest), {
      headers: { 'Content-Type': 'application/json' },
    });
    check(response, { 'status is 200': (r) => r.status === 200 });
  })
}