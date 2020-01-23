async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

async function brokenSleep(ms) {
  return new Promise((resolve, reject) => {
    if (Math.random() >= 0.5)
      setTimeout(resolve, ms)
    else
      reject("I don't want to sleep.")
  })
}

module.exports = {
  sleep, brokenSleep
}