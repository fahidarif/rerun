/**
 * @param {Function} fn The function which will be used as parameter should return a PROMISE & SHOULD NOT HAVE ANY PARAMETER it's compulsory, as its a async retry mechanism.
 * @param {Number} maxRetries Max Retries in number.
 * @param {Number} delayInMS Delay time for retries in number as mili-seconds(ms).
 * @param {Boolean} alwaysRetry To retry always untill the positive response, If its true then maxRetries will not count.
 * @param {Boolean} showLogs To show logs for all retries.
 */
module.exports.runAsync = (fn, maxRetries, delayInMS, alwaysRetry = false, showLogs = false) => {
    return new Promise((resolve, reject) => {
        if (typeof maxRetries != 'number') {
            reject('maxRetries should be in number type.');
            return;
        }
        if (typeof delayInMS != 'number') {
            reject('delayInMS should be in number type.');
            return;
        }
        if (typeof showLogs != 'boolean') {
            reject('showLogs should be in boolean type.');
            return;
        }
        if (typeof fn != 'function') {
            reject('fn should be in function type.');
            return;
        }
        if (maxRetries < 0) {
            reject('maxRetries should be greater than or equal to zero.');
            return;
        }
        if (delayInMS < 0) {
            reject('delayInMS should be greater than or equal to zero.');
            return;
        }
        let retries = 0;
        function tryNow() {
            fn()
                .then((result) => {
                    resolve(result);
                })
                .catch((error) => {
                    retries++;
                    if ((retries <= maxRetries) || alwaysRetry) {
                        if (showLogs) {
                            if (alwaysRetry) {
                                console.log(`Retry ${retries} in ${delayInMS}ms due to error:`, error);
                            } else {
                                console.log(`Retry ${retries} of ${maxRetries} in ${delayInMS}ms due to error:`, error);
                            }
                        }
                        setTimeout(tryNow, delayInMS);
                    } else {
                        reject(error);
                    }
                });
        }
        tryNow();
    });
}
