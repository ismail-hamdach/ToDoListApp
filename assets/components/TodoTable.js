import React, { useContext } from 'react'
import {TodoContext} from '../contexts/TodoContext'

const TodoTable = () => {
    const context = useContext(TodoContext)
    return(
        <div>
            {context.todos.map((todos) => (
                <div key={todos.task + 'id'}>
                    {todos.task}
                </div>
            ))}
        </div>
    )
}


export default TodoTable