
import { UserContext } from './UserContext';
import { useContext } from 'react';

import { useNavigate } from 'react-router-dom';

class ContextStore {
    public navigate = useNavigate()
    public userContextData = useContext(UserContext)

    async clearContext() {
        this.navigate("/")
        if(localStorage.getItem("sessionObject")){
            // info()
            // this._appServices.showFlashMsg('info', 'Success', "Your session expired. Login again.", false);
            // notification()
        }
        localStorage.clear()
    }

}
export default ContextStore;