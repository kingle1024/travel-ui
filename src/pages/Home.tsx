import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import ListContainer from '../components/ListContainer'
import { Route } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Travel</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <ListContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
