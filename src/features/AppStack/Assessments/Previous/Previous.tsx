import React from 'react'
import assessImg from '../../../../assets/images/6_Assessment_4.0.png'

const Previous = () => {
  return (
    <div>
        <div className='row mb-5'>
            <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
                <img src={assessImg} style={{height:'100%', width:'100%'}}/>
            </div>

            <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-5'>
                {/* <h1>Hello braintip</h1> */}
                <h5 className='title mt-5'>Assessment</h5>
                
                <div className='row'>
                    
                    <h5 className='sub-title mt-5'>Assessment Name</h5>

                    <div>
                        <p>Doctor name:</p>
                        <p>Patient name:</p>
                        <p>Completed by:</p>
                        <p>Date completed::</p>
                        <p>Score:</p>
                    </div>
                </div>

                <hr className='mt-5'/>

                <div className='row'>
                    
                    <h5 className='sub-title mt-5'>Assessment Name</h5>

                    <div>
                        <p>Doctor name:</p>
                        <p>Patient name:</p>
                        <p>Completed by:</p>
                        <p>Date completed::</p>
                        <p>Score:</p>
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Previous