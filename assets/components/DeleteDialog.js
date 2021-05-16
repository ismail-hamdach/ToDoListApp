import React, { useContext } from 'react'
import Dialog from '@material-ui/core/Dialog'
import { Button, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import PropTypes from 'prop-types'
import {TodoContext} from '../contexts/TodoContext'



const DeleteDialog = (props) => {
    const context = useContext(TodoContext)
    const hide = () => {
        props.isShown(false)
    }
    return(
        <Dialog open={props.open} onClose={hide} maxWidth='sm'>
            <DialogTitle>
                Are you sure you wish delete this item
            </DialogTitle>
            <DialogContent>
                //task
            </DialogContent>
            <DialogActions>
                <Button onClick={hide}>
                    Cancel
                </Button>
                <Button onClick={() => {
                    context.deleteTodo(props.todo)
                    hide()
                }}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}


DeleteDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    isShown: PropTypes.func.isRequired,
    todo: PropTypes.shape = ({
        id: PropTypes.number,
        name: PropTypes.string,
        duration: PropTypes.string,
    })
}

export default DeleteDialog