import React, {useEffect, useState} from 'react';
import { Card, Col, Row, Input, Select, Button, Icon } from 'antd';
import axios from 'axios';
import TripleContainer from '../components/triple-container';

const { Option } = Select;

const Home = () => {

  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [predicate, setPredicate] = useState('');
  const [object, setObject] = useState('');
  const [objectType, setObjectType] = useState('uri');
  const [triples, setTriple] = useState([]);

  const tripleObject = {
    name: '',
    subject: '',
    predicate: '',
    object: '',
    objectType: ''
  }

  useEffect(() => {
    const fetchOrders = async () => {
      const result = await axios(
        `/v1/search?format=json&database=data-hub-FINAL&collection=order-collection&pageLength=1000`,
      );
      console.log('fetch orders', result.data);
    };
    const fetchCustomers = async () => {
      const result = await axios(
        `/v1/search?format=json&database=data-hub-FINAL&collection=customer-collection&pageLength=1000`,
      );
      console.log('fetch customers', result.data);
    };
    const fetchProducts = async () => {
      const result = await axios(
        `/v1/search?format=json&database=data-hub-FINAL&collection=product-collection&pageLength=1000&view={}`,
      );
      console.log('fetch products', result.data);
    };

    // fetchOrders();
    // fetchCustomers();
    // fetchProducts();
  }, []);

  const handleCreate = () => {

    axios.post('/triple/create', {
      name,
      subject,
      predicate,
      object,
      objectType
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  const handleAdd = () => {
    setTriple([...triples, tripleObject]);
  }

  const handleChange = event => {
    switch( event.target.id ) {
      case 'name':
        setName(event.target.value);
        break;
      case 'subject':
        setSubject(event.target.value);
        break;
      case 'predicate':
        setPredicate(event.target.value);
        break;
      case 'object':
        setObject(event.target.value);
        break;
      default:
        break;
        // code block
    }
  }

  const handleSelect = value => {
    setObjectType(value);
  }



  const renderForm = triples.map((item, index) => {
    console.log('item', item);
    return (
      <div key={index}>
        <TripleContainer meta={item} />
      </div>
    ) 
  })


  return (
    <>
    <div style={{ background: '#ECECEC', padding: '30px', margin: '5px' }}>
        <Input id="name" size="large" value={name} placeholder="Enter Triple Name" onChange={handleChange}/>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Subject" bordered={true}>
            <Input id="subject" value={subject} placeholder="Uri" onChange={handleChange}/>
          </Card>
        </Col>
        
        <Col span={8}>
          <Card title="Predicate" bordered={true}>
            <Input id="predicate" value={predicate} placeholder="Uri" onChange={handleChange}/>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Object" bordered={true}>
            <Select defaultValue="uri" style={{ width: 120 }} onChange={handleSelect}>
              <Option value="uri">uri</Option>
              <Option value="literal">literal</Option>
              <Option value="bnode">bnode</Option>
            </Select>
            <Input id="object" value={object} placeholder="Value"onChange={handleChange} />
          </Card>
        </Col>
      </Row>
      {renderForm}
    </div>
      <div className="button-container">
        <Button type="dashed" onClick={handleAdd} ><Icon type="plus"/> Triple Link</Button>
        <Button type="primary" onClick={handleCreate} >Create Triple</Button>
      </div>
    </>
  );
}

export default Home;