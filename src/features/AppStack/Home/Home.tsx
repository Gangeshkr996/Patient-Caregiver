import React from 'react'
import womenImg from '../../../assets/images/4_Home_Patient_3.0.png'
import { Footer } from '../../../component/Footer'
const Home = () => {
  return (
    <div>

    <div className='container p-5'>
        
        <h5>Hello Header Component</h5>

        <div >
            <h1 className="title">Living with Alzheimer’s disease (AD)</h1>
        </div>

        {/* 2nd div */}
        <div className='row'>
            <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
                <img src={womenImg} style={{height:'100%', width:'100%'}}/>
            </div>

            <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
                {/* <h1>Hello braintip</h1> */}
                <div className='crousel-wrapper mt-5'>
                <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active" data-bs-interval="10000">
                        <img src="https://via.placeholder.com/800x400" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item" data-bs-interval="2000">
                        <img src="https://via.placeholder.com/800x400" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                        <img src="https://via.placeholder.com/800x400" className="d-block w-100" alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
                </div>
            </div>
        </div>

        {/* 3rd div */}


    </div>

    <div className='countdown-wrapper shadow-lg'>
    <div className='row'>
        <div className='col-3'>
            <div className='d-flex justify-content-end mt-2'>
                <div className='daysTimer'>
                    <h1 className='title text-center'>0</h1>
                </div>
                <div className='daysTimer'>
                    <h1 className='title text-center'>9</h1>
                </div>
            </div>
        </div>

        <div className='col-9'>
            <div className="sub-title">
                <h1>Countdown to the next Assessment!</h1>
            </div>
            <div>
                <h5>days until it’s time to answer the questionnaire for Patient Name.</h5>
            </div>
        </div>

    </div>
    </div>
    <Footer/>
    </div>
  )
}

export default Home