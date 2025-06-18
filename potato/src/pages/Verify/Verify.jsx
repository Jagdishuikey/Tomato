import React from 'react'
import './Verify.css'
import { useSearchParams } from 'react-router-dom'
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext'; 
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
const Verify = () => {

    const [searchParams,setSearchParams] =useSearchParams();
    const success=searchParams.get("success")
    const orderId=searchParams.get("orderId")
    const {url} =useContext(StoreContext);
    const navigate =useNavigate();

        const verifyPayment =async()=>{
            const response = await axios.post(url+"/api/error/verify",{success,orderId})
            if(response.data.success){
                navigate("/myorders");

            }else{
                navigate("/")
            }
        }
        useEffect(()=>{
           verifyPayment() ;
        },[])


  return (
    <div className='verify'>
        <div className="Message">
            <h2>Your Order Is Veriified It will Be Delivered Soon!</h2>

        </div>
      
    </div>
  )
}

export default Verify
