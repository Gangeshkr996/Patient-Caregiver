import React from 'react';

// const RadioButtonGroup = ({ label, selectedOption, onSelectOption, error, options }) => {
//   return (
//     <div>
//       <label>{label}</label>
//       {options.map(option => (
//         <div key={option.value}>
//           <input
//             type="radio"
//             id={option.value}
//             name={label}
//             value={option.value}
//             checked={selectedOption === option.value}
//             onChange={() => onSelectOption(option.value)}
//           />
//           <label htmlFor={option.value}>{option.label}</label>
//         </div>
//       ))}
//       {error && <span style={{ color: 'red' }}>{error}</span>}
//     </div>
//   );
// };

const RadioButtonGroup =()=>{
    return(
        <div>
            RadioButton
        </div>
    )
}

export default RadioButtonGroup;
