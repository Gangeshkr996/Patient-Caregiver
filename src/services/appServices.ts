import axios from 'axios';
import { envConfig } from '../config/env_config';
import ContextStore from '../context/clearContext';
import { useContext } from 'react';
import {UserContext} from '../context/UserContext';
import { APIEndpoint } from '../config';
import CryptoJS from 'crypto-js'; 

class AppServices {
    public _contextStore = new ContextStore()
    public appContext = useContext(UserContext)
    public userData:any= this.appContext.loggedInUserDetails;
    public ipAddress:any;
    public logoutMsg = "logout successfully";
    public sessionTimeOutMsg = "Your session expired. Login again."
    public client = axios.create({
        baseURL: envConfig.baseURL
    });

    public api_config:any = {
        headers: {}
    };

    async logData({ Severity, Activity, ActivityStatus, ActivityResponse, Operation, email = '' }: any) {
        const browserInfo = {
            name: this.getBrowserName(),
            version: this.getBrowserVersion(),
        };

        if(!this.ipAddress){
            await this.getIpAddress()
        }
    
        const obj = {
            UserEmail: email != '' ? email : (this.userData ? this.userData?.email : ''),
            AppName: "Adli Providers",
            Severity: Severity,
            // User: this.userData ? this.userData?.uuid : '',
            Activity: Activity,
            ActivityStatus: ActivityStatus,
            ActivityResponse: ActivityResponse,
            Operation: Operation,
            Platform: "Web",
            TimeStamp: new Date().valueOf(),
            deviceVersion: `${browserInfo.version}`,
            ipAddress : this.ipAddress,
            deviceName: `${browserInfo.name}`, 
        };
    
        if (obj.UserEmail != '') {
            await this.getSessionDetails();
            try{
                // console.log(obj)
                const response = await this.client.post(APIEndpoint.logging, obj, this.api_config);
            }catch(err){
                console.log(err)
            }

        }
    }
    async getIpAddress(){
        try{

            const res = await axios.get('https://api.ipify.org?format=json')
            this.ipAddress = res.data.ip
        }catch(error){
            console.log(error)
        }
    }
    
     getBrowserName() {
        const userAgent = navigator.userAgent;
        // console.log(userAgent, "====>", navigator)
        if (userAgent.indexOf("Edge") !== -1) return "Edge";
        if (userAgent.indexOf("Chrome") !== -1) return "Chrome";
        if (userAgent.indexOf("Safari") !== -1) return "Safari";
        if (userAgent.indexOf("Firefox") !== -1) return "Firefox";
        if (userAgent.indexOf("MSIE") !== -1 || userAgent.indexOf("Trident") !== -1) return "IE";
        return "Unknown";
    }
    
    
     getBrowserVersion() {
        const userAgent = navigator.userAgent;
        const match = userAgent.match(/(?:Chrome|Safari|Firefox|MSIE|Trident|Edge)\/([0-9.]+)/);
        return match ? match[1] : "Unknown";
    } 


    async encryptText(plainText:any) {

        const encrypted = await CryptoJS.AES.encrypt(plainText, envConfig.public).toString();
        return encrypted;
    }
 
    async decryptText(encryptedText:any) {
        const decrypted = CryptoJS.AES.decrypt(encryptedText, envConfig.public).toString(CryptoJS.enc.Utf8);
        return JSON.parse(decrypted);
    }

    async signOut() {
        this._contextStore.clearContext()
    }

    async clearSessionDetails(error: any) {
        if (error && error.response && error.response.data && error.response.data.error) {
            if (String(error.response.data.error).toLowerCase().includes("please authenticate")) {
                this._contextStore.clearContext()
            }
        }
    }

    async getSessionDetails() {
        let sessionDetails =  localStorage.getItem('sessionObject');
        let isSecondaryProfile = localStorage.getItem('isSecondaryProfile')
        let secondaryProfileTokens = localStorage.getItem('secondaryProfileTokens');
        if (isSecondaryProfile == 'true' && secondaryProfileTokens) {
            let parseSessionDetails = JSON.parse(secondaryProfileTokens);
            this.api_config.headers['Authorization'] = `Bearer ${parseSessionDetails.access.token}`
        } else
            if (sessionDetails) {
                let parseSessionDetails = JSON.parse(sessionDetails);
                this.api_config.headers['Authorization'] = `Bearer ${parseSessionDetails.authToken.access.token}`
            } else {
                delete this.api_config.headers['Authorization'];
            }
    }

    async getData(url:any) {
        try {
            console.log("call Api ===> ", envConfig.baseURL + url);
            await this.getSessionDetails();
            const response = await this.client.get(url, this.api_config);
            this.logData({
                Severity: 'Info',
                Activity: `Call API Request ${envConfig.baseURL+url}`,    
                ActivityStatus: 'Success',    
                ActivityResponse: "",    
                Operation: 'API Call'
            })
            // console.log("responseeee ===>>>>", await JSON.stringify(this.decryptText(response.data)))
            return this.decryptText(response.data);
        } catch (error:any) {
            // console.error(`Error from getData ${url} `, error.response.data, this.api_config.headers);
            this.clearSessionDetails(error);
            this.logData({
                Severity: 'Error',
                Activity: `Error from requested URL - ${envConfig.baseURL+url}`,    
                ActivityStatus: 'Failure',    
                ActivityResponse: error,    
                Operation: 'API Call'
              })
              throw this.decryptText(error.response.data);
        }
    };

