import { ITrade } from '../models/model';
import { Table } from 'antd';
import usePortfolioStore from '../stores/portfolio-store';
import Title from 'antd/lib/typography/Title';
import { toUSD } from '../utils/format';
import { useParams } from 'react-router-dom';

const columns = [
  {
    title: 'Target Price',
    dataIndex: 'targetPrice',
    key: 'targetPrice',
  },
  {
    title: 'Amount To Sell',
    dataIndex: 'sellAmount',
    key: 'amount',
  },
];

export const HoldingDetails = () => {
  const { portfolio } = usePortfolioStore();

  let params = useParams();
  const holding = portfolio.holdings.find(
    (h) => h.id === parseInt(params.holdingId!)
  );

  const data = holding?.trades.map((t: ITrade) => {
    return {
      key: t.id,
      targetPrice: toUSD(t.profitTarget * holding.avgBuy),
      sellAmount: (t.pctSold * holding.amount).toFixed(2),
    };
  });

  return (
    <div>
      <Title>{holding?.ticket}</Title>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ hideOnSinglePage: true }}
      />
    </div>
  );
};
