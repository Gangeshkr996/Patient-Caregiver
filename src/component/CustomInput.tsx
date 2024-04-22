import React, { useState } from 'react';
import { IoEye } from "react-icons/io5";
import {PRIMARY_COLOR,SECONDRY_COLOR} from '../colors'
import { IoMdEyeOff } from "react-icons/io";

interface CustomInputProps {
  placeholder?:string,
  label?: string;
  type: string;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  onClick?: () => void;
  errorText?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  placeholder,
  label,
  type,
  value,
  onChange,
  icon,
  onClick,
  errorText,
  ...restProps
}) => {

  const [showPassword,setShowPassword]= useState(false)

  const iconPressed = () =>{
    setShowPassword(!showPassword)
  }

  return (
    <div className="input-f">
      {label && <label>{label}</label>}
      <div style={{position:'relative', zIndex:'10'}}>
        {icon && (
          <div style={{position:'absolute',
           right:5,
           top:'50%',
           transform:"translateY(-50%)", 
           padding:'5px', 
           backgroundColor:SECONDRY_COLOR,
           width:'35px',
           borderRadius:'50%',
           marginRight:10,
           alignItems:'center'
           }}>
            {showPassword?<IoMdEyeOff size={24} color={'white'} className='adli-icon' onClick={()=>iconPressed()} />:<IoEye size={24} color={'white'} className='adli-icon' onClick={()=>iconPressed()}/>}
          </div>
        )}
        <input
          type={showPassword?'text':type}
          className={`input-box ${errorText ? 'input-is-invalid' : ''}`}
          value={value}
          onChange={onChange}
          onClick={onClick}
          placeholder={placeholder}
          {...restProps}
        />
      </div>
      {errorText && <div className="invalid-input">{errorText}</div>}
    </div>
  );
};

export default CustomInput;
