import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';
import './AddData.css'
import {useNavigate, useParams} from 'react-router-dom'

export const Login = () => {
    let navigate = useNavigate()
  return (
    <div>
    <h1>Login Here</h1>
   
       <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '45ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined" label="Name" variant="outlined" name="name" type="text" 
      />
      <br />
      <TextField id="outlined" label="Password" variant="outlined" name="password" type="password" />
      
      <br />
      <ButtonGroup id="btnGrp" variant="contained" aria-label="outlined primary button group">
          <Button id='btn1' color='secondary' onClick={() => navigate("/")}>Go back</Button>

          <Button id='btn' type="submit" color='primary'>Update</Button>
      </ButtonGroup>
    </Box></div>
  )
}
