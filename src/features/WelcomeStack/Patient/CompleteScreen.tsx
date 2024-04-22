import React, { useState } from 'react';
import Header from '../../../component/Header/Header';
import { Footer } from '../../../component/Footer';
import welcomePatientImage  from '../../../assets/images/4_Home_Patient_3.0.png';
import CustomInput from '../../../component/CustomInput';

const CompleteScreen = () => {
  return (
    <div >
    <div className="row">
        <Header/>
    </div>
    <div className="row d-flex justify-content-center align-items-center px-2 mx-2 px-md-5 mx-md-5" style={{minHeight:'78dvh'}}>
        <div className='col-12 col-md-6 order-md-1 order-2 d-flex flex-column justify-content-center align-items-center'>
            <h3>Getting Started 3 of 3</h3>

             <div className="row">
             <h1>Complete your ADLi Profile</h1>
             <h4>Please provide the email you'd like to use to log into your account, your cell phone number, and create a password.</h4>
             
             </div>

            <CustomInput placeholder='Login email' value='' type='text' />
            <CustomInput placeholder='Cell phone' value='' type='text' />
            <CustomInput placeholder='Password' value='' type='password' icon={true}/>
            <p>Password must contain at least 10 characters including a symbol, upper and lowercase letters, and a number</p>
            <CustomInput placeholder='Confirm Password' value='' type='password' icon={true}/>
            
            <div className="row d-flex flex-column">
                <button className='button-primary'>Create Account</button>
            </div>
        </div>
        <div className='col-12 col-md-6 order-md-2 order-1'><img style={{width:'100%'}} src={welcomePatientImage} alt="" /></div>
    </div>
    <div className="row">
        <Footer/>
    </div>
</div>
  )
}

export default CompleteScreen