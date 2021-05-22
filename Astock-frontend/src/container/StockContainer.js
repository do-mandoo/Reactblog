import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getData } from '../modules/stock';
import StockViewer from '../stock-ick/StockViewer';

const StockContainer = ({ getData, stockData, loadingPost }) => {
  console.log(4325, stockData);
  const [minNumber, setMinNumber] = useState('');
  const [maxNumber, setMaxNumber] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const getPost = async () => {
      try {
        await getData(1);
        console.log('성공1');
        console.log(getData, 1232);
        // const seedFiltering = await stockData.map(item => item.id);
        // setData(seedFiltering);
      } catch (e) {
        console.log(e, '에러조회'); // 에러 조회
      }
    };
    getPost();

    // const seedFiltering = stockData.filter(
    //   item => minNumber <= item.PER && item.PER <= maxNumber
    // );
    // setData(seedFiltering);
  }, [getData]);

  useEffect(() => {
    const seedFiltering = stockData.filter(
      item => minNumber <= item.PER && item.PER <= maxNumber
    );
    setData(seedFiltering);
  }, [minNumber, maxNumber, stockData]);

  return (
    <StockViewer
      stockData={stockData}
      loadingPost={loadingPost}
      minNumber={minNumber}
      maxNumber={maxNumber}
      data={data}
      setMinNumber={setMinNumber}
      setMaxNumber={setMaxNumber}
    />
  );
};

export default connect(
  ({ stock, loading }) => ({
    stockData: stock.stockData,
    loadingPost: loading['stock/GET_DATA']
  }),
  { getData }
)(StockContainer);
