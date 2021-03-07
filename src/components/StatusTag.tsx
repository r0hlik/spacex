import React from 'react';
import { Tag } from 'antd'

type Props = {
  success: boolean;
}

function StatusTag(props: Props) {
  const text = props.success ? 'success' : 'fail';
  const color = props.success ? 'green' : 'red';
  return (
    <Tag color={color}>{text}</Tag>
  );
}

export default StatusTag;




      