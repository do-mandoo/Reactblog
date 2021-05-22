import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import SampleContainer from './container/SampleContainer';
import StockContainer from './container/StockContainer';
// import { Route } from 'react-router-dom';
// import PostListPage from './pages/PostListPage';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import WritePage from './pages/WritePage';
// import Postpage from './pages/Postpage';
// import PostViewerContainer from './post/PostViewerContainer';
// import PostViewer from './post/PostViewer';
// import PostListContainer from './container/PostListContainer';

const App = () => {
  return (
    <>
      {/* <SampleContainer /> */}
      <StockContainer />
      {/* <PostViewerContainer />
      <PostViewer />
      <Route path={['/@:username', '/']} exact>
        <PostListPage />
      </Route>
      <Route path={'/login'}>
        <LoginPage />
      </Route>
      <Route path={'/register'}>
        <RegisterPage />
      </Route>
      <Route path={'/write'}>
        <WritePage />
      </Route>
      <Route path={'/@:username/:postId'}>
        <Postpage />
      </Route> */}
    </>
  );
};

export default App;
