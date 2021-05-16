import React, { Fragment, useContext, useState } from 'react'
import { Table, TableHead, TableRow, TableCell, TableBody, IconButton, TextField, InputAdornment } from '@material-ui/core'
import {TodoContext} from '../contexts/TodoContext'

import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

import DeleteDialog from './DeleteDialog'

const TodoTable = () => {

    const context = useContext(TodoContext)
    const [addTodo, setAddToDo] = useState({
        name: '',
        duration: ''
    })
    const [editShown, setEditShown] = useState(false)
    const [editTodo, setEditTodo] = useState(null)
    const [deleteConfirmationIsShown, setDeleteConfirmationIsShown] = useState(false)
    const [todoToBeDeleted, setTodoToBeDeleted] = useState(null)

    return(
        <Fragment>
            <form onSubmit={(event) => {
                    if(addTodo.name !== '')
                        context.creatTodo(event, addTodo)
                    else 
                        event.preventDefault();
                }}>
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Task
                            </TableCell>
                            <TableCell>
                                Duration
                            </TableCell>
                            <TableCell>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    
                    <TableBody>

                        <TableRow>
                            <TableCell>
                                <TextField label="New Task" required placeholder={'Name'} fullWidth={true} onChange={(event) => {
                                    setAddToDo({
                                        name: event.target.value,
                                        duration : addTodo.duration,
                                    })
                                }} />
                            </TableCell>
                            <TableCell>
                                <TextField label="New Task" placeholder={'Duration'} fullWidth={false} onChange={(event) => {
                                    setAddToDo({
                                        name: addTodo.name,
                                        duration: event.target.value
                                    })
                                }} />
                            </TableCell>
                            <TableCell>
                                <IconButton type="submit">
                                    <AddIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>

                        {context.todos.slice().reverse().map((todo, index) => (
                            <TableRow key={'todo' + index}>
                                <TableCell>
                                    {editShown !== todo.id ? 
                                        todo.name 
                                        :
                                        <TextField value={editTodo.name} onChange={(event) => {
                                                setEditTodo({
                                                    id: editTodo.id,   
                                                    name : event.target.value,
                                                    duration : editTodo.duration
                                                })
                                            }}
                                        />    
                                }
                                </TableCell>

                                <TableCell>
                                    {editShown !== todo.id ? 
                                        todo.duration 
                                        :
                                        <TextField value={editTodo.duration} onChange={(event) => {
                                            setEditTodo({
                                                    id: editTodo.id,   
                                                    name : editTodo.name,
                                                    duration : event.target.value,
                                                })
                                            }}
                                        />
                                    }
                                </TableCell>
                                
                                <TableCell>
                                    {editShown === todo.id ?
                                        <Fragment>
                                            <IconButton onClick={() => {
                                                context.updateTodo(editTodo)
                                                setEditShown(null)
                                            }} >
                                                <DoneIcon />
                                            </IconButton>
                                            <IconButton onClick={() => {
                                                setEditShown(null)
                                            }} >
                                                <CloseIcon />
                                            </IconButton>
                                        </Fragment>
                                        :
                                        
                                    <Fragment>
                                        <IconButton onClick={() => {
                                            setEditShown(todo.id)
                                            setEditTodo(todo)
                                        }}> <EditIcon /> </IconButton>
                                        <IconButton onClick={() => {
                                            setTodoToBeDeleted(todo)
                                            setDeleteConfirmationIsShown(true)
                                        }} > <DeleteIcon /> </IconButton>
                                    </Fragment>
                                }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </form>
            {deleteConfirmationIsShown && (
                <DeleteDialog todo={todoToBeDeleted} open={deleteConfirmationIsShown} isShown={setDeleteConfirmationIsShown} />
            )
            }
        </Fragment>
    )
}


export default TodoTable