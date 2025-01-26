import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Detail from './pages/Detail';
import { AuthProvider } from './common/AuthContextType';
import PrivateRoute from './common/PrivateRoute';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Mypage from './pages/Mypage';
import LikeList from './components/LikeList';
import AddCourseContainer from './components/AddCourseContainer';
import Email from './pages/EmailInquiry';

setupIonicReact();

const App: React.FC = () => {

  return (
    <IonApp>
      <AuthProvider>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route path='/home' component={Home} exact={true} />
            <Route path='/detail/:id' component={Detail} exact={true} />
            <Route path='/mypage' component={Mypage} exact={true} />
            <Route path='/mypage/likes' component={LikeList} exact={true} />
            <Route path='/mypage/course/add' component={AddCourseContainer} exact={true} />
            <Route path='/email' component={Email} exact={true} />
            <Route exact path='/' render={() => <Redirect to='/home' />} />          
          </IonRouterOutlet>
        </IonReactRouter>
      </AuthProvider>
    </IonApp>
  );
};


export default App;
