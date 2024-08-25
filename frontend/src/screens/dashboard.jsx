import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import  EnhancedTable from  '../components/table'
import CircularProgressWithLabel from '../components/spinner'
import { GetAllUsers } from '../commonFunctions/getAllUsers'
export default function Dashboard(){
    const [totalUsers , setTotalUsers] = useState({admin:0 , user:0})
    const [allData , setAllData] = useState([])
    // useEffect(()=>{
    // setTotalUsers(totalUsers ? totalUsers : {admin : 0 ,user :0})
    // },[])
    useEffect(() => {
        getData()
        console.log("Get Data");
    }, [totalUsers]);
    const getData = async (e) => {
          let res = await GetAllUsers();
          console.log('Ressssssss',res)
          if(res?.adminUser > totalUsers?.adminUser || res?.user > totalUsers?.user ) {
              setTotalUsers({admin:res?.adminUser , user:res?.user})
              setAllData(res?.data)
          }
      };
      console.log('Alll',allData)
return(
    <>
        {/* <Navbar /> */}
        <div className='d-flex justify-content-evenly my-2'>
            <div className='bg-danger admin-boxes d-flex justify-content-center align-items-center flex-column'><span>Users</span><div className='mx-4'>{totalUsers?.user}</div></div>
            <div className='bg-warning admin-boxes d-flex justify-content-center align-items-center flex-column'><span>Admin</span><span className='mx-4'>{totalUsers?.admin}</span></div>
        </div>
        <div className='m-2'>
            {
                
            }
        <EnhancedTable data={allData}/>
        </div>
    </>
)
}