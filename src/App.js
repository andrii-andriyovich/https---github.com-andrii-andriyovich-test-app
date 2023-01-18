import { useState } from 'react'
import { v4 as createId } from 'uuid'
import { MdDelete } from 'react-icons/md'
import matrix from './data/createMatrix'
import './App.css'

function App() {
  const [numbers, setNumbers] = useState(matrix)

  function incrementCount(cell, id) {
    let indexOfSum
    const incrementedNumbers = numbers.map((row, index) => {
      return row.map((element) => {
        if (element.id === cell.id) {
          indexOfSum = index
          return {
            ...element,
            value: cell.value + 1,
          }
        } else {
          return element
        }
      })
    })
    const incrementedSum = incrementedNumbers.map((row) => {
      return row.map((cell) => {
        if (
          cell.id ===
          incrementedNumbers[indexOfSum][
            incrementedNumbers[indexOfSum].length - 1
          ].id
        ) {
          return {
            ...cell,
            value:
              incrementedNumbers[indexOfSum][
                incrementedNumbers[indexOfSum].length - 1
              ].value + 1,
          }
        } else {
          return cell
        }
      })
    })

    let newAverageNumbers = 0
    const incrementedAverageNumbers = incrementedSum.map((row) => {
      newAverageNumbers += row[id].value
      return row.map((cell) => {
        if (incrementedSum[incrementedSum.length - 1][id].id === cell.id) {
          return {
            ...cell,
            value: Math.floor(newAverageNumbers / incrementedSum.length),
          }
        } else {
          return cell
        }
      })
    })
    setNumbers(incrementedAverageNumbers)
  }

  function deleteRow(index) {
    const deletedRow = numbers.filter((row) => {
      return numbers[index] !== row
    })

    let deletedSumNumbers = []
    deletedRow[0].forEach(() =>
      deletedSumNumbers.push({ value: 0, id: createId() })
    )

    for (let i = 0; i < deletedRow.length; i++) {
      for (let g = 0; g < deletedRow[i].length; g++) {
        deletedSumNumbers[g].value += deletedRow[i][g].value
      }
    }

    const newDeletedAverage = deletedSumNumbers.map((el) => {
      return { ...el, value: Math.floor(el.value / deletedRow.length) }
    })

    const newAverageNumbers = deletedRow.map((element) => {
      if (deletedRow.indexOf(element) === deletedRow.length - 1) {
        return element.map((el) => {
          return {
            ...el,
            value:
              newDeletedAverage[deletedRow[deletedRow.length - 1].indexOf(el)]
                .value,
          }
        })
      } else {
        return element
      }
    })
    setNumbers(newAverageNumbers)
  }

  return (
    <div className="App">
      <table align="center">
        <tbody>
          {numbers.map((row, rowIndex) => {
            return (
              <tr key={rowIndex}>
                <td>
                  <MdDelete
                    onClick={() => {
                      deleteRow(rowIndex)
                    }}
                  />
                </td>
                {row.map((cell, id) => {
                  return (
                    <td
                      onClick={() => {
                        incrementCount(cell, id)
                      }}
                      key={id}
                    >
                      {cell.value}
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
