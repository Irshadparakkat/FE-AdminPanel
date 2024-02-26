import UserPanel from '@/components/UserPanel'
import React from 'react'
import DataTableDropMenu from './DataTableDropMen'
import UserLayout from '@/layout/UserLayout'

export default function UserModule({config}) {
  return (
    <UserLayout>
      <UserPanel config={config}
        DataTableDropMenu={DataTableDropMenu}
      />
    </UserLayout>
  )
}

