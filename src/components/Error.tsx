import React from 'react';
import { Alert } from 'antd';

type Props = {
  message: string;
}

function Error(props: Props) {
  return (
    <div className='container'>
      <Alert message={props.message} type='error' />
    </div>
  )
}

export default Error;