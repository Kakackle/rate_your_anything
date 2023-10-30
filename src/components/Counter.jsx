// example usage of global stores with redux
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../counter/counterSlice'

export default function Counter(){
    
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
    
    return (
        <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    )
}