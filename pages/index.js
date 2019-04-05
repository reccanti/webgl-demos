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
      <li>
        <Link href="/demos/02-2D-transform">2D Matrix Transform</Link>
      </li>
      <li>
        <Link href="/demos/03-orthographic-3D-transform">Orthographic 3D Transform</Link>
      </li>
      <li>
        <Link href="/demos/test-demo-canvas">Test Demo Canvas</Link>
      </li>
    </ul>
  </div>
)

export default Home
