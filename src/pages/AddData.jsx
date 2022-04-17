import React, {useState} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';
import './AddData.css'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { addData } from '../redux/actions';

export const AddData = () => {

  let navigate = useNavigate()

  let dispatch = useDispatch()

  const handleInputChange = (e) => {
    let {name, value} = e.target;
    setState({...state, [name] : value})
  }

  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
      if(!name || !classes || !subject || !age){
        setError("Please fill all the input field")
      } else {
        dispatch(addData(state))
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

  return (
    <div>
    <h1>Add Data of Teachers</h1>
    {error && <h4 style={{color: "red"}}>{error}</h4>}
       <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '45ch' },
      }}
      noValidate
      autoComplete="off" onSubmit={handleSubmit}
    >
      <TextField id="outlined" label="Teacher Name" variant="outlined" name="name" value={name} type="text" 
        onChange={handleInputChange}
      />
      <br />
      <TextField id="outlined" label="Class" variant="outlined" name="classes" value={classes} type="number" onChange={handleInputChange}/>
      <br />
      <TextField id="outlined" label="Subject" variant="outlined" name="subject" value={subject} type="text"  onChange={handleInputChange}/>
      <br />
      <TextField id="outlined" label="Age" variant="outlined" name="age" value={age} type="number"  onChange={handleInputChange}/>
      <br />
      <ButtonGroup id="btnGrp" variant="contained" aria-label="outlined primary button group">
          <Button id='btn1' color='secondary' onClick={() => navigate("/")}>Go back</Button>

          <Button id='btn' type="submit" color='primary'>Submit</Button>
      </ButtonGroup>
    </Box>
    </div>
  )
}
