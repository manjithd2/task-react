import React from 'react'
import Header from './components/Header/Header'
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './pages/Home/Home';
import Api from './pages/Api/Api';
import Clipboard from './pages/Clipboard/Clipboard';
import Selfie from './pages/Selfie/Selfie';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Header/>
                <div className="">
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route path="/api">
                        <Api/>
                    </Route>
                    <Route path="/copy">
                        <Clipboard/>
                    </Route>
                    <Route path="/selfie">
                        <Selfie/>
                    </Route>
                </Switch>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App
