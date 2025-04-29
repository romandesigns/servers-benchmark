export function logResponse(label, res, extraInfo = {}) {
  console.log(`\n==== ${label} ====`);
  if (extraInfo && Object.keys(extraInfo).length > 0) {
    console.log(`Extra Info: ${JSON.stringify(extraInfo)}`);
  }
  console.log(`Status: ${res.status}`);
  console.log(`Response Time: ${res.timings.duration}ms`);
  console.log(`Response Body: ${res.body}`);
  console.log(`========================\n`);
}
