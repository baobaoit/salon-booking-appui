import { Button, Dropdown, Layout, Menu, Modal, theme } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  DashboardOutlined,
  DatabaseOutlined,
  GiftOutlined,
  CreditCardOutlined,
} from '@ant-design/icons';
import styled from "styled-components";
import React from "react";
import type { MenuProps } from 'antd';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ICLogoutUser, ICReportSearch, ICUserV2 } from "../icons";
import { BookingTooltip } from "../components/tooltip";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
import { BookingButton } from "../components/button";
import { setLoading } from "../redux/slices/appInfo";
import { Breadcrumbs } from "./breadcrumbs";
import { removeUserInfo } from "../redux/actions";
import { Title } from "./title";
import { InputSearch } from "./input-search";
import { useCustomer } from "../hooks/useCustomer";
import { useEmployee } from "../hooks/useEmployee";
import { useGroupServices } from "../hooks/useGroupServices";
import { useNailServices } from "../hooks/useNailServices";
import { DEFAULT_PAGE_SIZE } from "../utils/constants";
import { useGiftCard } from "../hooks/useGiftcard";
import { TGiftCardSearch } from "../pages/gift-cards/type";
import { useCreditManagement } from "../hooks/useCreditManagement";

const { Header, Content, Sider } = Layout;

const WrapperLayout = styled(Layout)`
  .ant-layout-sider {
    background: #fff;
  }
`;

const WrapperDisabledMenu = styled(Menu)`
  .ant-menu-item {
    pointer-events: none;
  }
  .ant-menu-item.ant-menu-item-disabled {
    color: #007faa !important;
  }
`;

const WrapperMenu = styled.div`
`;

type MenuItem = Required<MenuProps>['items'][number];

