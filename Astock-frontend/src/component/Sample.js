import React, { useState } from 'react';
import styled from 'styled-components';

const PostStyle = styled.div`
  .choice {
    display: flex;
    .title3 {
      margin: 10px;
    }
    input {
      width: 60px;
    }
    b {
      margin: 0 5px;
      display: flex;
      align-items: center;
    }
    button {
      margin-left: 10px;
    }
  }
`;

const Sample = ({ post, users, loadingPost, loadingUsers }) => {
  const [minValue, setMinValue] = useState('');
  const [maxValue, setMaxValue] = useState('');

  const num = /^[+-]?\d*(\.?\d*)?$/; // 양수,음수, 소수점 숫자만 허용.

  // const min = minValue => {
  //   if (!num.test(minValue)) return;
  //   setMinValue(minValue);
  // };
  // const max = maxValue => {
  //   if (!num.test(maxValue)) return;
  //   setMaxValue(maxValue);
  // };
  const min = e => {
    if (!num.test(e.target.value)) return;
    return setMinValue(e.target.value);
  };

  console.log(min, 'min');
  const max = e => {
    if (!num.test(e.target.value)) return;
    setMaxValue(e.target.value);
  };
  console.log(max, 'max');

  const showResult = () => {};

  // const showResult = (min, max) => {
  //   console.log(post);
  //   return post.filter(post => min <= post.id && post.id <= max);
  // };
  // const result = showResult(minValue, maxValue);

  return (
    <PostStyle>
      <section className="wrap1">
        <h1>포스트</h1>
        <div className="choice">
          <div className="title3">PER (PBR ROE)</div>
          <input
            type="Text"
            value={minValue}
            onChange={min}
            placeholder="최소금액"
          />
          <b> - </b>
          <input
            type="text"
            value={maxValue}
            onChange={max}
            placeholder="최대금액"
          />
          <button onClick={showResult}>ㄱ</button>
        </div>
        <div>
          <p>최소값 입력:{minValue}입니다</p>
          <p>최대값 입력:{maxValue}입니다</p>
        </div>
        <hr style={{ marginTop: '30px' }} />
        {loadingPost}
        {loadingPost && '로딩 중...학교..ㅎ'}
        {!loadingPost && post && (
          <ul>
            {post.map(post => (
              <li key={post.id}>
                {post.id} - {post.title}
              </li>
            ))}
          </ul>
        )}
      </section>
      <hr />
      <section className="wrap2">
        <h1>사용자 목록</h1>
        {loadingUsers && '로딩 중..고..등...ㅎ'}
        {!loadingUsers && users && (
          <ul>
            {users.map(user => (
              <li key={user.id}>
                <div>
                  {user.id} - {user.username}({user.email})
                </div>
                <div>{user.geo}</div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </PostStyle>
  );
};

export default Sample;
