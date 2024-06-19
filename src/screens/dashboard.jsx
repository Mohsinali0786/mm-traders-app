import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import  EnhancedTable from  '../components/table'
import CircularProgressWithLabel from '../components/spinner'
export default function Dashboard(){
    const [totalUsers , setTotalUsers] = useState()
    useEffect(()=>{
        let totalUsers = JSON.parse(localStorage?.getItem('totalUsers'))
    setTotalUsers(totalUsers ? totalUsers : {admin : 0 ,user :0})
    },[totalUsers])
return(
    <>
        <Navbar />
        <div className='d-flex justify-content-evenly my-2'>
            <div className='bg-danger admin-boxes d-flex justify-content-center align-items-center flex-column'><span>Users</span><div className='mx-4'>{totalUsers?.user}</div></div>
            <div className='bg-warning admin-boxes d-flex justify-content-center align-items-center flex-column'><span>Admin</span><span className='mx-4'>{totalUsers?.admin}</span></div>
        </div>
        <div className='m-2'>
            {
                
            }
        <EnhancedTable/>
        </div>
    </>
)
}