import React, { createContext, useState } from 'react'


export const TodoContext = createContext()

class TodoContextProvider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: [],
        };
    }

    creatTodo () {

    }

    readTodo () {

    }

    updateTodo () {

    }

    deleteTodo () {

    }

    render() {
        return(
            <TodoContext.Provider value={{
                ...this.state, 
                creatTodo: this.creatTodo.bind(this),
                readTodo: this.readTodo.bind(this),
                updateTodo: this.updateTodo.bind(this),
                deleteTodo: this.deleteTodo.bind(this)
    
            }}>
                {this.props.children}
            </TodoContext.Provider>
        )
    }
}

export default TodoContextProvider