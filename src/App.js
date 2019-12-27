import React from 'react';  
import './App.css';
import { Layout } from 'antd';
import Main from './components/Main.js'
const { Header, Footer,  Content } = Layout;

const App = () => (
  <div className="App">
    <Layout>
      <Header className="header">Header</Header>
      <Content className="main">
        <Main></Main>
      </Content>
      <Footer className="footer">Copyright © 2019 Ron</Footer>
    </Layout>
  </div>
);

export default App;
