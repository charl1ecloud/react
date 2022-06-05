/* Member dashboard after signing in*/

import React from "react";
import { Card } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
export default function Dashboard() {
    const {logout} = useAuth()/* get logout function and currentuser value from AuthContext*/
    const {currentUser} = useAuth()
    const nav = useNavigate()

    async function  handlelogout(e){
        await logout() /* wait for logout function*/
        
        nav('/Login')/* then go back to login */
        console.log(currentUser)


    }

  return (


    <Card>
      <Card.Body>
        <h2>Hello, user</h2> {currentUser.email}
      </Card.Body>
      <Button onClick = {handlelogout} variant="link">Log Out</Button>

    </Card>
  );
}
