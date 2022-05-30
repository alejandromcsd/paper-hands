import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import usePortfolioStore from './stores/portfolio-store';
import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

export const MainLayout = () => {
  const { SubMenu } = Menu;
  const { Header, Content, Sider } = Layout;
  const { fetchPortfolio } = usePortfolioStore();
  const [portfolioFetched, setPortfolioFetched] = useState(false);

  useEffect(() => {
    if (portfolioFetched) return;
    fetchPortfolio(1);
    setPortfolioFetched(true);
  }, [portfolioFetched, fetchPortfolio]);

  // In main area, should render:
  // 1. Create portfolio
  // 2. Portfolio overview: render holdings table
  // 2.1 Add holding
  // 3. Holding details: trades table

  if (!portfolioFetched) {
    return <div>Loading...</div>;
  }

  return (
    <Layout className="vertical-full">
      <Header className="header">
        <h1>Paperhands</h1>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item key="100">
              <Link to="/overview">Portfolio Overview</Link>
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="Holdings">
              <Menu.Item key="1">Ethereum</Menu.Item>
              <Menu.Item key="2">Spell</Menu.Item>
              <Menu.Item key="3">Polkadot</Menu.Item>
              <Menu.Item key="4">Solana</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Portfolio Overview</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
