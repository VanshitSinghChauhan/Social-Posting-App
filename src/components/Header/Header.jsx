import React from 'react'
import {Container, Logo, LogoutButton} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

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
    <header className='sticky top-0 z-20 border-b border-slate-300 bg-slate-900/95 py-3 shadow-md backdrop-blur'>
      <Container>
        <nav className='flex items-center gap-4'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='90px' className='text-white' />
              </Link>
          </div>
          <ul className='ml-auto flex flex-wrap items-center gap-2'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className='inline-block rounded-md border border-slate-500 px-4 py-2 text-sm font-medium text-slate-100 transition duration-200 hover:border-blue-400 hover:bg-blue-500 hover:text-white'
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
                <LogoutButton />
              </li>
            )}
          </ul>
        </nav>
        </Container>
    </header>
  )
}

export default Header