import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

// 백엔드 API로부터 받아온 데이터의 형식을 정의합니다.
interface Product_mst {
  id: number;
  title: string;
  url: string;
}

interface Region_mst {
  id: number;
  regionCd: string;
  level1: string;
  level2: string;
  level3: string;
  level4: string;
}

const ListContainer: React.FC = () => {
  const [products, setProducts] = useState<Product_mst[]>([]); // 데이터를 저장할 상태 변수
  const [regions2, setRegions2] = useState<Region_mst[]>([]);
  const [regions4, setRegions4] = useState<Region_mst[]>([]);
  const [selectedLevel2, setSelectedLevel2] = useState<string[]>([]);
  const [selectedLevel4, setSelectedLevel4] = useState<string[]>([]);

  useEffect(() => {
    // 백엔드 API에서 데이터를 가져오는 함수
    const fetchData = async () => {
      try {
        // Axios를 사용하여 백엔드 API 호출
        const response: AxiosResponse<{
          region2: Region_mst[], 
          region4: Region_mst[], 
          product: Product_mst[]
        }> = await axios.get<{
          region2: Region_mst[], 
          region4: Region_mst[], 
          product: Product_mst[]
        }>('http://34.22.67.247:8090/list');
        // API 응답 데이터를 상태 변수에 저장
        setProducts(response.data.product);
        setRegions2(response.data.region2);
        setRegions4(response.data.region4);
      } catch (error) {
        // 오류 처리
        console.error('Error fetching data:', error);
      }
    };

    // 컴포넌트가 마운트될 때 API 호출
    fetchData();
    
  }, []);

  const fetchProducts = async (params: { level2?: string, level4?: string }) => {
    try {
      const response: AxiosResponse<{
        region4: Region_mst[], 
        product: Product_mst[]
      }> = await axios.get<{
        region4: Region_mst[], 
        product: Product_mst[]
      }>('http://34.22.67.247:8090/list', { params });
      setProducts(response.data.product);
      setRegions4(response.data.region4);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleLevel2Click = (level2: string) => {
    const newSelectedLevel2 = selectedLevel2.includes(level2)
    ? selectedLevel2.filter(item => item !== level2) // 이미 선택되어 있으면 제거
    : [...selectedLevel2, level2]; // 선택되어 있지 않으면 추가

    setSelectedLevel2(newSelectedLevel2);
    fetchProducts({ level2: newSelectedLevel2.join('|'), level4: selectedLevel4.join('|') });
  };

  const handleLevel4Click = (level4: string) => {
    const newSelectedLevel4 = selectedLevel4.includes(level4)
    ? selectedLevel4.filter(item => item !== level4) // 이미 선택되어 있으면 제거
    : [...selectedLevel4, level4]; // 선택되어 있지 않으면 추가

    setSelectedLevel4(newSelectedLevel4);
    fetchProducts({ level2: selectedLevel2.join('|'), level4: newSelectedLevel4.join('|') });
  };


  return (
    <div className='container'>
      <h2>코스 목록</h2>
      <div className='buttons'>
        {regions2.map((item: Region_mst) => (
          <div key={item.level2} style={{ marginRight: '10px', marginBottom: '10px', display: 'inline-block' }}>
            <button
              type="button"
              className={`btn ${selectedLevel2.includes(item.level2) ? 'btn-primary active' : 'btn-outline-primary'}`}
              onClick={() => handleLevel2Click(item.level2)} // 수정된 부분: 클릭 핸들러 연결
            >
              {item.level2}             
            </button>
          </div>
        ))}
      </div>
      <div className='buttons'>
        {regions4.map((item: Region_mst) => (
          <div key={item.level4} style={{ marginRight: '10px', marginBottom: '10px', display: 'inline-block' }}>
            <button
              type="button"
              className={`btn ${selectedLevel4.includes(item.level4) ? 'btn-primary active' : 'btn-outline-primary'}`}
              onClick={() => handleLevel4Click(item.level4)} // 수정된 부분: 클릭 핸들러 연결
            >
              {item.level4}             
            </button>
          </div>
        ))}
      </div>
      <br/>
      <ul>
        {/* 데이터 배열을 매핑하여 각 요소를 표시 */}
        {products.map((item: Product_mst) => (
          <li key={item.id}>
            {/* <a href={item.url} target='_blank' rel='noreferrer'>{item.title}</a> */}
            <Link to={`/detail/${item.id}`}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListContainer;
