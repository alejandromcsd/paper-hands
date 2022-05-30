import { IHolding } from '../models/model';
import { Table, Space, Tag } from 'antd';
import usePortfolioStore from '../stores/portfolio-store';
import Title from 'antd/lib/typography/Title';
import { toUSD } from '../utils/format';
import { Link } from 'react-router-dom';

const columns = [
  {
    title: 'Ticket',
    dataIndex: 'ticket',
    key: 'ticket',
    render: (text: string, record: any) => (
      <Link
        style={{ display: 'block', margin: '1rem 0' }}
        to={`/${record.key}`}
        key={record.key}
      >
        {text}
      </Link>
    ),
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Avg buy',
    dataIndex: 'avgBuy',
    key: 'avgBuy',
  },
  {
    title: 'Status',
    key: 'pendingSell',
    dataIndex: 'pendingSell',
    render: (isPendingSell: boolean) => {
      let color = isPendingSell ? 'volcano' : 'geekblue';
      let tag = isPendingSell ? 'sell' : 'ok';
      return <Tag color={color}>{tag.toUpperCase()}</Tag>;
    },
  },
  {
    title: 'Action',
    key: 'action',
    render: (text: any, record: any) => (
      <Space size="middle">
        <button type="link">View trades</button>
        <button type="link">Delete</button>
      </Space>
    ),
  },
];

const isPendingSell = (holding: IHolding): boolean => {
  return (
    holding.trades.find(
      (t) => holding.currentPrice >= t.profitTarget * holding.avgBuy
    ) !== null
  );
};

export const PortfolioOverview = () => {
  const { portfolio } = usePortfolioStore();

  const data = portfolio.holdings.map((h: IHolding) => {
    return {
      key: h.id,
      ticket: h.ticket,
      amount: h.amount,
      price: toUSD(h.currentPrice),
      avgBuy: toUSD(h.avgBuy),
      pendingSell: isPendingSell(h),
    };
  });

  return (
    <div>
      <Title>{portfolio.name}</Title>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ hideOnSinglePage: true }}
      />
    </div>
  );
};
