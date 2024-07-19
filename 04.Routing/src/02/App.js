import React, {useState} from 'react';
import Main from "./component/Main";
import Gallery from "./component/Gallery";
import Guestbook from "./component/Guestbook";
import Error404 from "./component/Error404";

export default function App() {
    const [route, setRoute] = useState({});

    const handleLinkClick = (e) => {
    }

    const Router = function () {
        let component = null;

        switch (route.page) {
            case '/':
                component = <Main/>;
                break;
            case '/gallery':
                component = <Gallery/>;
                break;
            case '/guestbook':
                component = <Guestbook/>;
                break;
        }

        return component;
    };

    return (
        <div>
            <ul>
                <li><a href={'/'} onClick={handleLinkClick}>[Main]</a></li>
                <li><a href={'/gallery'} onClick={handleLinkClick}>[Gallery]</a></li>
                <li><a href={'/guestbook'} onClick={handleLinkClick}>[Guestbook]</a></li>
            </ul>
            {
                (() => {
                    switch(route.page) {
                        case '/' :
                            return <Main />;
                        case '/guestbook' :
                            return <Guestbook />;
                        case '/gallery':
                            return <Gallery />;
                        default :
                            return <Error404 />;                    
                    }
                })()
            }
        </div>
    )
}