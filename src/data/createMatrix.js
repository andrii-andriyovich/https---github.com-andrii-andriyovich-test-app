import tableSize from './tableSize'
import generateRandomNum from '../utils/randomNumGenerator'
import { v4 as createId } from 'uuid'

let matrix = []

for (let i = 0; i < tableSize.rows; i++) {
  matrix.push([i])
  for (let g = 0; g < tableSize.columns; g++) {
    matrix[i][g] = {
      value: generateRandomNum(),
      id: createId(),
    }
  }
}

let sumOfColumns = []
for (let i = 0; i < tableSize.columns; i++) {
  sumOfColumns.push({ value: 0, id: createId() })
}

for (let i = 0; i < matrix.length; i++) {
  for (let g = 0; g < matrix[i].length; g++) {
    sumOfColumns[g].value += matrix[i][g].value
  }
}
const averageNumbers = sumOfColumns.map((el) => {
  return { ...el, value: Math.floor(el.value / matrix.length) }
})
matrix.push(averageNumbers)

let sum = []
for (let i = 0; i < matrix.length; i++) {
  sum.push({ value: 0, id: createId() })
  for (let g = 0; g < matrix[i].length; g++) {
    sum[i].value += matrix[i][g].value
  }
}

for (let i = 0; i < matrix.length; i++) {
  matrix[i].push(sum[i])
}

export default matrix
