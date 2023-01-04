import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { MdDelete } from 'react-icons/md'
import './App.css'

function App() {
  // function cell() {
  //   this.value = Math.floor(Math.random() * 900 + 100)
  //   this.id = uuidv4()
  // }

  let data = {
    rows: 7,
    columns: 10,
  }

  let matrix = []

  for (let i = 0; i < data.rows; i++) {
    matrix.push([i])
    for (let g = 0; g < data.columns; g++) {
      matrix[i][g] = {
        value: Math.floor(Math.random() * 900 + 100),
        id: uuidv4(),
      }
    }
  }

  let average = []
  matrix[0].forEach(() => average.push({ value: 0, id: uuidv4() }))

  for (let i = 0; i < matrix.length; i++) {
    for (let g = 0; g < matrix[i].length; g++) {
      average[g].value += matrix[i][g].value
    }
  }
  const averageNumber = average.map((el) => {
    return { ...el, value: Math.floor(el.value / matrix.length) }
  })
  matrix.push(averageNumber)

  let sum = []
  for (let i = 0; i < matrix.length; i++) {
    sum.push({ value: 0, id: uuidv4() })
    for (let g = 0; g < matrix[i].length; g++) {
      sum[i].value += matrix[i][g].value
    }
  }

  for (let i = 0; i < matrix.length; i++) {
    matrix[i].push(sum[i])
  }

  const [numbers, setNumbers] = useState(matrix)

  function incrementCount(i, n) {
    let indexOfSum
    const incremented = numbers.map((el, index) => {
      return el.map((el) => {
        if (el.id === i.id) {
          indexOfSum = index
          return {
            ...el,
            value: i.value + 1,
          }
        } else {
          return el
        }
      })
    })
    const incrementedSum = incremented.map((el) => {
      return el.map((el) => {
        if (
          el.id ===
          incremented[indexOfSum][incremented[indexOfSum].length - 1].id
        ) {
          return {
            ...el,
            value:
              incremented[indexOfSum][incremented[indexOfSum].length - 1]
                .value + 1,
          }
        } else {
          return el
        }
      })
    })

    let newAverage = 0
    const incrementedAverage = incrementedSum.map((el) => {
      newAverage += el[n].value
      return el.map((el) => {
        if (incrementedSum[incrementedSum.length - 1][n].id === el.id) {
          return {
            ...el,
            value: Math.floor(newAverage / incrementedSum.length),
          }
        } else {
          return el
        }
      })
    })
    setNumbers(incrementedAverage)
  }

  function deleteRow(index) {
    const deleted = numbers.filter((element) => {
      return numbers[index] !== element
    })

    let deletedAverage = []
    deleted[0].forEach(() => deletedAverage.push({ value: 0, id: uuidv4() }))

    for (let i = 0; i < deleted.length; i++) {
      for (let g = 0; g < deleted[i].length; g++) {
        deletedAverage[g].value += deleted[i][g].value
      }
    }

    const newDeletedAverage = deletedAverage.map((el) => {
      return { ...el, value: Math.floor(el.value / deleted.length) }
    })
    console.log(newDeletedAverage)

    const newAverageNumber = deleted.map((element) => {
      console.log(deleted[deleted.length - 1])
      if (deleted.indexOf(element) === deleted.length - 1) {
        return element.map((el) => {
          return {
            ...el,
            value:
              newDeletedAverage[deleted[deleted.length - 1].indexOf(el)].value,
          }
        })
      } else {
        return element
      }
    })
    setNumbers(newAverageNumber)
  }

  return (
    <div className="App">
      <table align="center">
        <tbody>
          {numbers.map((element, index) => {
            return (
              <tr key={index}>
                <td>
                  <MdDelete
                    onClick={() => {
                      deleteRow(index)
                    }}
                  />
                </td>
                {element.map((element, id) => {
                  return (
                    <td
                      onClick={() => {
                        incrementCount(element, id)
                      }}
                      key={id}
                    >
                      {element.value}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default App
