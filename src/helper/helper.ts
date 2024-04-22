export const isValidEmail = (email:any) => {
    const validEmailRegex =
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/
    return validEmailRegex.test(email);
  };
  
  export const isValidPassword = (password:any) => {
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{10,}$/
    return passwordRegex.test(password);
  };