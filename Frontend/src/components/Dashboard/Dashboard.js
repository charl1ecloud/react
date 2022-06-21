/* Member dashboard after signing in*/
import React from "react";
import { Card } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";

import { Button } from "react-bootstrap";
import axios from 'axios'
import { useState} from "react";

export default function Dashboard() {
  const {currentUser,logout} = useAuth()
  const payload = new FormData()

  function getcurrentuser(){

    console.log(currentUser)
}

  
  return(

    <Card>
      <Card.Body>
        <h2>Hello, user</h2> {currentUser}
      </Card.Body>
      <Button onClick={getcurrentuser} variant="link">Getuser</Button>
      <Button onClick={logout} variant="link">Logout</Button>

    </Card>
  )
}
