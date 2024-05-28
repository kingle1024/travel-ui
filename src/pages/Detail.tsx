import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import axios, { AxiosResponse } from 'axios';

interface ProductDetail {
  id: number;
  title: string;
  url: string;
  // 필요한 다른 필드들도 추가하세요.
}

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  
  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get<ProductDetail>(`http://localhost:8090/detail/${id}`);
        setProduct(response.data);
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
              <a href={product.url} target="_blank" rel="noopener noreferrer">방문하기</a>
              {/* 다른 필요한 정보도 추가하세요 */}
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