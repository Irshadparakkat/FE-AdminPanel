
import React from 'react'
import DataTableDropMenu from './DataTableDropMen'
import UserLayout from '@/layout/UserLayout'
import UpdatePanel from '@/components/FreequancyPanel'
import UpdateApiKeyPanel from '@/components/UpdateApiKeyPanel'

export default function ApiKeyModule({config}) {
  return (
    <UserLayout>
      <UpdateApiKeyPanel config={config}
        DataTableDropMenu={DataTableDropMenu}
      />
    </UserLayout>
  )
}