type MainLayoutProps = {
  children: React.ReactNode;
};
export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [showConfirmModal, setShowConfirmModal] = React.useState(false);
  const userInfo = useSelector((state: RootState) => state.userInfo);
  const userName = userInfo.firstName || userInfo.lastName ? `${userInfo.firstName} ${userInfo.lastName}` : '';
  const [openKeys, setOpenKeys] = React.useState(['']);

  const [selectedMenu, setSelectedMenu] = React.useState('');
  const { loadCustomers } = useCustomer();
  const { loadEmployees } = useEmployee();
  const { loadGroups } = useGroupServices();
  const { loadGiftCards } = useGiftCard();
  const { loadNailServices } = useNailServices();
  const { loadCreditData } = useCreditManagement();
  const [keywords, setKeywords] = React.useState<string>('');
  const code = useSelector(
    (state: RootState) => state.gift_card.code
);

  React.useEffect(() => {
    const path = window.location.pathname;
    if (path.includes('/customers')) {
      setSelectedMenu('customers');
    }
    if (path.includes('/technicians')) {
      setSelectedMenu('technicians');
    }
    if (path.includes('/report')) {
      setSelectedMenu('report');
    }
    if (path.includes('/group-services')) {
      setSelectedMenu('services');
    }
    if (path.includes('/nail-services')) {
      setSelectedMenu('services');
    }
    if (path.includes('/gift-cards')) {
      setSelectedMenu('gift-card');
    }
    if (path.includes('/credit-management')) {
      setSelectedMenu('credit-management');
    }
    if (path === '/') {
      setSelectedMenu('dashboard');
    }
  }, [window.location]);

  const userList = [
    {
      label: (
        <div className="flex flex-row gap-[16px] items-center justify-start font-bold p-[16px]">
          <img alt="" src="/images/avatar_holder.jpg" className="w-[40px] h-[40px] rounded-full" />
          <span className="line-clamp-1 text-high-em">
            {userName}
          </span>
        </div>
      ),
      key: 'Welcome'
    },
    {
      label: (
        <Link to={'/profile'} style={{
          color: '#110C22',
          fontWeight: 500,
        }}>
          <div className="flex flex-row gap-[16px] items-center justify-start p-[16px] text-standard-medium">
            <ICUserV2 width={24} height={24} />
            <span>My Profile</span>
          </div>
        </Link>
      ),
      key: 'my_profile'
    },
    {
      label: (
        <div className="flex flex-row gap-[16px] items-center justify-start p-[16px] text-standard-medium text-med-em">
          <ICLogoutUser />
          <span className="text-[#F03D3D]">
            Sign Out
          </span>
        </div>
      ), key: 'sign_out'
    },
  ];

  const items: MenuItem[] = React.useMemo(() => {
    return [
      {
        key: 'dashboard',
        icon: <DashboardOutlined />,
        label: 'Dashboard',
      },
      {
        key: 'customers',
        icon: <UserOutlined />,
        label: 'Customers',
      },
      {
        key: 'technicians',
        icon: <UserOutlined />,
        label: 'Technicians',
      },
      {
        key: 'report',
        icon: <span className="anticon anticon-user ant-menu-item-icon"><ICReportSearch width={15} height={15} /></span>,
        label: 'Check-In',
      },
      {
        key: 'gift-card',
        icon: <GiftOutlined />,
        label: 'Gift Card',
      },
      {
        key: 'credit-management',
        icon: <CreditCardOutlined />,
        label: 'Credit Management',
      },
      {
        key: 'services',
        icon: <DatabaseOutlined />,
        label: 'Services',
        children: [
          {
            key: 'group',
            label: 'Group',
          },
          {
            key: 'nail-services',
            label: 'Nail Services',
          },
        ],
      },
    ];
  } , []);

  const onClickUser: MenuProps['onClick'] = ({ key }) => {
    if (key === 'sign_out') {
      setShowConfirmModal(true);
    }
  };

  const onClickMenu: MenuProps['onClick'] = ({ key }) => {
    setSelectedMenu(key);
    // reset keywords
    setKeywords('');
    if (key === 'customers') {
      navigate('/customers');
    }
    if (key === 'technicians') {
      navigate('/technicians');
    }
    if (key === 'report') {
      navigate('/report');
    }
    if (key === 'group') {
      navigate('/group-services');
    }
    if (key === 'nail-services') {
      navigate('/nail-services');
    }
    if (key === 'gift-card') {
      navigate('/gift-cards');
    }
    if (key === 'credit-management') {
      navigate('/credit-management');
    }
    if (key === 'dashboard') {
      navigate('/');
    }
  };

  const onLogoutUser = React.useCallback(async () => {
    dispatch(setLoading(true));
    try {
      setShowConfirmModal(false);
      dispatch(removeUserInfo());
      navigate('/login');
    } catch (e) {
      console.error(e)
    }
    finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, navigate]);

  const onChangeKeywords = React.useCallback(async (value: any) => {
    setKeywords(value);
    const createSearchParams = (value: string) => {
      const searchParams = new URLSearchParams();
      searchParams.set('page', '0');
      searchParams.set('size', DEFAULT_PAGE_SIZE.toString());
      searchParams.set('direction', 'DESC');
      searchParams.set('property', 'CREATED_DATE');
      searchParams.set('name', value);
      return searchParams.toString();
    }
    if (selectedMenu === 'technicians') {
      loadEmployees(value, undefined);
    }
    if (selectedMenu === 'group') {
      loadGroups(value, undefined);
    }
    if (selectedMenu === 'nail-services') {
      loadNailServices(value, undefined);
    }
    if (selectedMenu === 'dashboard' || selectedMenu === 'customers') {
      setSelectedMenu('customers');
      navigate(`/customers?${createSearchParams(value)}`, { replace: true });
      if (selectedMenu === 'customers') {
        loadCustomers(value, undefined);
      }
    }
    if (selectedMenu === 'gift-card') {
      loadGiftCards({ code: value, statuses: [] } as TGiftCardSearch, undefined);
    }
    if (selectedMenu === 'credit-management') {
      loadCreditData(value, undefined);
    }
  }, [navigate, selectedMenu]);

  const renderInputPlaceholder = React.useMemo(() => {
    let text = 'Search customers';
    if (selectedMenu === 'technicians') {
      text = 'Search technicians';
    }
    if (selectedMenu === 'services') {
      text = 'Search services';
    }
    if (selectedMenu === 'group') {
      text = 'Search group';
    }
    if (selectedMenu === 'report') {
      text = 'Search check-in';
    }
    if (selectedMenu === 'dashboard') {
      text = 'Search customers';
    }
    if (selectedMenu === 'nail-services') {
      text = 'Search nail services';
    }
    if (selectedMenu === 'gift-card') {
      text = 'Search gift card';
    }
    return text;
  }, [selectedMenu]);

  React.useEffect(() => {
    if (!items.find((item: any) => item.key === location.pathname)) {
      const currentSubItem = items.find((item: any) => item.children?.find((item: any) => {
        return location.pathname.includes(item.key);
      })) as any;
      if (currentSubItem) {
        setOpenKeys([currentSubItem['key'] as string ?? '']);
        if (currentSubItem && currentSubItem['children']) {
          const currentSubItemKey = currentSubItem['children']?.find((item: any) => {
            return location.pathname.includes(item.key);
          });
          if (currentSubItemKey) {
            setSelectedMenu(currentSubItemKey['key'] as string ?? '');
          }
        }
      }
      return;
    }
    setOpenKeys([]);
  }, [items, location.pathname]);

  React.useEffect(() => {
    if (selectedMenu === 'gift-card') {
      setKeywords(code);
    }
  } , [selectedMenu, code]);

  return (
    <WrapperLayout style={{ minHeight: '100vh' }}>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        breakpoint="lg"
        collapsedWidth="0"
        width={220}
        onBreakpoint={broken => {
        }}
        onCollapse={(collapsed, type) => {
          setCollapsed(true);
        }}
      >
        <div className="flex w-full items-center justify-center h-[32px] my-[16px]">
          <Link to={'/'}>
            <img src="/images/logo.svg" alt="logo" className="h-[50px] w-full object-contain" />
          </Link>
        </div>
        <WrapperDisabledMenu
          mode="inline"
          disabled
          items={[
            {
              key: '1',
              label: 'Navigation',
            },
          ]}
          getPopupContainer={(node) => node.parentNode as HTMLElement}
        />
        <Menu
          key={'menu'}
          mode="inline"
          onClick={onClickMenu}
          selectedKeys={[selectedMenu]}
          openKeys={openKeys}
          onOpenChange={(keys) => {
            setOpenKeys(keys as string[]);
          }}
          items={items}
          getPopupContainer={(node) => node.parentNode as HTMLElement}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div className="flex justify-between items-center w-full pr-3">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            <div className="flex items-center gap-[16px]">
              <WrapperMenu className="flex items-center gap-[10px] font-bold pl-[16px]">
                <InputSearch
                  value={keywords}
                  setValue={setKeywords}
                  selectedMenu={selectedMenu}
                  placeholder={renderInputPlaceholder}
                  onChangeFilter={(value) => {
                    onChangeKeywords(value);
                  }}
                />
                <Dropdown menu={{ items: userList, onClick: onClickUser }}
                  overlayClassName="user-dropdown"
                  overlayStyle={{ width: '272px', minWidth: '272px', borderRadius: '12px', color: '#110C22', fontWeight: 500 }}
                  placement="bottomRight"
                  className='cursor-pointer'
                  trigger={['click']} arrow>
                  <div onClick={e => e.preventDefault()}>
                    <div className="flex gap-[19px] items-center justify-center">
                      <div className="w-full">
                        <BookingTooltip
                          placement="bottom"
                          content={userName}
                          childNode={(
                            <span className="line-clamp-1 w-full text-body-medium text-high-em">
                              {userName}
                            </span>
                          )}
                        >
                        </BookingTooltip>
                      </div>
                      <div className="w-[48px] h-[48px] min-w-[48px] rounded-[32px] box-border shadow-l-small">
                        <img alt="user" src="/images/avatar_holder.jpg" className="border-[3px] border-solid border-white w-full h-full rounded-full box-border" />
                      </div>
                    </div>
                  </div>
                </Dropdown>
              </WrapperMenu>
            </div>
          </div>
        </Header>
        <div className="flex flex-row justify-between items-center w-full px-[16px] py-[16px]">
          <Title />
          <Breadcrumbs />
        </div>
        <Content
          style={{
            margin: '0 16px 24px 16px',
            minHeight: 280,
            background: '#F8F8F8',
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
      <Modal
        title="Confirm"
        open={showConfirmModal}
        centered={true}
        onCancel={() => setShowConfirmModal(false)}
        okText="Yes"
        footer={
          <div className="grid grid-cols-[auto_auto] justify-end gap-[10px]">
            <BookingButton
              btnSize="sm"
              btnType="sub"
              onClick={() => setShowConfirmModal(false)}>
              No
            </BookingButton>
            <BookingButton btnSize="sm" onClick={onLogoutUser}>
              Yes
            </BookingButton>
          </div>
        }
      >
        <p>
          Are you sure you want to sign out?
        </p>
      </Modal>
    </WrapperLayout>
  );
};

