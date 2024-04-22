import React, { useState } from 'react'
import Header from '../../../component/Header/Header'
import CustomInput from '../../../component/CustomInput'
import { APIEndpoint } from '../../../config/apiendpoint_config';
import AppServices from '../../../services/appServices';
import Intro from './../../../assets/images/1_Intro.png'
import { Footer } from '../../../component/Footer';
import { useLocation, useNavigate } from 'react-router-dom';

const initialState = {
    otp:'',
    password: '',
    confirmPassword: '',
  };
  
  const initialStateErrors = {
    otpError:'',
    passwordError: '',
    confirmPasswordError: '',
  };

const ResetPassword = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const _appServices = new AppServices();
    const email = state?.email;
    const sendOtpVia = state.res?.sendOtpVia || email;
    const [otp, setotp] = useState('');
    const [password,setPassword] = useState('');
    const [data, setdata] = useState(initialState);
    const [errors, seterrors] = useState(initialStateErrors);
    const [requestSubmitForgotPassword, setRequestSubmitForgotPassword] = useState(false);
    const [requestForgotPassword, setRequestForgotPassword] = useState(false);


    const onSubmit = () => {
        const errors = _validateForm();
        if (Object.keys(errors).length) {
          seterrors(errors);
          return;
        }
    
        let postjson = {
          "email": email,
          "password": data.password,
          "confirmPassword":data.confirmPassword,
          "otp":data.otp
        }
        setRequestSubmitForgotPassword(true)
        _appServices.postData(APIEndpoint.resetForgotPassword, postjson).then(async res => {
          if (res.status == 200 && res.success) {
            window.alert(res.message)
            setRequestSubmitForgotPassword(false)
            navigate('/');
            _appServices.logData({
              Severity: 'Info',
              Activity: ` User clicked on Submit button from Reset Password Screen`,
              ActivityStatus: 'Success',
              ActivityResponse: 'Data Submitted',
              Operation: 'User Activity',
            });
          } else {
            setRequestSubmitForgotPassword(false)
            let errMessage = _appServices.getErrorMessage(res)
            window.alert(errMessage)
          }
        }, err => {
          setRequestSubmitForgotPassword(false)
          let errMessage = _appServices.getErrorMessage(err)
          window.alert(errMessage)
        });
      };

    const handleResendOTP =() =>{
        let postjson = {
          "email": email
        }
        setRequestForgotPassword(true)
        _appServices.postData(APIEndpoint.forgotPassword, postjson).then(async res => {
          if (res.status == 200 && res.success) {
            setRequestForgotPassword(false)
            window.alert(res.message)
            _appServices.logData({
              Severity: 'Info',
              Activity: ` User clicked on Resend OTP button from Reset Passwoed Screen`,
              ActivityStatus: 'Success',
              ActivityResponse: 'Page View',
              Operation: 'User Activity',
            });
          } else {
            setRequestForgotPassword(false)
            let errMessage = _appServices.getErrorMessage(res)
            window.alert(errMessage)
          }
        }, err => {
          setRequestForgotPassword(false)
          let errMessage = _appServices.getErrorMessage(err)
          window.alert(errMessage)
        });
      }
    
      const _validateForm = () => {
        const errors:any = {};
        if (data.otp === '')
          errors.otpError = 'Verification Code is required.';
        if (data.password === '')
          errors.passwordError = 'Password is required.';
        if (data.confirmPassword === '')
          errors.confirmPasswordError = 'Confirm Password is required.';
        if (data.password !== data.confirmPassword)
          errors.confirmPasswordError = 'Confirm Password and Password did not matched.';
    
        return errors;
      };

    const _onChangeTextChange = (text:React.ChangeEvent<HTMLInputElement>, type:string) => {
        switch (type) {
          case 'OTP':
            setdata({
              ...data,
              otp: text.target.value,
            });
            seterrors({
              ...errors,
              otpError: '',
            });
          break;
    
          case 'PASSWORD':
            setdata({
              ...data,
              password: text.target.value,
            });
            seterrors({
              ...errors,
              passwordError: '',
            });
          break;
    
          case 'CONFIRM_PASSWORD':
            setdata({
              ...data,
              confirmPassword: text.target.value,
            });
            seterrors({
              ...errors,
              confirmPasswordError: '',
            });
            break;
    
          default:
            break;
        }
      }

  return (
    <div>
    <Header />
    <div className="adli-container common-adli">
        <div className="common-left">
            <h2 className="title">Forgot Password</h2>
            <p className='sub-title'>We've sent verification code to:</p>
            <p className='sub-title'>{sendOtpVia}</p>
                <div className='common-container' >
                    <CustomInput
                        placeholder='Verification Code'
                        type='text'
                        value={data.otp}
                        onChange={(event) => _onChangeTextChange(event, 'OTP')}
                        errorText={errors.otpError}
                    />
                     <CustomInput
                        placeholder='Password'
                        type='password'
                        value={data.password}
                        onChange={(event) => _onChangeTextChange(event, 'PASSWORD')}
                        errorText={errors.passwordError}
                        icon={true}
                    />
                     <CustomInput
                        placeholder='Confirm Password'
                        type='password'
                        value={data.confirmPassword}
                        onChange={(event) => _onChangeTextChange(event, 'CONFIRM_PASSWORD')}
                        errorText={errors.confirmPasswordError}
                        icon={true}
                    />
                </div>
                <div className='button-container'>
                    <button className='button-primary' onClick={onSubmit}>Confirm</button>
                    <button className='button-secondry' style={{marginBottom:'30px'}} onClick={handleResendOTP}>Resend Code</button>
                </div>
                <p style={{width:'320px', lineHeight:'1.2', textAlign:'center'}}>Two-factor verification keeps your accout safe and protects your data.</p>
                
        </div>
        <div className="right">
            <img src={Intro}/>
        </div>
    </div>
    <Footer />

</div>
  )
}

export default ResetPassword