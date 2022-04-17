import * as types from './actionType'
import axios from 'axios'

const getTeachers = (teachers) => ({
    type: types.GET_TEACHERS,
    payload: teachers
})

const teacherDeleted = () => ({
    type: types.DELETE_TEACHER
})

const dataAdded = () => ({
    type: types.ADD_DATA
}) 

const dataUpdated = () => ({
    type: types.UPDATE_DATA
}) 

const getData = (teacher) => ({
    type: types.GET_SINGLE_DATA,
    payload: teacher
})

export const loadTeachers = () => {
    return function (dispatch){
        axios.get("http://localhost:5000/teacher")
        .then((res) => {
            console.log(res)
            dispatch(getTeachers(res.data))
        })
        .catch((err) => console.log(err))
    }
}

export const deleteTeacher = (id) => {
    return function (dispatch){
        axios.delete(`http://localhost:5000/teacher/${id}`)
        .then((res) => {
            console.log(res)
            dispatch(teacherDeleted())
            dispatch(loadTeachers())
        })
        .catch((err) => console.log(err))
    }
}

export const addData = (data) => {
    return function (dispatch){
        axios.post(`http://localhost:5000/teacher`, data)
        .then((res) => {
            console.log(res)
            dispatch(dataAdded())
            dispatch(loadTeachers())
        })
        .catch((err) => console.log(err))
    }
}

export const getSingleData = (id) => {
    return function (dispatch){
        axios.get(`http://localhost:5000/teacher/${id}`)
        .then((res) => {
            console.log(res)
            dispatch(getData(res.data))
        })
        .catch((err) => console.log(err))
    }
}

export const updateData = (teacher,id) => {
    return function (dispatch){
        axios.put(`http://localhost:5000/teacher/${id}`, teacher)
        .then((res) => {
            console.log(res)
            dispatch(dataUpdated())
        })
        .catch((err) => console.log(err))
    }
}