import React, { useState } from 'react';
import { Table, Card, Select } from 'antd';
import { map, keys } from 'lodash';
import { useQuery } from 'urql';
import { Link } from 'react-router-dom';

import { formatDate } from '../helpers'
import { LaunchesQuery } from '../graphql/query';
import Loading from './Loading';
import StatusTag from './StatusTag';
import Error from './Error';

const { Column } = Table;
const { Option } = Select;
const PAGE_SIZE = 20;

const columnTitles: { [name: string]: string } = {
  mission_name: 'Mission name',
  rocket_name: 'Rocket name',
  launch_date: 'Launch date',
  launch_success: 'Status'
}

const tableColumns: { [name: string]: JSX.Element } = {
  mission_name: <Column title={columnTitles.mission_name} dataIndex="mission_name" key="mission_name" />,
  rocket_name: <Column title={columnTitles.rocket_name} dataIndex={['rocket', 'rocket_name']} key="rocket_name" />,
  launch_date: <Column 
    title={columnTitles.launch_date}
    dataIndex="launch_date_unix" 
    key="launch_date"
    render={date => formatDate(date)}
  />,
  launch_success: <Column 
    title={columnTitles.launch_success}
    dataIndex="launch_success" 
    key="status"
    render={(success: boolean) => <StatusTag success={success} />} 
  />
}

const defaultState: { [name: string]: boolean } = {
  mission_name: true,
  rocket_name: true,
  launch_date: true,
  launch_success: true
}

function LaunchList() { 
  const [visibleColumns, setVisibleColumns] = useState(defaultState)
  const [page, setPage] = useState(0)

  const [result] = useQuery({
    query: LaunchesQuery,
    variables: { limit: PAGE_SIZE, offset: page * PAGE_SIZE }
  });

  const { data, fetching, error } = result;

  if (page === 0 && fetching) {
    return <Loading />;
  }
  if (error) {
    return <Error message={error.message} />;
  }

  const handleChange = (value: string[]) => {
    const selectedValues: { [colName: string]: boolean } = {}
    value.forEach(option => { 
      selectedValues[option] = true 
    })
    setVisibleColumns(selectedValues)
  }

  const handleScroll = (event: React.UIEvent<HTMLElement>) => {
    const { currentTarget } = event;
    const bottom = currentTarget.scrollHeight - currentTarget.scrollTop === currentTarget.clientHeight;
    if (bottom) { 
      setPage(page + 1)
    }
  }

  return (
    <div onScroll={handleScroll} className='launch-list'>
      <div className='container'>
        <Card>
          <label htmlFor='columns'>Select columns:</label>
          <Select
            id='columns'
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Select table columns"
            defaultValue={keys(defaultState)}
            onChange={handleChange}
          >
            {map(defaultState, (isColumnVisible, columnName) => {
              return (
                <Option key={columnName} value={columnName}>{columnTitles[columnName]}</Option>
              )
            })}
          </Select>
        </Card>
      
        <Table 
          dataSource={data.launchesPast} 
          rowKey='id' 
          pagination={false} 
          loading={fetching}
          style={{ width: '100%', height: 500 }}
        >
          {map(visibleColumns, (isColumnVisible, columnName) => isColumnVisible ? tableColumns[columnName] : '' )}
        
          <Column 
            dataIndex="id" 
            key="status"
            render={id => <Link to={`launch/${id}`}>Detail</Link>}
          />
        </Table>
      </div>
    </div>
  );
}

export default LaunchList;
