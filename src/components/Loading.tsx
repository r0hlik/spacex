import React from 'react';
import { Spin } from 'antd'

function Loading() {
  return (
    <div className='container'>
      <Spin tip='Loading...' />
    </div>
  );
}

export default Loading;