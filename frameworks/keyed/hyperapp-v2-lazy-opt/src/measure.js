let startTime
let lastMeasure

export function startMeasure(name) {
  startTime = performance.now()
  lastMeasure = name
}

export function stopMeasure() {
  const last = lastMeasure

  if (lastMeasure) {
    window.setTimeout(function metaStopMeasure() {
      lastMeasure = null
      const stop = performance.now()
      console.log(last + ' took ' + (stop - startTime))
    }, 0)
  }
}
