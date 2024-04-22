import React, { useEffect, createContext } from 'react'

import { useState } from 'react';
import AppServices from '../services/appServices';


export const AppUserProvider = ({ children }) => {
    const _appServices = new AppServices()
    const [sessionDetails, setSessionDetails] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authToken, setAuthToken] = useState(null);
    const [userType, setUserType] = useState();
    const [userTypeId, setUserTypeId] = useState();
    const [isFirstTimeUser, setIsFirstTimeUser] = useState();
    const [loggedInUserDetails, setloggedInUserDetails] = useState(null);
    const [isCompleteWalkthroug, setIsCompleteWalkthrough] = useState(null);
    const [selectedSecondaryProfileUUID, setSelectedSecondaryProfileUUID] = useState(null);

    const [genderList, setgenderList] = useState([]);
    const [brainTipsDetails, setBrainTipsDetails] = useState([]);
    const [relationShipList, setRelationShipList] = useState([]);
    const [resources, setResources] = useState([]);
    const [assesmentsDetails, setAssesmentsDetails] = useState();
    const [assesmmentQuestion, setAssesmmentQuestion] = useState();
    const [messageCount, setMessageCount] = useState(0)

    useEffect(() => {
        async function recoverSession() {
            // localStorage.clear();
            const oldSessionDetails = localStorage.getItem('sessionObject');
            const secondaryUUID = localStorage.getItem('secondaryProfileUUID')
            console.log('oldSessionDetails', oldSessionDetails)
            const sessionObj = oldSessionDetails ? JSON.parse(oldSessionDetails) : null;
            if (oldSessionDetails && sessionObj) {
                setSessionDetails(sessionObj)
                setIsLoggedIn(sessionObj?.isLoggedIn)
                setAuthToken(sessionObj?.authToken);
                setIsFirstTimeUser(sessionObj?.isFirstTimeUser);
                setUserType(sessionObj?.userType);
                setUserTypeId(sessionObj?.userTypeId);
                setSelectedSecondaryProfileUUID(secondaryUUID);
            }
        }
        recoverSession();
    }, []);

    useEffect(() => {
        async function setSession() {
            if (sessionDetails && sessionDetails != '') {
                localStorage.setItem('sessionObject', JSON.stringify(sessionDetails));
                setSessionDetails(sessionDetails)
                await _appServices.logData({
                    Severity: 'Info',
                    Activity: `${sessionDetails?.email} has logged in`,
                    ActivityStatus: 'Success',
                    ActivityResponse: 'Logged In',
                    Operation: 'User Activity',
                    email: sessionDetails?.email
                })
                setIsLoggedIn(sessionDetails?.isLoggedIn)
                setAuthToken(sessionDetails?.authToken);
                setIsFirstTimeUser(sessionDetails?.isFirstTimeUser);
                setUserType(sessionDetails?.userType);
                setUserTypeId(sessionDetails?.userTypeId);
            }
        }
        setSession();
    }, [sessionDetails])

    const defaultValue = {
        sessionDetails,
        setSessionDetails,
        isLoggedIn,
        setIsLoggedIn,
        authToken,
        setAuthToken,
        userType,
        userTypeId,
        setUserType,
        setUserTypeId,
        isFirstTimeUser,
        setIsFirstTimeUser,
        loggedInUserDetails,
        setloggedInUserDetails,
        isCompleteWalkthroug,
        setIsCompleteWalkthrough,
        selectedSecondaryProfileUUID,
        setSelectedSecondaryProfileUUID,
        genderList,
        setgenderList,
        relationShipList,
        setRelationShipList,
        brainTipsDetails,
        setBrainTipsDetails,
        resources,
        setResources,
        assesmentsDetails,
        setAssesmentsDetails,
        assesmmentQuestion,
        setAssesmmentQuestion,
        messageCount,
        setMessageCount
    }
    return (
        <UserContext.Provider value={defaultValue}>
            {children}
        </UserContext.Provider>
    )
}

export const UserContext = createContext(
    {
        sessionDetails: null,
        setSessionDetails: (data) => { },
        isLoggedIn: false,
        setIsLoggedIn: (data) => { },
        authToken: null,
        setAuthToken: (data) => { },
        userType: null,
        setUserType: () => { },
        userTypeId: null,
        setUserTypeId: () => { },
        isFirstTimeUser: null,
        setIsFirstTimeUser: () => { },
        loggedInUserDetails: null,
        setloggedInUserDetails: (data) => { },
        isCompleteWalkthroug: null,
        setIsCompleteWalkthrough: (data) => { },
        selectedSecondaryProfileUUID: null,
        setSelectedSecondaryProfileUUID: (data) => { },
        genderList: null,
        setgenderList: (data) => { },
        relationShipList: null,
        setRelationShipList: (data) => { },
        brainTipsDetails: [],
        setBrainTipsDetails: (data) => { },
        resources: [],
        setResources: (data) => { },
        assesmentsDetails: null,
        setAssesmentsDetails: (data) => { },
        assesmmentQuestion: null,
        setAssesmmentQuestion: (data) => { },
        messageCount: 0,
        setMessageCount: (data) => { }
    }
);

export default AppUserProvider;