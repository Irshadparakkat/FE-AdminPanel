
import React from 'react'
import DataTableDropMenu from './DataTableDropMen'
import UserLayout from '@/layout/UserLayout'
import FreequancyPanel from '@/components/FreequancyPanel'

export default function FreequancyModule({config}) {
  return (
    <UserLayout>
      <FreequancyPanel config={config}
        DataTableDropMenu={DataTableDropMenu}
      />
    </UserLayout>
  )
}

