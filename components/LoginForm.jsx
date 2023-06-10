import React, { useRef, useState } from 'react'
import Input from './input'
import { ValidateForm } from '../utils/ValidateForm';
import axios from 'axios';
import { useRouter } from 'next/router';

const LoginForm = () => {
  
  const router =useRouter()
  const [values,setValues] = useState({
    username:'',
    password:''
  })
  const [errors,setErrors] =useState({
    username:'',
    password:''
  })
  const [responseError, setResponseError] = useState('');
  console.log(errors);

  const inputs =[{
    id:1,
    name:'username',
    type:'text',
    placeholder:'Username',
    label:'Username',
    error :errors.username
  },
{
  id:2,
  name:'password',
  type:'text',
  placeholder:'Password',
  label:'Password',
  error :errors.password
}]

 
const onChange=(e)=>{
  setValues({...values,[e.target.name]:e.target.value})
  setErrors({...errors,[e.target.name]:''})
}
const onSubmit= async (e)=>{
  e.preventDefault()
  const errors =ValidateForm(values)
  if (Object.keys(errors).length===0){
    try {
      const response =await axios.post('/api/login',values)
      setResponseError(null)
      console.log(response.data);
      router.push('/dashboard')
    } catch (error) {
      const response =error.response.data.error
      setResponseError(response)
    }
  }
  else{
    setErrors(errors)
  }
  
}

  return (
    <div>
      <form onSubmit={onSubmit}>
        {inputs.map(input=><Input key={input.id} {...input} value={values[input.name]} onChange={onChange} ></Input>)}
        <p>{responseError}</p>
        <button>submit</button>
      </form>
    </div>
  )
}

export default LoginForm