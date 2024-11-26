import "./index.css"

import React ,{useEffect,useState} from 'react'

import axios from 'axios'

import { MdDelete } from "react-icons/md";

const Home = () => {
    const [todoList,setTodoList] = useState([])
    const [newtodo,setTodo] = useState([])
    useEffect(() => {
        axios.get("http://localhost:5000/gettask").then(
            arr => setTodoList(arr.data) 
        )
    })

    const onInputChange = (event) => {
        setTodo(event.target.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault()
        axios.post("http://localhost:5000/addtask", {todo:newtodo}).then(
            arr => setTodoList(arr.data) 
        )
        setTodo("")

    }

    const ondeleteHandler = (id) => {
        axios.delete(`http://localhost:5000/delete/${id}`).then(
            arr => setTodoList(arr.data) 
        )

    }
    return(
        <div className="main-bg">
            <h1>Todos</h1>
            <form onSubmit={onSubmitHandler} className="form-styling">
                <input type="text" value= {newtodo} onChange={onInputChange} className="input-styling" placeholder="Add a Todo"/>
                <button type="submit" className="button-styling">Add</button>
            </form>
            {
                todoList.map(
                    eachTodo => (
                    <div key={eachTodo._id} className="todo-container">
                        <h2 className="eachTodo">{eachTodo.todo}</h2>
                        <button className="delete-button"><MdDelete className="delete-icon" onClick={() => ondeleteHandler(eachTodo._id)}/></button>
                    </div>
                    )
                )
            }
        </div>
    )
}


export default Home 