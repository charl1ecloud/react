import React, {useRef,useState} from 'react'
import {Card, Form, Button, Alert} from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { Link,useNavigate} from 'react-router-dom'




export default  function Login() {
    /* some initialization */
    const emailRef = useRef()
    const passwordRef = useRef()
    const usernameRef = useRef()
    const nav = useNavigate()

    const {login} = useAuth()
    const [error, SetError] = useState('') /* initialize error as empty */
    const [loading, SetLoading] = useState(false)/* initialize loading as not loading */

    async function handleSubmit(e){
        e.preventDefault()
        

        try{
            SetError('')
            SetLoading(true) /* it is loading, button diabled*/
            await login(usernameRef.current.value, passwordRef.current.value)
            nav('/Dashboard')/* go to dashboard */
        } catch{
            SetError('failed to Login')
        }
        SetLoading(false)/* set loading back to not loading */

        
        
    }




  return (
      <>
      <div>
      <Card style={{ width: '18rem', margin: 'auto',}}>
          <Card.Body className='mx-auto'>
              <h2 className='text-center mb-4'>Log In</h2>

              {/* only display if theres an error */}
              {error && <Alert variant="danger">{error}</Alert>} 

              <Form onSubmit={handleSubmit} style={{}}>
                  <Form.Group id="username">
                      <Form.Label>Username</Form.Label>
                      <Form.Control type="username" ref={usernameRef} required/>
                  </Form.Group>
                  <Form.Group id="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password"  ref={passwordRef} required/>
                  </Form.Group>
                  
                  <Button disabled={loading} className='w-100' type="submit"> Log In</Button>
                  
              </Form>

          </Card.Body>
      </Card>
      </div>
      <div className='text-center mb-4'>
        Don't have an account?<Link to="/Signup">Sign Up!</Link>
      </div>
      
      
      </>
    
  )
}
