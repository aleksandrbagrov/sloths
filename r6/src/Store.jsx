import { createContext, useEffect } from 'react';
import useRoute from './Hooks/useRoute';
import usePageLogin from './Hooks/usePageLogin';
import useUser from './Hooks/useUser';

export const Store = createContext();


export const Data = ({children}) => {

    const [displayPage, goToPage, pageSlug] = useRoute();
    const [loginResponse, setLoginRequest] = usePageLogin();
    const [getUser, setUser] = useUser();


    useEffect(() => {
        if (null === loginResponse) {
            return;
        }

        if (loginResponse?.status === 'login-ok') {
            setUser(loginResponse.user);
            goToPage('home');
        }

    }, [loginResponse])



    return (
        <Store.Provider value={{
            displayPage, goToPage, pageSlug,
            setLoginRequest
        }}>
            {children}
        </Store.Provider>
    )

}