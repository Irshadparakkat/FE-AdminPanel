import { Table } from 'antd';
import React, { useState, useEffect } from 'react';
import TableResposiveList from '../TableResposiveList'
export default function TableResponsive(Props){
    
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
return <>
    { !isMobile && <Table {...Props} />}
    {isMobile &&
    <TableResposiveList {...Props}  />
}
</>
}