import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from "@ionic/react";
import axios from 'axios';
import KakaoMap from '../components/KakaoMap';
import CommentList from "../components/CommentList";
import { CommentDetail, ProductDetail, RegionDetail } from "../common/Types";
import API_URL from "../config";
import CommentForm from "../components/CommentForm";

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [regions, setRegions] = useState<RegionDetail[]>([]);
  const [comments, setComments] = useState<CommentDetail[]>([]);
  
  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get<{ 
          product: ProductDetail; 
          regions: RegionDetail[]; 
          comments: CommentDetail[]; 
        }>(`${API_URL}/detail/${id}`);

        setProduct(response.data.product);
        setRegions(response.data.regions);
        setComments(response.data.comments);
      } catch (error) {
        console.error('Error fetching product detail:', error);
      }
    };

    fetchProductDetail();
  }, [id]);

  const addComment = (newComment: CommentDetail) => {
    setComments((prevCOmments) => [ newComment, ...prevCOmments ]);
  }
  
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
              <div className="d-flex align-items-center">
                <h2>{product.title}</h2> 
                {/* <a href={product.url} target="_blank" rel="noopener noreferrer">방문하기</a> */}
                <IonButton href={product.url} target="_blank" rel="noopener noreferrer">
                  방문하기
                </IonButton>
              </div>

              <KakaoMap regions={regions} />
              <CommentForm productCd={id} addComment={addComment} />
              <CommentList comments={comments} />              
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