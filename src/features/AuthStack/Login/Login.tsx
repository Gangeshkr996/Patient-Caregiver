import React, { useState } from 'react';
import { Footer } from '../../../component/Footer';
import Header from '../../../component/Header/Header';
import CustomInput from '../../../component/CustomInput';
import Intro from './../../../assets/images/1_Intro.png';
import {isValidEmail} from '../../../helper/helper';
import ForgotPasswordModal from '../ForgotPassword/ForgotPassword';
import AppServices from '../../../services/appServices';
import { APIEndpoint } from '../../../config';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  // Define any props here if needed
}
const initialState = {
  emailError: '',
  passwordError: '',
};

const Login: React.FC<LoginProps> = () => {

  const _appService = new AppServices()
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, seterrors] = React.useState(initialState);
  const [showModal,setShowModal]= useState(false);
  const navigate = useNavigate();

  const hideModal =()=>{
    setShowModal(!showModal)
  }
  

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    seterrors({
      ...errors,
      emailError: ''
    });
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    seterrors({
      ...errors,
      passwordError: '',
    });
  };


  const validateForm = () => {
    const errors:any = {};
    const isEmailValid = isValidEmail(email);
    if (!isEmailValid) {
      errors.emailError = 'Invalid Email Format.';
    }
    if (!email) {
      errors.emailError = 'Email is required.';
    }
    if (!password) {
      errors.passwordError = 'Password is required.';
    }
    return errors;
  };

  const handleSubmit = async() => {
    const errors = validateForm();
    if (Object.keys(errors).length) {
      seterrors(errors);
      return;
    }

    let postJson = {
      email:email,
      password:password,
      deviceToken:'kjsdahfldsjlfueawofpqeoirpiqweuoriu4r7'
    }
     let res = await _appService.postData(APIEndpoint.login,postJson)
     console.log("res",res)
     navigate('/otp',{state:{res:res,email: email, password: password}})
  };

  return (
    <div style={{position:"relative"}}>
        <Header/>
      <div className="adli-container login">
        <div className="left">
              <h2 className="title">Patient/Caregiver Login</h2>
              <div>
            <div className='login-container'>
              <CustomInput
               placeholder='Email' 
               type='email' value={email}
               onChange={handleUsernameChange}
               errorText={errors.emailError}
               />
              <CustomInput
               placeholder='Password'
               type='password' 
               value={password} 
               onChange={handlePasswordChange} 
               errorText={errors.passwordError}
               icon={true}
               />
              <div style={{width:'100%',padding:'10px'}}>
              <p>You must be enrolled by a healthcare provider to use ADLi. If you are already registered,
                 please log in. If you aren't registered, please share this link [adli-ad.com]
                  with your doctor to discuss if ADLI could be helpful to you.For more information, 
                  please visit our FAQS [adli-ad.com/faqs].</p>
              </div>
            </div>
            <div className='button-container'>
              <button className='button-primary' onClick={handleSubmit}>Log In</button>
              <a href='#' onClick={()=>{setShowModal(true)}}>Forgot Password ?</a>
             </div>
             </div>
     </div>
        <div  className="right">
            <img src={Intro}/>
        </div>
      </div>
      <Footer/>
     <ForgotPasswordModal show={showModal} onHide={hideModal}/>
    </div>
  );
}

export default Login;
