import { startMeasure } from './measure'

let id = 1

const rand = Math.random

function buildData(count) {
  const adjectives = [
    'pretty',
    'large',
    'big',
    'small',
    'tall',
    'short',
    'long',
    'handsome',
    'plain',
    'quaint',
    'clean',
    'elegant',
    'easy',
    'angry',
    'crazy',
    'helpful',
    'mushy',
    'odd',
    'unsightly',
    'adorable',
    'important',
    'inexpensive',
    'cheap',
    'expensive',
    'fancy',
  ]

  const colours = [
    'red',
    'yellow',
    'blue',
    'green',
    'pink',
    'brown',
    'purple',
    'brown',
    'white',
    'black',
    'orange',
  ]

  const nouns = [
    'table',
    'chair',
    'house',
    'bbq',
    'desk',
    'car',
    'pony',
    'cookie',
    'sandwich',
    'burger',
    'pizza',
    'mouse',
    'keyboard',
  ]

  return new Array(count).fill(0).map(_ => ({
    id: id++,
    label: `${adjectives[(rand() * 1000) % adjectives.length >> 0]} ${
      colours[(rand() * 1000) % colours.length >> 0]
    } ${nouns[(rand() * 1000) % nouns.length >> 0]}`,
  }))
}

const state = {
  data: [],
  selected: false,
}

const actions = {
  run: state =>
    startMeasure('run') || {
      data: buildData(1000),
      selected: undefined,
    },

  add: state =>
    startMeasure('add') || {
      data: state.data.concat(buildData(1000)),
      selected: undefined,
    },

  runLots: state =>
    startMeasure('runLots') || {
      data: buildData(10000),
      selected: undefined,
    },

  clear: state =>
    startMeasure('clear') || {
      data: [],
      selected: undefined,
    },

  update: state => {
    startMeasure('update')
    return {
      data: state.data.map((d, i) => {
        if (i % 10 === 0) {
          return {
            id: d.id,
            label: `${d.label} !!!`,
          }
        }
        return d
      }),
      selected: undefined,
    }
  },

  swapRows: state => {
    startMeasure('swapRows')
    if (state.data.length <= 998) {
      return state
    }

    const temp = state.data[1]
    state.data[1] = state.data[998]
    state.data[998] = temp

    return {
      data: state.data,
      selected: state.selected,
    }
  },

  select: (state, id) =>
    startMeasure('select') || {
      data: state.data,
      selected: id,
    },

  delete: (state, id) =>
    startMeasure('delete') || {
      data: state.data.filter(d => d.id !== id),
      selected: state.selected,
    },
}

export { state, actions }
