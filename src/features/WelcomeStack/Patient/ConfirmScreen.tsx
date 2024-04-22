import React, { useState } from 'react';
import Header from '../../../component/Header/Header';
import { Footer } from '../../../component/Footer';
import welcomePatientImage  from '../../../assets/images/4_Home_Patient_3.0.png';
import CustomInput from '../../../component/CustomInput';


const PatientConfirmScreen = () => {

  return (
    <div >
        <div className="row">
            <Header/>
        </div>
        <div className="row d-flex justify-content-center align-items-center px-2 mx-2 px-md-5 mx-md-5" style={{minHeight:'78dvh'}}>
            <div className='col-12 col-md-6 order-md-1 order-2 d-flex flex-column justify-content-center align-items-center'>
                <h3>Getting Started 1 of 3</h3>

                <h1>Confirm or Edit</h1>
                <h1>Your Information</h1>
                <CustomInput placeholder='First Name' value='roshan' type='text' />
                <CustomInput placeholder='Last Name' value='singh' type='text' />
                <CustomInput placeholder='Date of Birth' value='roshan' type='date' />

                <div className="row">
                    <button className='button-primary'>Confirm</button>
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

export default PatientConfirmScreen