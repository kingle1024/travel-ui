import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

// 백엔드 API로부터 받아온 데이터의 형식을 정의합니다.
interface Product {
  id: number;
  title: string;
  url: string;
}

interface Region {
  id: number;
  regionCd: string;
  regionNm: string;
}

const ListContainer: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]); // 데이터를 저장할 상태 변수
  const [regions, setRegions] = useState<Region[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);

  useEffect(() => {
    // 백엔드 API에서 데이터를 가져오는 함수
    const fetchData = async () => {
      try {
        // Axios를 사용하여 백엔드 API 호출
        const response: AxiosResponse<{
          region: Region[], 
          product: Product[]
        }> = await axios.get<{
          region: Region[], 
          product: Product[]
        }>('http://localhost:8090/list');
        // API 응답 데이터를 상태 변수에 저장
        setProducts(response.data.product);
        setRegions(response.data.region);
      } catch (error) {
        // 오류 처리
        console.error('Error fetching data:', error);
      }
    };

    // 컴포넌트가 마운트될 때 API 호출
    fetchData();
    
  }, []);

  const handleButtonClick = async (regionCd: string) => {
    try {
      const updatedSelectedRegions = selectedRegions.includes(regionCd)
        ? selectedRegions.filter(cd => cd !== regionCd) // 선택된 지역 제거
        : [...selectedRegions, regionCd]; // 선택된 지역 추가
      const encodedRegionCd = encodeURIComponent(updatedSelectedRegions.join('|'));

      const response: AxiosResponse<{
        region: Region[],
        product: Product[]
      }> = await axios.get<{
        region: Region[],
        product: Product[]
      }>(
        `http://localhost:8090/list?regionCd=${encodedRegionCd}`
      )
      setProducts(response.data.product);
      setSelectedRegions(updatedSelectedRegions);
    } catch (error) {
      console.error('Error fetching filtered data:', error);
    }
  };

  return (
    <div className='container'>
      <h2>코스 목록</h2>
      <div className='buttons'>
        {regions.map((item: Region) => (
          <div key={item.regionCd} style={{ marginRight: '10px', marginBottom: '10px', display: 'inline-block' }}>
            <button
              type="button"
              className={`btn ${selectedRegions.includes(item.regionCd) ? 'btn-primary active' : 'btn-outline-primary'}`}
              onClick={() => handleButtonClick(item.regionCd)}
            >
              {item.regionNm}             
            </button>
          </div>
        ))}
      </div>
      <br/>
      <ul>
        {/* 데이터 배열을 매핑하여 각 요소를 표시 */}
        {products.map((item: Product) => (
          <li key={item.id}>
            <a href={item.url} target='_blank' rel='noreferrer'>{item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListContainer;
