import React from 'react'
import {Container,Logo,LogoutBtn} from "../index"
import { useNavigation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state)=>state.auth.status)
  const navigate = useNavigation()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]


  return (
    <div>
      Header
    </div>
  )
}

export default Header
