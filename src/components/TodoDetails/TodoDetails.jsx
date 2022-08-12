import React, {useEffect, useState} from 'react';
import {Link as RouterLink, useParams} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {getTodoDetailsAction, updateTodoInfoAction} from '../../store/actions';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import {Formik, Form, Field, ErrorMessage} from 'formik'

function TodoDetails() {
    let {id} = useParams();

    const [todo, setTodo] = useState({
        task: '',
        status: false,
    });

    const dispatch = useDispatch();

    useEffect(() => {
        async function getTodoInfo() {
            const todoInfo = await dispatch(getTodoDetailsAction(id));
            setTodo(todoInfo);
        }

        getTodoInfo();
    }, [id])


    function onSubmit(value) {
        dispatch(updateTodoInfoAction(id, value))
    }

    function validateTask(value) {
        if (!value.length) {
            return 'Field is required';
        }
    }

    return (
        <>
            <Container maxWidth="sm">
                <Link component={RouterLink} to="/" color="black" underline="black">BACK</Link>

                <h2>Details</h2>
                <p><strong>Task:</strong> {todo.task}</p>
                <p><strong>Status:</strong> {todo.status ? 'done' : 'in progress'}</p>

                <Divider/>

                <Formik
                    initialValues={todo}
                    enableReinitialize={true}
                    onSubmit={onSubmit}>
                    {
                        (formik) => (
                            <Form>
                                <Field name="task" type="text" value={formik.values.task}
                                       onChange={formik.handleChange} validate={validateTask}/>
                                <Field name="status" type="checkbox" checked={formik.values.status}
                                       onChange={formik.handleChange}/>
                                <button type="submit"
                                        disabled={formik.isSubmitting || !formik.dirty || !formik.isValid}>Save
                                </button>
                                <ErrorMessage name="task" component="div"/>
                            </Form>
                        )
                    }
                </Formik>
            </Container>
        </>
    )
}

export default TodoDetails;