import React, {useState,useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Paper from '@mui/material/Paper';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTeacher, loadTeachers } from '../redux/actions';
import {Navbar} from './Navbar'
import axios from 'axios';
import {useNavigate} from "react-router-dom"


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

export const Home = () => {
    let dispatch = useDispatch()
    const {teachers} = useSelector(state => state.data)
    const navigate = useNavigate()

    const [data, setData] = useState([])

    const [value, setValue] = useState("")

    const [sortValue, setSortValue] = useState("")

    const sortOptions = ["name", "classes", "subject", "age"]


    useEffect(() => {
        dispatch(loadTeachers())
    }, [])

    useEffect(() => {
        loadTeacherData()
    }, [])

    const loadTeacherData = async () => {
        return await axios.get("http://localhost:5000/teacher")
        .then((res) => setData(res.data))
        .catch((err) => console.log(err))
    }

    const handleDelete = (id) => {
        if(window.confirm("Are you sure wanted to delete the date?")){
            dispatch(deleteTeacher(id))
        }
    }

    const handleReset = () => {
       loadTeacherData()
    }

    const handleSearch = async (e) => {
        e.preventDefault()
        return await axios.get(`http://localhost:5000/teacher?q=${value}`)
        .then((res) => {
            console.log(res)
            setData(res.data)
            setValue("")
        })
        .catch((err) => console.log(err))
    }

    const handleSort = async (e) => {
        let value = e.target.value;
        setSortValue(value)
        return await axios.get(`http://localhost:5000/teacher?_sort=${value}&_order=asc`)
        .then((res) => {
            console.log(res)
            setData(res.data)
        })
        .catch((err) => console.log(err))
    }

    const handleFilter = async (value) => {
        return await axios.get(`http://localhost:5000/teacher?subject=${value}`)
        .then((res) => {
            console.log(res)
            setData(res.data)
        })
        .catch((err) => console.log(err))
    }

  return (
    <div>
    <Navbar/>

    <br />

    <h1>Teacher Details</h1>
        <form onSubmit={handleSearch}>
            <input style={{width: "200px", height: "40px", outline: "none", border: "none"}} type="text" className='form-control' 
            placeholder=' Search Name'
            value={value}
            onChange = {(e) => setValue(e.target.value)}
            />
            <br />
            <br />
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button color='error' type="submit" onClick={handleSearch}>Search</Button>
                <Button color='secondary' onClick={handleReset}>Reset</Button>
                </ButtonGroup>
        </form>
        <br />
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Teacher Name</StyledTableCell>
            <StyledTableCell align="right">Class</StyledTableCell>
            <StyledTableCell align="right">Subject</StyledTableCell>
            <StyledTableCell align="right">Age</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((teacher) => (
            <StyledTableRow key={teacher.id}>
              <StyledTableCell component="th" scope="row">
                {teacher.name}
              </StyledTableCell>
              <StyledTableCell align="right">{teacher.classes}</StyledTableCell>
              <StyledTableCell align="right">{teacher.subject}</StyledTableCell>
              <StyledTableCell align="right">{teacher.age}</StyledTableCell>
              <StyledTableCell align="right">
              <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button color='error' onClick={() => handleDelete(teacher.id)}>Delete</Button>
                <Button color='primary' onClick={() => navigate(`/editData/${teacher.id}`)}>Edit</Button>
                </ButtonGroup>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <div style={{float: "left", marginLeft: "5px"}}>
            <h3>Sort by:</h3>
            <select onChange={handleSort} value={sortValue}>
                <option>Please Select Value</option>
                {sortOptions.map((item, index) => {
                    return <option value={item} key={index}>{item}</option>
                })}
            </select>
        </div>
        <div style={{float: "right", marginLeft: "5px"}}>
            <h3>Filter by:</h3>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button color='error' type="submit" onClick={() => handleFilter("Math")}>Math</Button>
                <Button color='secondary' onClick={() => handleFilter("English")}>English</Button>
                </ButtonGroup>
        </div>
    </div>
  )
}
