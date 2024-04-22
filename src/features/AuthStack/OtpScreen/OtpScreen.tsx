import React, { useContext, useState } from 'react';
import { Footer } from '../../../component/Footer';
import Header from '../../../component/Header/Header';
import CustomInput from '../../../component/CustomInput';
import { useLocation } from 'react-router-dom';
import UserContext from '../../../context/UserContext';
import { APIEndpoint } from '../../../config/apiendpoint_config';
import AppServices from '../../../services/appServices';
import Intro from './../../../assets/images/1_Intro.png'

const OtpScreen = () => {
    const _appServices = new AppServices()
    const [otp, setotp] = useState('');
    const [reqResendOtp, setReqResendOtp] = useState(false)
    const [otpError, setotpError] = useState('');
    const [requesting, setRequesting] = useState(false)
    const { state } = useLocation()
    const sendOtpVia = state.res.data[0].sendOtpVia;
    const email = state?.email;
    const password = state?.password;

    const validateForm = () => {
        if (otp == '' || otp.trim()=='' ) {
            setotpError('Please enter the OTP.');
        } else {
            setotpError('');
        }
    }

    const onOtpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setotpError('');
        setotp(event.target.value);
    };
    //  const { setSessionDetails } = useContext(UserContext);

    const maskMobileNumber = (number: any) => {
        const regex = /^(\d{7})(\d{3})$/;
        if (number && regex.test(number)) {
            const maskedPart = 'x'.repeat(7);
            const lastThreeDigits = number.slice(-3);
            return `${maskedPart}${lastThreeDigits}`;
        }
        return number;
    };
    const maskedSendOtpVia = maskMobileNumber(sendOtpVia);


    const onSubmit = async () => {
        const errors = validateForm();
        if (otpError !== '') {
            return
        }
        if (otp) {
            let postjson = {
                "email": email,
                "otp": otp,
            }
            setRequesting(true)
            _appServices.postData(`${APIEndpoint['verifyOTP']}`, postjson).then(res => {
                if (res.status == 200 && res.success) {
                    let _res = res.data[0];
                    let sessionObj = { email: email, authToken: _res?.tokens, isLoggedIn: true, isFirstTimeUser: _res.isFirstTimeLogin, userType: _res.userType, userTypeId: _res.userTypeId }
                    //  setSessionDetails(sessionObj);
                    setRequesting(false)
                    _appServices.logData({
                        Severity: 'Info',
                        Activity: ` User clicked on Submit button from Verification Screen`,
                        ActivityStatus: 'Success',
                        ActivityResponse: 'Data Submitted',
                        Operation: 'User Activity',
                    });
                } else {
                    let errMessage = _appServices.getErrorMessage(res)
                    window.alert(errMessage)
                }
            }, err => {
                setRequesting(false);
                let errMessage = _appServices.getErrorMessage(err)
                window.alert(errMessage)
            });
        }
    };

    const handleResendOTP = async () => {
        let postjson = {
            "email": email,
            "password": password
        }
        setReqResendOtp(true)

        _appServices.postData(`${APIEndpoint['login']}`, postjson).then(res => {
            if (res.status == 200 && res.success) {
                setReqResendOtp(false)
                window.alert('Otp sent successfully.');
                _appServices.logData({
                    Severity: 'Info',
                    Activity: ` User clicked on Resend Code button from Verification Screen`,
                    ActivityStatus: 'Success',
                    ActivityResponse: 'Data Submitted',
                    Operation: 'User Activity',
                })
            } else {
                let errMessage = _appServices.getErrorMessage(res)
                window.alert(errMessage)
            }
        }, err => {
            setReqResendOtp(false)
            let errMessage = _appServices.getErrorMessage(err)
            window.alert(errMessage)
        })
    };

    return (
        <div>
            <Header />
            <div className="adli-container common-adli">
                <div className="common-left">
                    <h2 className="title">Verify</h2>
                    <p className='sub-title'>We've sent verification code to:</p>
                    <p className='sub-title'>{sendOtpVia}</p>
                        <div className='common-container' >
                            <CustomInput
                                placeholder='Verification Code'
                                type='text'
                                value={otp}
                                onChange={onOtpChange}
                                errorText={otpError}
                            />
                        </div>
                        <div className='button-container'>
                            <button className='button-primary' onClick={onSubmit}>Submit</button>
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

export default OtpScreen