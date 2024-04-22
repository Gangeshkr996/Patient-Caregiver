import React, { useState } from 'react';
import Header from '../../../component/Header/Header';
import { Footer } from '../../../component/Footer';
import welcomePatientImage  from '../../../assets/images/4_Home_Patient_3.0.png';
import logo from '../../../assets/images/App_logo.png';


const PatientWelcomeScreen = () => {
    const [welcomeData, setWelcomeData] = useState<any>();
  return (
    <div >
        <div className="row">
            <Header/>
        </div>
        <div className="row d-flex justify-content-start align-items-center px-2 mx-2 px-md-5 mx-md-5" style={{minHeight:'78dvh'}}>
            <div className='col-12 col-md-6 order-md-1 order-2'>
                <div className='d-flex justify-content-start align-items-baseline'>
                <h1 className='title'>Welcome to </h1>
                <img style={{width:'160px', marginLeft:'20px'}} src={logo} alt="" />
                </div>
                <p className='mt-3'>Learning that you are living with Alzheimer’s disease (AD)
       can be overwhelming. Dr. {welcomeData?.providerInfo?.firstName} {welcomeData?.providerInfo?.lastName} has invited you to enroll in ADLi 
       to help. With ADLi, from time to time, you may be asked to answer 
        questions about your life with AD. Your answers may help
        you and your doctor manage your condition.</p>
           <div className="row mt-5">
                <button className='button-primary '>Let's Get Started</button>
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

export default PatientWelcomeScreen