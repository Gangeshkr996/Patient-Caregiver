import React, { useState } from 'react';
import assessImg from '../../../assets/images/6_Assessment_4.0.png';
import Current from './Current/Current';
import Previous from './Previous/Previous';
import { Footer } from '../../../component/Footer';

const Assessments = () => {
  const [activeTab, setActiveTab] = useState('current');

  const handleTabClick = (tab:any) => {
    setActiveTab(tab);
  };

  return (
    <>
    <div className='container'>
      <div>
        <h1 className='title'>hello Assessments header</h1>
      </div>

      {/* Tabs */}
      <div className='row'>
        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 d-flex justify-content-end'>
          <div className='assignment-toogle'>
            <div className='tab'>
              <button
                className={activeTab === 'current' ? 'tablinks active' : 'tablinks'}
                onClick={() => handleTabClick('current')}
              >
                Current
              </button>
              <button
                className={activeTab === 'previous' ? 'tablinks active' : 'tablinks'}
                onClick={() => handleTabClick('previous')}
              >
                Previous
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2nd div */}
      <div className={activeTab === 'current' ? 'current' : 'previous'}>
        <div>
            {activeTab === 'current' ? <Current/> : <Previous/>}
        </div>
      </div>

    </div>
    </>
  );
};

export default Assessments;
