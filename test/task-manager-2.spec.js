const { TaskManager2 } = require("..")
const { sleep, brokenSleep } = require("./util")

main()

async function main() {

  const tm2 = new TaskManager2({ concurrency: 5 })
  let RunningTasks = []

  /** Normal sleep. */
  console.log("Let's try normal sleep first.")
  for (let i = 1; i <= 15; i++) {
    const startTime = Date.now()
    const runningTask = tm2.queue(sleep, [1000])
      .then(() => {
        const endTime = Date.now()
        console.log(i)
        console.log(`Finished at ${(endTime - startTime) / 1000} seconds after program start.`)
      })
      .catch((error) => {
        console.log(i)
        console.log(error)
      })
    RunningTasks.push(runningTask)
  }

  await Promise.all(RunningTasks)
  RunningTasks = []

  /** Broken sleep. */
  console.log("Now let's try broken sleep.")
  for (let i = 1; i <= 15; i++) {
    const startTime = Date.now()
    const runningTask = tm2.queue(brokenSleep, [1000])
      .then(() => {
        const endTime = Date.now()
        console.log(i)
        console.log(`Finished at ${(endTime - startTime) / 1000} seconds after program start.`)
      })
      .catch((error) => {
        console.log(i)
        console.log(error)
      })
    RunningTasks.push(runningTask)
  }

}