import React from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'

const Home = () => (
  <div>
    <Head title="Home" />
    <Nav />
    <ul>
      <li>
        <Link href="/demos/01-basic-triangle">Basic Triangle</Link>
      </li>
    </ul>
  </div>
)

export default Home
