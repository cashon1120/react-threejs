import React from 'react'
import {Link} from 'react-router-dom';

const Header = () => (
  <ul className="header">
    <li>
      <Link to='/'>首页</Link>
      <Link to='/line'>线条</Link>
      <Link to='/geometry'>几何体</Link>
      <Link to='/ion'>离子效果</Link>
    </li>
  </ul>
)

export default Header