    async postData(url:any, payload:any) {
        console.log("call Api ======>>>>>>> ", envConfig.baseURL + url)
        try {
            await this.getSessionDetails();
             const encryptedPayload = {encryptedData: await this.encryptText(JSON.stringify(payload))};
            
            const response = await this.client.post(url, encryptedPayload, this.api_config);
            console.log('rosha res',this.decryptText(response.data))
            this.logData({
                Severity: 'Info',
                Activity: `Call API Request ${envConfig.baseURL+url}`,    
                ActivityStatus: 'Success',    
                ActivityResponse: "",    
                Operation: 'API Call'
            })
            // return response.data;
        //  console.log("responseeee ===>>>>",response )
            return this.decryptText(response.data);
        } catch (error:any) {
            console.error(`Error from postData ${url} and payload ${JSON.stringify(payload)}`, this.decryptText(error.response.data), this.api_config.headers);
            this.clearSessionDetails(error);
            this.logData({
                Severity: 'Error',
                Activity: `Error from requested URL - ${envConfig.baseURL+url}`,    
                ActivityStatus: 'Failure',    
                ActivityResponse: error,    
                Operation: 'API Call'
              })
            throw await this.decryptText(error.response.data);
        }
    };

    async patchData(url:any, payload:any) {
        console.log("call Api ======>>>>>>> ", envConfig.baseURL + url)
        try {
            await this.getSessionDetails();
            const encryptedPayload = {encryptedData: await this.encryptText(JSON.stringify(payload))};
            console.log("postData encryptedPayload", encryptedPayload);
            const response = await this.client.patch(url, payload, this.api_config);
            this.logData({
                Severity: 'Info',
                Activity: `Call API Request ${envConfig.baseURL+url}`,    
                ActivityStatus: 'Success',    
                ActivityResponse: "",    
                Operation: 'API Call'
            })
            // return response.data;
            return await this.decryptText(response.data);
        } catch (error:any) {
            // console.error(`Error from postData ${url} and payload ${JSON.stringify(payload)}`, error.response.data, this.api_config.headers);
            this.clearSessionDetails(error);
            this.logData({
                Severity: 'Error',
                Activity: `Error from requested URL - ${envConfig.baseURL+url}`,    
                ActivityStatus: 'Failure',    
                ActivityResponse: error,    
                Operation: 'API Call'
              })
              throw await this.decryptText(error.response.data);
        }
    };

    async putData(url:any, payload = null) {
        try {
            await this.getSessionDetails();
            const encryptedPayload = {encryptedData: await this.encryptText(JSON.stringify(payload))};
            console.log("postData encryptedPayload", encryptedPayload);
            const response = await this.client.put(url, payload, this.api_config);
            this.logData({
                Severity: 'Info',
                Activity: `Call API Request ${envConfig.baseURL+url}`,    
                ActivityStatus: 'Success',    
                ActivityResponse: "",    
                Operation: 'API Call'
            })
            // return response.data;
            return this.decryptText(response.data);
            // return this.decryptPayload(encryptedPayload, this.generateEncryptionKey());
        } catch (error:any) {
            // console.error(`Error from putData ${url} and payload ${JSON.stringify(payload)}`, error.response.data, this.api_config.headers);
            this.clearSessionDetails(error);
            this.logData({
                Severity: 'Error',
                Activity: `Error from requested URL - ${envConfig.baseURL+url}`,    
                ActivityStatus: 'Failure',    
                ActivityResponse: error,    
                Operation: 'API Call'
              })
              throw await this.decryptText(error.response.data);
        }
    };

    async deleteData(url:any) {
        try {
            console.log("call Api ======>>>>>>> ", envConfig.baseURL + url)
            await this.getSessionDetails();
            const response = await this.client.delete(url, this.api_config);
            this.logData({
                Severity: 'Info',
                Activity: `Call API Request ${envConfig.baseURL+url}`,    
                ActivityStatus: 'Success',    
                ActivityResponse: "",    
                Operation: 'API Call'
            })
            return this.decryptText(response.data);
        } catch (error:any) {
            // console.error(`Error from deleteData ${url} `, error.response.data,this.api_config.headers);
            this.clearSessionDetails(error);
            this.logData({
                Severity: 'Error',
                Activity: `Error from requested URL - ${envConfig.baseURL+url}`,    
                ActivityStatus: 'Failure',    
                ActivityResponse: error,    
                Operation: 'API Call'
              })
              throw await this.decryptText(error.response.data);
        }
    };

    getErrorMessage(error:any) {
        const errorMessages:any = {
            409: "Something went wrong please try again later",
            500: "Something went wrong please try again later",
            404: error?.message,
            406: "Something went wrong please try again later",
            400: error?.message,
            401: error?.message
        };
    
        return errorMessages[error?.status] || "Something went wrong please contact to support team";
    }

}

export default AppServices;