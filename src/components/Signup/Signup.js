import React, {useRef,useState} from 'react'
import {Card, Form, Button, Alert} from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { Link,useNavigate } from 'react-router-dom'


export default  function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {signup} = useAuth() /* get signup method in Authcontext*/
    const [error, SetError] = useState('')
    const [loading, SetLoading] = useState(false)
    const nav = useNavigate()

    async function handleSubmit(e){
        e.preventDefault()
        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return SetError('Password Do not match')
        }/* if password check does not pass when signing up*/

        try{
            SetError('')
            SetLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            nav('/Login')/* use signup method in firebase to create user in database */
        } catch{
            SetError('failed to create an account')
        }
        SetLoading(false)

        
        
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
                  <Form.Group id="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" ref={emailRef} required/>
                  </Form.Group>
                  <Form.Group id="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" ref={passwordRef} required/>
                  </Form.Group>
                  <Form.Group id="password-confirm">
                      <Form.Label>Password Confirmation</Form.Label>
                      <Form.Control type="password-confirm" ref={passwordConfirmRef} required/>
                  </Form.Group>
                  <Button disabled={loading} className='w-100' type="submit"> Sign up</Button>
                  
              </Form>

          </Card.Body>
      </Card>
      </div>
      <div className='text-center mb-4'>
        Already have an account? <Link to="/Login">Log in!</Link>
      </div>
      
      
      </>
    
  )
}
