const TaskManager = require('../lib')

/** Config parameters of TaskManager. All fields are optional. */
const taskManagerOptions = {
  /** The ideal delay between tasks. */
  delay: 500,
  /** 
   * The absolute value of max jitter that will be added to ideal delay.
   * In this example the actual delay is 400 <= actual delay <= 600.
   */
  delayJitterMax: 200,
  /** Number of tasks running in parallel. */
  parallelNum: 10,
  /** Whether to print debug messages. */
  debug: true
}

/**
 * no-delay options.
 */
const taskManagerNoDelayOptions = {
  delay: 0,
  delayJitterMax: 0,
  parallelNum: 10,
  debug: true
}

/** 
 * Create some dummy tasks for testing.
 * Each task is just a plain object that will be used as an argument when
 * calling your execFunc.
 */
let tasks = (new Array(105)).fill(0)
tasks = tasks.map((v, i) => {
  return {
    value: `task-${i}`
  }
})

/**
 * Create sync and async TaskManager instances.
 * Note that the execFunc is called once with no argument to detect if the
 * execFunc is sync or async.
 */
let tmSync = new TaskManager(tasks, testFuncSync, taskManagerOptions)
let tmAsync = new TaskManager(tasks, testFuncAsync, taskManagerOptions)
let tmAsyncNoDelay = new TaskManager(tasks, testFuncAsync, taskManagerNoDelayOptions)

/** Make them run. */
main()

async function main() {
  try {
    /** Usage of sync mode. */
    console.log('Testing Sync Function')

    /** Start executing tasks. */
    tmSync.start()

    /**
     * Wait for the tasks to finish.
     * Details: TaskManager.finish() returns a Promise that will resolve when
     * all tasks are finished.
     */
    await tmSync.finish()

    /** 
     * Usage of async mode is the same. 
     * You just replace the execFunc with an async one.
     */
    console.log('Testing Async Function')
    tmAsync.start()
    await tmAsync.finish()

    console.log('Testing Async Function without delay')
    tmAsyncNoDelay.start()
    await tmAsyncNoDelay.finish()
  } catch (error) {
    console.error(error)
  }
}

/**
 * It is important to check if task is undefined or null, since the TaskManager
 * call the execFunc with no argument before executing any task to detect if 
 * the execFunc is synchronous or asynchronous.
 */
function testFuncSync(task) {
  if (task != null) {
    console.log(task)
  }
}

/**
 * The key point to remember when using an async execFunc is to ALWAYS return
 * a Promise, and check if task is undefined or null INSIDE the Promise, so 
 * the TaskManager can know it's async.
 */
function testFuncAsync(task) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (task != null) {
        console.log(task)
      }
      resolve()
    }, 500)
  })
}