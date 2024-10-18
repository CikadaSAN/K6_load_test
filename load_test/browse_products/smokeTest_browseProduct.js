import http from 'k6/http'
import { check, group} from 'k6';


export const options = {
    vus: 20,
    duration: '15s',
    thresholds: {
        'http_reqs{group:::smoke_test}': ['rate>=5'],               //Set thresholds metrics for Throughput
        'http_req_duration{group:::smoke_test}': ['p(95)<400'],     //Set thresholds metrics for Response Time
        'http_req_failed{group:::smoke_test}': ['rate<0.05'],       //Set thresholds metrics for Error Rate
      },
}

//Function to create random number
function randomize(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function get_items_category() {

    const category = ["notebook", "phone", "monitor"];   //Create Array of Categories
    let num = randomize(0, 2); //Create random number for array categories

    group('smoke_test', () => {
        let bodyRequest = { cat: category[num] };
        let response = http.post('https://api.demoblaze.com/bycat', JSON.stringify(bodyRequest), {
            headers: { 'Content-Type': 'application/json' },
        });
        check(response, { 'status is 200': (r) => r.status === 200 });
    })
}