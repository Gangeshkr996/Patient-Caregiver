
export const Footer = () => {
    return (
    // <div className='footer adli-container'>
    //         <div>
    //             <p> US3950 03/2024 Copyright  Eisai Co., Ltd. All Right Reserved.</p>
    //             <p>ADLi is powered by OtisHealth.</p>
    //         </div>
    //         <div className=''>
    //             <p> Privacy Statement | Terms & Conditions | Contact Us</p>
    //         </div>
    // </div>

    <div className='row footer pl-5 pr-5'>

    <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 pb-2 web_menu' style={{fontSize:'10px', lineHeight:'16px',textAlign:'left', paddingLeft:'80px'}}>
        <p>US3950 03/2024 Copyright  Eisai Co., Ltd. All Right Reserved.<br/>
        ADLi is powered by OtisHealth.</p>
     </div>  
    <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 pb-2 web_menu p' style={{textAlign:'left', color:'#FFFF'}}>
        <a style={{ fontWeight:'500', cursor:'pointer'}} > About ADLi | </a> 
        <a style={{ fontWeight:'500', cursor:'pointer'}} target="_blank" > Privacy Policy | </a> 
        <a style={{ fontWeight:'500', cursor:'pointer'}}  target="_blank" > Terms & Conditions</a>
    </div>  

    <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pb-2 mobile_menu text-center' style={{fontSize:'12px', lineHeight:'16px',textAlign:'left'}}>
    <p className="p-3">US3950 03/2024 Copyright  Eisai Co., Ltd. All Right Reserved.
        ADLi is powered by OtisHealth.</p>
    </div>  

    <div className='col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12 pb-2 mobile_menu p' style={{textAlign:'center', color:'#FFFF'}}>
        <a style={{ fontWeight:'500', cursor:'pointer'}} > About ADLi | </a>
        <a style={{ fontWeight:'500', cursor:'pointer'}} > Privacy Policy | </a>
        <a style={{ fontWeight:'500', cursor:'pointer'}} > Terms & Conditions</a>
    </div>     
</div>
  )};