import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';
import './AddData.css'
import {useNavigate, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { addData, getSingleData, updateData } from '../redux/actions';

export const EditData = () => {

  let navigate = useNavigate()

  let dispatch = useDispatch()

  const handleInputChange = (e) => {
    let {name, value} = e.target;
    setState({...state, [name] : value})
  }

  const [error, setError] = useState("")

  let {id} = useParams()

  const {teacher} = useSelector(state => state.data)

  const handleSubmit = (e) => {
    e.preventDefault()
      if(!name || !classes || !subject || !age){
        setError("Please fill all the input field")
      } else {
        dispatch(updateData(state, id))
        navigate("/")
        setError("")
      }
  }

  const [state, setState] = useState(
   {
    name: "",
    classes: "",
    subject: "",
    age: ""
   }
  )

  const {name, classes, subject, age} = state;

  useEffect(() => {
    dispatch(getSingleData(id))
  },[])

  useEffect(() => {
      if(teacher){
          setState({...teacher})
      }
  }, [teacher])

  return (
    <div>
    <h1>Edit Data of Teachers</h1>
    {error && <h4 style={{color: "red"}}>{error}</h4>}
       <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '45ch' },
      }}
      noValidate
      autoComplete="off" onSubmit={handleSubmit}
    >
      <TextField id="outlined" label="Teacher Name" variant="outlined" name="name" value={name || ""} type="text" 
        onChange={handleInputChange}
      />
      <br />
      <TextField id="outlined" label="Class" variant="outlined" name="classes" value={classes || ""} type="number" onChange={handleInputChange}/>
      <br />
      <TextField id="outlined" label="Subject" variant="outlined" name="subject" value={subject || ""} type="text"  onChange={handleInputChange}/>
      <br />
      <TextField id="outlined" label="Age" variant="outlined" name="age" value={age || ""} type="number"  onChange={handleInputChange}/>
      <br />
      <ButtonGroup id="btnGrp" variant="contained" aria-label="outlined primary button group">
          <Button id='btn1' color='secondary' onClick={() => navigate("/")}>Go back</Button>

          <Button id='btn' type="submit" color='primary'>Update</Button>
      </ButtonGroup>
    </Box>
    </div>
  )
}
