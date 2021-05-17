import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import seed from './seed';
import StockIcon from '../component/StockIcon/StockIcon';

const JusiikStyle = styled.div`
  padding: 20px;
  padding-left: 60px;
  /* margin: 20px;
  margin-left: 60px; */
  box-sizing: border-box;
  width: 100%;
  background-color: #ddd;
  display: flex;
  ul,
  li {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .listUp {
    width: 100%;
    max-width: 300px;
    background-color: #fff;
    border: 1px solid #eee;
    position: relative;
    padding: 0 50px;
    min-height: 800px;
  }
  .wonIcon {
    position: absolute;
    top: 25px;
  }
  .title {
    font-weight: 400;
    padding-left: 23px;
  }
  .wrap {
    display: flex;
    justify-content: space-evenly;
    padding: 5px 30px;
    align-items: center;
  }
  .wrap > div {
    width: 30px;
    margin-right: 10px;
    font-weight: 700;
  }
  input {
    border: 1px solid #aaa;
    width: 90px;
    height: 30px;
    padding-left: 5px;
    margin: 0 10px;
    border-radius: 5px;
  }
  button {
    border: 1px solid #aaa;
    border-radius: 10px;
    padding: 10px 0;
    cursor: pointer;
    font-size: 20px;
  }
  .resetBtn {
    position: absolute;
    top: 30px;
    right: 30px;
    width: 20%;
    font-size: 16px;
  }
  .showBtn {
    width: 100%;
    margin-top: 10px;
  }
`;

const UlLiStyle = styled.div`
  ul {
    margin-top: 30px;
  }
  ul > li:first-child {
    font-weight: 700;
  }
  li {
    border-bottom: 1px solid black;
    padding: 10px 0;
    text-align: center;
  }
  span {
    display: inline-block;
    padding: 0 5px;
  }
  li > span:nth-child(1) {
    width: 5%;
  }
  li > span:nth-child(2) {
    width: 15%;
  }
  li > span:nth-child(3) {
    width: 15%;
  }
  li > span:nth-child(4) {
    width: 15%;
  }
  li > span:nth-child(5) {
    width: 15%;
  }
  li > span:nth-child(6) {
    width: 12%;
  }
  li > span:nth-child(7) {
    width: 10%;
  }
`;

const DataStyle = styled.div`
  box-sizing: border-box;
  width: 100%;
  .dataList {
    width: 100%;
    margin: 0 10px;
    min-width: 600px;
    background-color: #aaa;
  }
  h3 {
    padding: 0;
    margin: 0;
    text-align: center;
  }
`;

const ResultStyle = styled.div`
  width: 100%;
  margin-left: 30px;
  .result {
    width: 100%;
    min-width: 650px;
    background-color: #eee;
  }
  h2,
  h3 {
    padding: 0;
    margin: 0;
    text-align: center;
  }
`;

// const indexInitialState = {
//   minNumber: '',
//   maxNumber: '',
//   data: []
// };

// const indexReducer = (state,action)=>{
//   switch(action.type){
//     case 'findMinPER'
//   }
// }

