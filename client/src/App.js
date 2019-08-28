import React, {Component} from 'react';
import axios from 'axios';
import { Route, Link, Switch } from 'react-router-dom';
import { Menu, Icon, Layout, Typography } from 'antd';
import Home from './pages/Home';
import View from './pages/View';
import './App.css';

const { Header, Sider, Content, Footer } = Layout;

const App = () => {

  return (
    <Layout>
      <Header style={{ background: '#3B4A9C', padding: 0}}>
        <Typography.Title style={{ color: '#fff', textAlign: 'center', paddingTop: '5px' }}>
          RDF Triples 
        </Typography.Title>
      </Header>
      <Layout>
      <Sider trigger={null} style={{ background: '#fff', padding: 0 }}>
        <Menu mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Icon type="plus-square" />
            <span>Create</span>
            <Link to="/"/>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="dot-chart" />
            <span>View</span>
            <Link to="/view"/>
          </Menu.Item>
        </Menu>
      </Sider>
      <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          background: '#fff',
          minHeight: '83vh',
        }}
      >
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/view" exact component={View}/>
        </Switch>
      </Content>
      </Layout>
    </Layout>
  ); 
}

export default App;
