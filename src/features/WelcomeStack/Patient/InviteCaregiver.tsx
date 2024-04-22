import React, { useState } from 'react';
import Header from '../../../component/Header/Header';
import { Footer } from '../../../component/Footer';
import welcomePatientImage  from '../../../assets/images/4_Home_Patient_3.0.png';
import CustomInput from '../../../component/CustomInput';

const InviteCaregiver = () => {
  return (
    <div >
    <div className="row">
        <Header/>
    </div>
    <div className="row d-flex justify-content-center align-items-center px-2 mx-2 px-md-5 mx-md-5" style={{minHeight:'78dvh'}}>
        <div className='col-12 col-md-6 order-md-1 order-2 d-flex flex-column justify-content-start align-items-center'>
            <h3>Getting Started 2 of 3</h3>

             <div className="row">
             <h1>Invite Caregiver</h1>
             <h4>With ADLi, your caregiver may, from time to time, be asked to answer some questions about your life with AD. The answers may help your doctor manage your condition.</h4>
             <h4>Would you like to invite a caregiver to enroll in ADLi?</h4>
             </div>

           
            <CustomInput placeholder='Caregiver First Name' value='' type='text' />
            <CustomInput placeholder='Caregiver Last Name' value='' type='text' />
            <CustomInput placeholder='Caregiver Email' value='' type='email' />
            <CustomInput placeholder='Confirm Caregiver Email' value='' type='email' />
            
            <div className="row d-flex flex-column">
                <button className='button-secondry'>Send Invite</button>
                <button className='button-primary'>Next</button>
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

export default InviteCaregiver