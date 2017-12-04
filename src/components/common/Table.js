import React from 'react';
import { Table, Icon, Button } from 'antd';
const columns = [{
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    render: text => <a href="#">{text}</a>,
}, {
    title: 'Code',
    dataIndex: 'code',
    key: 'code',
}, {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
}, {
    title: 'Action',
    key: 'action',
    render: () => {
        return (
      <Button type="primary">Open Info</Button>
    )},
}];


const TableCoinInfo =({data, onRowClick}) => (<Table columns={columns} dataSource={data} pagination={false} onRowClick={onRowClick} />);

export default TableCoinInfo;