const Plzation = () => {
  const [minNumber, setMinNumber] = useState('');
  const [maxNumber, setMaxNumber] = useState('');
  const [data, setData] = useState([]);

  const [minPBR, setMinPBR] = useState('');
  const [maxPBR, setMaxPBR] = useState('');
  const [dataPBR, setDataPBR] = useState([]);

  // const [doit, setDoit] = useState([]);

  const num = /^[+-]?\d*(\.?\d*)?$/; // 양수,음수, 소수점 숫자만 허용.

  useEffect(() => {
    const seedFiltering = seed.ExStock.filter(
      item => minNumber <= item.PER && item.PER <= maxNumber
    );
    setData(seedFiltering);
    const seedFilteringPBR = seed.PBR.filter(
      item => minPBR <= item.PER && item.PER <= maxPBR
    );
    setDataPBR(seedFilteringPBR);
  }, [minNumber, maxNumber, maxPBR, minPBR]);

  const showResult = () => {
    console.log(data, 'data');
  };

  const onChangeMin = e => {
    if (!num.test(e.target.value)) return;
    setMinNumber(e.target.value);
  };

  const onChangeMax = e => {
    if (!num.test(e.target.value)) return;
    setMaxNumber(e.target.value);
  };

  const PBRMin = e => {
    if (!num.test(e.target.value)) return;
    setMinPBR(e.target.value);
  };

  const PBRMax = e => {
    if (!num.test(e.target.value)) return;
    setMaxPBR(e.target.value);
  };
  const onReset = e => {
    if (!e.target.matches('.resetBtn')) return;
    console.log(e.target, '1934sjj');
  };

  return (
    <JusiikStyle>
      <section className="listUp">
        <StockIcon />
        <h1 className="title">on&ndOnly</h1>
        <div className="firstInput wrap">
          <input
            type="text"
            onChange={onChangeMin}
            placeholder="최소값을 입력하세요"
          />
          <input
            type="text"
            onChange={onChangeMax}
            placeholder="최대값을 입력하세요"
          />
        </div>
        <div className="pbrWrap wrap">
          <div>PBR</div>
          <input type="text" onChange={PBRMin} placeholder="최소값입력" />
          ~
          <input type="text" onChange={PBRMax} placeholder="최대값입력" />
        </div>
        <div className="perWrap wrap">
          <div>PER</div>
          <input type="text" onChange={PBRMin} placeholder="최소값입력" />
          ~
          <input type="text" onChange={PBRMax} placeholder="최대값입력" />
        </div>
        <div className="roeWrap wrap">
          <div>ROE</div>
          <input type="text" onChange={PBRMin} placeholder="최소값입력" />
          ~
          <input type="text" onChange={PBRMax} placeholder="최대값입력" />
        </div>
        <button className="resetBtn" onClick={onReset}>
          reset
        </button>
        <button className="showBtn" onClick={showResult}>
          showMe
        </button>
        <div>
          <p>입력한 최소값은 '{minNumber}'입니다</p>
          <p>입력한 최대값은 '{maxNumber}'입니다</p>
        </div>
        <div>
          <p>PBR 최소값: {minPBR}.</p>
          <p>PBR 최대값: {maxPBR}.</p>
        </div>
      </section>
      <UlLiStyle>
        <DataStyle>
          <section className="dataList">
            <h3>data</h3>
            <ul>
              <li>
                <span className="listIndex">No.</span>
                <span className="listCompanyName">회사 이름</span>
                <span className="listPER data">PER</span>
                <span className="listPBR data">PBR</span>
                <span className="listROE data">ROE</span>
                <span className="listSame data">same</span>
                <span className="listOption data">option</span>
              </li>
              {seed &&
                seed.ExStock.map(item => {
                  return (
                    <li key={item.id}>
                      <span>{item.id}</span>
                      <span>{item.name}</span>
                      <span>{item.PER}</span>
                      <span>{item.PBR}</span>
                      <span>{item.ROE}</span>
                      <span>{item.same ? `${item.same}` : 'none'}</span>
                      <span>{item.option ? `${item.option}` : 'none'}</span>
                    </li>
                  );
                })}
              <br />
              {seed &&
                seed.PBR.map(item => {
                  return (
                    <li key={item.id}>
                      <span>{item.id}</span>
                      <span>{item.name}</span>
                      <span>{item.PER}</span>
                      <span>{item.PBR}</span>
                      <span>{item.ROE}</span>
                      <span>{item.same ? `${item.same}` : 'none'}</span>
                      <span>{item.option ? `${item.option}` : 'none'}</span>
                    </li>
                  );
                })}
            </ul>
          </section>
        </DataStyle>
      </UlLiStyle>

      {/* <hr /> */}
      <ResultStyle>
        <UlLiStyle>
          <section className="result">
            <h2>SHOW</h2>
            <h3>Filtering DATA result</h3>
            <b>범위 안에 있는 data 추출</b>
            <ul>
              <li>
                <span className="listIndex">No.</span>
                <span className="listCompanyName">회사 이름</span>
                <span className="listPER data">PER</span>
                <span className="listPBR data">PBR</span>
                <span className="listROE data">ROE</span>
                <span className="listSame data">same</span>
                <span className="listOption data">option</span>
              </li>
              {data && (
                <div>
                  {data.map(da => (
                    <li key={da.id}>
                      <span>{da.id}</span>
                      <span>{da.name}</span>
                      <span>{da.PER}</span>
                      <span>{da.PBR}</span>
                      <span>{da.ROE}</span>
                      <span>{da.same ? `${da.same}` : 'none'}</span>
                      <span>{da.option ? `${da.option}` : 'none'}</span>
                    </li>
                  ))}
                </div>
              )}
            </ul>
            <br />
            <b> + hi가 있는 데이터의 이름만 추출</b>
            {data && (
              <div>
                {data
                  .filter(da => da.same === 'hi')
                  .map(d => (
                    <li key={d.id}>{d.name}</li>
                  ))}
              </div>
            )}
            <br />
            <b> + option이 10이상 100이하 값 만 추출</b>
            {data && (
              <div>
                {data
                  .filter(
                    da =>
                      da.same === 'hi' && da.option >= 10 && da.option <= 100
                  )
                  .map(d => (
                    <li key={d.id}>{d.name}</li>
                  ))}
              </div>
            )}
            <h5>PBRInput</h5>
            {dataPBR && (
              <div>
                {dataPBR.map(da => (
                  <li key={da.id}>
                    (id: {da.id}) (name: {da.name}) (data: {da.PER})
                  </li>
                ))}
              </div>
            )}
          </section>
        </UlLiStyle>
      </ResultStyle>
    </JusiikStyle>
  );
};

export default Plzation;
