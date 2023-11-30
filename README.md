## rerun.js

### Perfect light-weight & asynchronious package for asynchroniously retry/rerun of any logic...


## Features
- Calls any logic in with fixed max number of retrying/rerun buffer.
- Asynchroniously call the logic with capacity to acll unlimited time of retry/rerun untill the positive response.
- Can be adjusted with at what particular delay in (MS) we want to retry.
- Logs the details of retries causes.


### Usage

```js
const { runAsync } = require('rerun.js');

function logicToRerun() {
  return new Promise((resolve, reject) => {
    // your code like api calling or anything but it should retrun the promise
    if(/* true response */){
      resolve(/* Data to return in true case.*/);
    } else {
      reject(/* Data to return in false/error/faulty case.*/);
    }
  })
}

/**
 * @param {Function} fn The function which will be used as parameter should return a PROMISE & SHOULD NOT HAVE ANY PARAMETER it's compulsory, as its a async retry mechanism.
 * @param {Number} maxRetries Max Retries in number.
 * @param {Number} delayInMS Delay time for retries in number as mili-seconds(ms).
 * @param {Boolean} alwaysRetry To retry always untill the positive response, If its true then maxRetries will not count.
 * @param {Boolean} showLogs To show logs for all retries.
 */

runAsync(fn, maxRetries, delayMs, alwaysRetry, showLogs).then((result) => {
   // This will return the exact same data that we resolved in promise of upper function.
}).catch(err => {
  // This will retrun the error object after the max retries finishes
})

```

Using in TS Env.
```js
import { runAsync } from 'rerun.js';

// Now the same way implementations as above.....
//
//
//...
```


### API

```js
const { runAsync } = require('rerun.js');
//Or
const rerun = require('rerun.js');
//Or
import { runAsync } from 'rerun.js';
//Or
import * as rerun from 'rerun.js';
```

---------------------------------------

__Example__

```js
function mongoDBConnect() {// any DB connection
  return new Promise((resolve, reject) => {
    // your code to connection to DB
    if(/* true response */){
      resolve(/* Data to return in true case.*/);
    } else {
      reject(/* Data to return in false/error/faulty case.*/);
    }
  })
}

/**
 * @param {Function} fn The function which will be used as parameter should return a PROMISE & SHOULD NOT HAVE ANY PARAMETER it's compulsory, as its a async retry mechanism.
 * @param {Number} maxRetries Max Retries in number.
 * @param {Number} delayInMS Delay time for retries in number as mili-seconds(ms).
 * @param {Boolean} alwaysRetry To retry always untill the positive response, If its true then maxRetries will not count.
 * @param {Boolean} showLogs To show logs for all retries.
 */

// Now the below async try to connect with DB and if its gets failed then it will retry to reconnect to DB with the retry time-span of 10 seconds delay for 10 times.
runAsync(mongoDBConnect, 10, 10000, false, false).then((result) => {
   // This will return the exact same data that we resolved in promise of upper function.
   // your logic to handle positive response.
}).catch(err => {
  // This will retrun the error object after the max retries finishes
   // your logic to handle negative response after 10 failed retries.
})

```

---------------------------------------

### Example

```js
// In this example we will use the rerun.js to retry unlimited of time untill it gets the positive response.
function connectToWebsocket() {// any DB connection
  return new Promise((resolve, reject) => {
    // your code for connection of websocket.

    /*if socket connection opens*/
    resolve(/*Data to return*/);
    
    //Or
    
    /*if socket connection gets any error*/
    reject(/*Data to return in failed state of promise*/);
   
  })
}

/**
 * @param {Function} fn The function which will be used as parameter should return a PROMISE & SHOULD NOT HAVE ANY PARAMETER it's compulsory, as its a async retry mechanism.
 * @param {Number} maxRetries Max Retries in number.
 * @param {Number} delayInMS Delay time for retries in number as mili-seconds(ms).
 * @param {Boolean} alwaysRetry To retry always untill the positive response, If its true then maxRetries will not count.
 * @param {Boolean} showLogs To show logs for all retries.
 */

// Now the below async try to connect with websocket and if its gets failed then it will retry to reconnect to websocket with the retry time-span of 10 seconds delay for unlimited retries with logs.
runAsync(connectToWebsocket, 10, 10000, true, true).then((result) => {
   // This will return the exact same data that we resolved in promise of upper function.
   // your logic to handle positive response.
}).catch(err => { // in this state catch will not get called as we are retrying without any retry limit
   // your logic to handle error in current promise.
})
```