import {
  Outlet,
} from 'react-router'

import Header from '../components/layout/Header'

export default function RootLayout() {
  return (
    <div className="portal-shell">
      <Header />

      <Outlet />
    </div>
  )
}