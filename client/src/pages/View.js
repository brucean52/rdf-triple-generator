import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Select } from 'antd';
import { InteractiveForceGraph, ForceGraphNode, ForceGraphLink } from 'react-vis-force';

const { Option } = Select;

const View = () => {
  const [graphs, setGraphs] = useState([]);
  const [selectedGraph, setSelectedGraph] = useState({});

  useEffect(() => {
    const fetchTripleList = async () => {
      const result = await axios(
        `/triple/list`,
      );
      console.log('fetch list', result);
      let graphList = [];
      for (const uri of result.data.split('\n')) {
        graphList.push(uri);
      }
      setGraphs(graphList);
    };

    fetchTripleList();

  }, []);

  const handleSelect = async value => {
    const result = await axios(
      `/triple/get/${value}`,
    );
    console.log('selected graph', result.data);
    setSelectedGraph(result.data);
  }


  const renderOptions = graphs.map((item, index) => {
    return <Option key={item} value={item}>{item}</Option>
  });

  let renderSubject = null;
  let renderPredicate = null;
  let renderObject = null;

  for( let subject in selectedGraph) {
    for(let predicate in selectedGraph[subject]) {
      const object = selectedGraph[subject][predicate][0];
      renderSubject = <div><span style={{fontWeight: 'bold'}}>Subject:</span> {subject}</div>;
      renderPredicate = <div><span style={{fontWeight: 'bold'}}>Predicate:</span> {predicate}</div>;
      renderObject = <div>
        <div><span style={{fontWeight: 'bold'}}>Object Type:</span> {object.type}</div>
        <div><span style={{fontWeight: 'bold'}}>Object Value:</span> {object.value}</div>
      </div>;
    }
  }
  const renderData = <div className="render-data">
    {renderSubject}
    {renderPredicate}
    {renderObject}
  </div>;

  return (
    <div>
      <Select placeholder="Select a Graph" style={{ width: 500, display: 'block' }} onChange={handleSelect}>
        {renderOptions}
      </Select>
      {renderData}
      <InteractiveForceGraph
        simulationOptions={{ height: 600, width: 1000 }}
        labelAttr="label"
        onSelectNode={(node) => console.log(node)}
        highlightDependencies={true}
        opacityFactor="0.7"
      >
        <ForceGraphNode node={{ id: 'first-node', label: 'First node' }} fill="red" />
        <ForceGraphNode node={{ id: 'second-node', label: 'Second node' }} fill="blue" />
        <ForceGraphNode node={{ id: 'third-node', label: 'Third node' }} fill="red" />
        <ForceGraphNode node={{ id: 'fourth-node', label: 'Fourth node' }} fill="blue" />
        <ForceGraphLink link={{ source: 'first-node', target: 'second-node', value: 10 }} />
        <ForceGraphLink link={{ source: 'first-node', target: 'third-node', value: 10 }} />
        <ForceGraphLink link={{ source: 'first-node', target: 'fourth-node', value: 10 }} />
        <ForceGraphLink link={{ source: 'fourth-node', target: 'third-node', value: 10 }} />
        <ForceGraphLink link={{ source: 'fourth-node', target: 'second-node', value: 10 }} />
      </InteractiveForceGraph>
    </div>
  );
}

export default View;