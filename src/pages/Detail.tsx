import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import axios, { AxiosResponse } from 'axios';
import KakaoMap from '../components/KakaoMap';

interface ProductDetail {
  id: number;
  title: string;
  url: string;
}

interface RegionDetail {
  lat: number;
  lng: number;
  title: string;
}

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [regions, setRegions] = useState<RegionDetail[]>([]);
  
  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get<{ product: ProductDetail; regions: RegionDetail[] }>(`http://localhost:8090/detail/${id}`);
        setProduct(response.data.product);
        setRegions(response.data.regions)
      } catch (error) {
        console.error('Error fetching product detail:', error);
      }
    };

    fetchProductDetail();
  }, [id]);

  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Detail Page</IonTitle>
        </IonToolbar>        
      </IonHeader>
      <IonContent fullscreen>      
        <div className="detail-container">
          {product ? (
            <>
              <h2>{product.title}</h2>
              <KakaoMap regions={regions} />
              <a href={product.url} target="_blank" rel="noopener noreferrer">방문하기</a>              
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        
      </IonContent>
    </IonPage>
  )
}

export default Detail;