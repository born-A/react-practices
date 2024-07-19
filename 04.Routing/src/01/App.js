import React, {useState} from 'react';
import Main from "./component/Main";
import Gallery from "./component/Gallery";
import Guestbook from "./component/Guestbook";
import Error404 from "./component/Error404";

export default function App() {
    const [route, setRoute] = useState('');



    return (() => {
        switch(route) {
            case '' :
            case '/' :
                return <Main />;
            case '/guestbook' :
                return <Guestbook />;
            case '/gallery':
                return <Gallery />;
            default :
                return <Error404 />;                    
        }
    })();
}