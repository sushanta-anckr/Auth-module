import { useSelector } from "react-redux"
import { RootState } from "../app/store"

const Home = () => {
  const {user} =useSelector((state:RootState)=>state.user);
 
  return (
    <div className='flex flex-col justify-center items-center h-[80vh]'>
   
        <div>
          <h2>Welcome,{user?.username} </h2>
          <p>This is protected Home page.</p>
        </div>
    </div>
  )
}

export default Home