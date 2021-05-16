import React, { createContext } from 'react'
import axios from 'axios'

export const TodoContext = createContext()

class TodoContextProvider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: [],
        };
        this.readTodo()
    }


    readTodo(){
        axios.get('/api/todo/read')
            .then(response => {
                this.setState({
                    todos: response.data
                })
            })
            .catch(e =>{
                console.log(e)
            })
    }

    creatTodo (event, todo) {
        event.preventDefault();
        let data = [...this.state.todos]
        data.push(todo)
        this.setState({
            todos: data,
        })
    }


    updateTodo (data) {
        let todos = [...this.state.todos]
        let todo = todos.find(todo => {
            return todo.id === data.id
        })

        todo.name = data.name;
        todo.duration = data.duration;

        this.setState({
            todos: todos,
        })
        console.log(this.state.todos)
    }

    deleteTodo (data) {
        let todos = [...this.state.todos]
        let todo = todos.find(todo => {
            return todo.id === data.id
        })
        todos.splice(todos.indexOf(todo), 1)
        this.setState({
            todos: todos,
        })
    }

    render() {
        return(
            <TodoContext.Provider value={{
                ...this.state, 
                creatTodo: this.creatTodo.bind(this),
                
                updateTodo: this.updateTodo.bind(this),
                deleteTodo: this.deleteTodo.bind(this)
    
            }}>
                {this.props.children}
            </TodoContext.Provider>
        )
    }
}

export default TodoContextProvider