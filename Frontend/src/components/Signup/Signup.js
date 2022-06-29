import React, {useRef,useState} from 'react'
import {Card, Form, Button, Alert} from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'


export default  function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const usernameRef = useRef()
    const {signup} = useAuth() /* get signup method in Authcontext*/
    const [error, SetError] = useState('')
    const [message, Setmessage] = useState('Welcome')
    const [loading, SetLoading] = useState(false)
    const nav = useNavigate()
    
    
    
  
    async function handleSubmit(e){
        e.preventDefault()
        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return SetError('Password Do not match')
        }/* if password check does not pass when signing up*/

        if(passwordRef.current.value.length < 5){
            return SetError('Password at least 5 characters')
        }/* if password check does not pass when signing up*/

        try{
            SetError('')
            SetLoading(true)
            const response = await signup(usernameRef.current.value, emailRef.current.value, passwordRef.current.value)
            Setmessage(response)
        
        } catch{
            SetError('failed to create an account')
        }
      
        
        SetLoading(false)
    }

    function debug(){
        

        axios.get("/debug?e=jackma2333@gmail.com")
            .then(response => {console.log(response)})
            

        
  
    }




  return (
      <>
      <div>
      <Card style={{ width: '18rem', margin: 'auto',}}>
          <Card.Body className='mx-auto'>
              <h2 className='text-center mb-4'>Sign Up</h2>

              {/* only display if theres an error */}
              {error && <Alert variant="danger">{error}</Alert>} 

              <Form onSubmit={handleSubmit} style={{}}>
                    <Form.Group id="username">
                      <Form.Label>Username</Form.Label>
                      <Form.Control type="username" ref={usernameRef} required/>
                  </Form.Group>
                  <br></br>
                  <Form.Group id="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" ref={emailRef} required/>
                  </Form.Group>
                  <br></br>
                  <Form.Group id="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" ref={passwordRef} required/>
                  </Form.Group>
                 
                  <Form.Group id="password-confirm">
                      <Form.Label>Password Confirmation</Form.Label>
                      <Form.Control type="password" ref={passwordConfirmRef} required/>
                  </Form.Group>
                  <br></br>
                  <Button disabled={loading} className='w-100' type="submit"> Sign up</Button>
                  
                  
              </Form>
              <br></br>
              <Button onClick={debug} className='w-100'> Debug </Button>

          </Card.Body>
      </Card>
      </div>
      <div className='text-center mb-4'>
        Already have an account? <Link to="/Login">Log in!</Link>
      </div>
      <div className='text-center mb-4'>
      {message != "Welcome" && <Alert variant="info">{message}</Alert>}
      </div>
      
      
      </>
    
  )
}

