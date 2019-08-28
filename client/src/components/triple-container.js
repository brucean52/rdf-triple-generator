import React, {useEffect} from 'react';
import { Card, Col, Row, Input, Select, Button } from 'antd';
import axios from 'axios';

const { Option } = Select;

const TripleContainer = () => {


  const handleAdd = () => {

  }
  const handleChange = () => {

  }


  return (
    <div style={{ background: '#ECECEC', paddingTop: '10px'}}>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Subject" bordered={false}>
            <Input placeholder="Uri" />
          </Card>
        </Col>
        
        <Col span={8}>
          <Card title="Predicate" bordered={false}>
            <Input placeholder="Uri" />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Object" bordered={false}>
            <Select defaultValue="uri" style={{ width: 120 }} onChange={handleChange}>
              <Option value="uri">uri</Option>
              <Option value="literal">literal</Option>
              <Option value="bnode">bnode</Option>
            </Select>
            <Input placeholder="Value" />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default TripleContainer;