

import Dashboard from '@/lib/components/dashboard/Dashboard'



const InstituteDashboardLayout = ({children}:Readonly<{children : React.ReactNode}>) => {
  return (
  <Dashboard>
    {children}
  </Dashboard>
  )
}

export default InstituteDashboardLayout