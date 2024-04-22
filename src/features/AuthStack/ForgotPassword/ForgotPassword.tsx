import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { IoMdCloseCircle } from "react-icons/io";
import { TERTIARY_COLOR } from '../../../colors';
import CustomInput from '../../../component/CustomInput';
import { isValidEmail } from '../../../helper/helper';
import { useNavigate } from 'react-router-dom';
import AppServices from '../../../services/appServices';
import { APIEndpoint } from '../../../config/apiendpoint_config';

interface ForgotPasswordModalProps {
  show: boolean;
  onHide: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ show, onHide }) => {

  const _appServices = new AppServices()
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [emailError,setEmailError]= useState('');
  const [requestForgotPassword, setRequestForgotPassword] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError('')
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
    return errors;
  };

  const handleClose =()=>{
    setEmailError('');
    setEmail('');
    onHide()
  }

  const handleSubmit = () => {
    const errors = validateForm();
    if (Object.keys(errors).length) {
      setEmailError(errors.emailError);
      return;
    }

    if (email) {
      let postjson = {
        "email": email
      }
      setRequestForgotPassword(true)
      _appServices.postData(APIEndpoint.forgotPassword, postjson).then(async res => {
        if (res.status == 200 && res.success) {
          let _res = res.data[0];
          setRequestForgotPassword(false)
          navigate('/ResetPassword', {state:{ res: _res,email: email }})
          console.log('oldschool',_res,email)
          setEmail('');
          handleClose(); 
        } else {
          setRequestForgotPassword(false)
          let errMessage = _appServices.getErrorMessage(res)
          window.alert(errMessage)
        }
      },async (err) => {
        let errMessage = _appServices.getErrorMessage(err)
        window.alert(errMessage)
        setRequestForgotPassword(false) 
      });
      return;
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <div >
          <button onClick={handleClose} className='close-button' > <IoMdCloseCircle color={TERTIARY_COLOR} size={40} /></button>
          </div>
      <div style={{borderRadius:'50%'}}>
       <div style={{padding:'25px'}}>

       <div>
            <h1>Forgot Password</h1>
            <p style={{fontSize:'25px',lineHeight:'1.4'}}> We will send you the password reset link in your email</p>
        </div>
        <CustomInput type='email'
         placeholder='Enter your email' 
         value={email}
         onChange={handleEmailChange}
         errorText={emailError}
         />

         <button className='button-primary' style={{width:'100%'}} onClick={handleSubmit} > Send</button>
       </div>
      
      </div>
    </Modal>
  );
};

export default ForgotPasswordModal;
