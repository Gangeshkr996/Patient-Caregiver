import React from 'react'
import assessImg from '../../../../assets/images/6_Assessment_4.0.png'

const Current = () => {
  return (
    <div>
        <div className='row'>
            <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
                <img src={assessImg} style={{height:'100%', width:'100%'}}/>
            </div>

            <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-5'>
                {/* <h1>Hello braintip</h1> */}
                <h5 className='title mt-5'>Assessment</h5>

                <p>The goal of this questionnaire is to evaluate the ability to carry out
                    Activities of Daily Living (ADLs) independently. Your answers can help
                    the doctor monitor functioning and identify any changes. That’s why
                    Dr. Name has asked that you answer this series of ADL questions every
                    [X] months.
                </p>

                <p className='assess-helper-text mt-5'>Once you start the questionnaire, please finish it within 24 hours.</p>

                <div>
                    <button className='button-primary mt-5'>
                        Begin
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Current