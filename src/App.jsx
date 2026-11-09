import React, { useEffect } from 'react';
import { Routes, Route, Navigate, Outlet, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import { RequireCustomer, RequireMitra, RequireOwner, RequireStaff } from './auth/RequireAuth.jsx';
import { useAuth } from './auth/AuthContext';

// 🔧 DEV ONLY: Role switcher for UI testing without backend
const DevRoleSwitcher = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const roles = [
    { key: 'customer', label: '🛒 Customer', path: '/customer/home', desc: 'Dashboard, Catalog, MyMelon, Orders, Profile, Scan, EduTani' },
    { key: 'mitra', label: '🤝 Mitra', path: '/mitra/home', desc: 'Home, Kuota, Pesanan, Invoice, Profile' },
    { key: 'owner', label: '👑 Owner', path: '/owner', desc: 'Home, Orders, Production, Batches, Reports, Profile' },
    { key: 'staff', label: '👷 Staff', path: '/staff/home', desc: 'Dashboard, Scan, Activity, Profile, PlantDetail, OrderDetail' },
  ];

  const loginAs = (role) => {
    const user = {
      id: 1,
      name: `Dev ${role.charAt(0).toUpperCase() + role.slice(1)}`,
      phone: '62800000000',
      role: role,
      created_at: new Date().toISOString()
    };
    localStorage.setItem('auth_token', 'dev-token-' + role);
    localStorage.setItem('auth_user', JSON.stringify(user));
    // Force reload to re-initialize AuthContext
    window.location.href = roles.find(r => r.key === role).path;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-green-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center text-3xl">
            🔧
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Dev Role Switcher</h1>
          <p className="text-gray-500 mt-1">Quick login for UI testing (no backend needed)</p>
        </div>

        <div className="space-y-3">
          {roles.map(({ key, label, path, desc }) => (
            <button
              key={key}
              onClick={() => loginAs(key)}
              className="w-full text-left p-4 bg-gray-50 hover:bg-green-50 border border-green-100 rounded-xl transition-all hover:border-green-300 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-800">{label}</span>
                <span className="text-xs text-green-600 font-medium">→</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">{desc}</p>
            </button>
          ))}

          <button
            onClick={() => {
              logout();
              window.location.href = '/';
            }}
            className="w-full mt-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl hover:bg-red-100 transition font-medium"
          >
            🚪 Logout & Back to Splash
          </button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          ⚠️ Development only — remove before production
        </p>
      </div>
    </div>
  );
};

// Auth flow
import Splash from './screens/auth/Splash.jsx';
import Onboarding from './screens/auth/Onboarding.jsx';
import SignIn from './screens/auth/SignIn.jsx';
import SignUp from './screens/auth/SignUp.jsx';
import RoleSelection from './screens/auth/RoleSelection.jsx';
import OTPVerification from './screens/auth/OTPVerification.jsx';

// Dashboards Customer
import { CustomerProvider } from './screens/customer/CustomerContext.jsx';
import { CustomerTabsLayout, CustomerPageLayout } from './screens/customer/CustomerUI.jsx';
import CustomerDashboard from './screens/customer/Dashboard.jsx';
import Catalog from './screens/customer/Catalog.jsx';
import ProductDetail from './screens/customer/ProductDetail.jsx';
import Cart from './screens/customer/Cart.jsx';
import Checkout, { AdoptionCheckout } from './screens/customer/Checkout.jsx';
import OrderSuccess from './screens/customer/OrderSuccess.jsx';
import Orders, { OrderDetail } from './screens/customer/Orders.jsx';
import MyMelon, { GrowthDetail } from './screens/customer/MyMelon.jsx';
import Profile from './screens/customer/Profile.jsx';
import Scan from './screens/customer/Scan.jsx';
import EduTani from './screens/customer/EduTani.jsx';

// Mitra Operasional
import MitraHome from './screens/mitra/Home.jsx';
import MitraCatalog from './screens/mitra/Catalog.jsx';
import MitraCatalogDetail from './screens/mitra/CatalogDetail.jsx';
import MitraOrders from './screens/mitra/Orders.jsx';
import MitraOrderDetail from './screens/mitra/OrderDetail.jsx';
import MitraInvoice from './screens/mitra/Invoice.jsx';
import MitraProfile from './screens/mitra/Profile.jsx';
import MitraBottomNav from './components/MitraBottomNav.jsx';

// Owner Operasional
import OwnerLayout from './screens/owner/OwnerLayout';
import OwnerHome from './screens/owner/OwnerHome';
import OwnerOrders from './screens/owner/OwnerOrders';
import OwnerOrderDetail from './screens/owner/OwnerOrderDetail';
import OwnerProduction from './screens/owner/OwnerProduction';
import OwnerBatchDetail from './screens/owner/OwnerBatchDetail';
import OwnerReports from './screens/owner/OwnerReports';
import OwnerProfile from './screens/owner/OwnerProfile';

// Staff Operasional
import { StaffProvider } from './screens/staff/StaffContext.jsx';
import StaffTabsLayout from './screens/staff/StaffTabsLayout.jsx';
import StaffDashboard from './screens/staff/Dashboard.jsx';
import StaffScan from './screens/staff/Scan.jsx';
import StaffActivity from './screens/staff/Activity.jsx';
import StaffProfile from './screens/staff/Profile.jsx';
import StaffPlantDetail from './screens/staff/PlantDetail.jsx';
import StaffOrderDetail from './screens/staff/OrderDetail.jsx';


// Layout khusus untuk Mitra
const MitraTabsLayout = () => {
  return (
    <div className="relative min-h-screen pb-16 bg-gray-50">
      <Outlet />
      <MitraBottomNav />
    </div>
  );
};


export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* --- AUTH --- */}
        <Route index element={<Splash />} />
        <Route path="onboarding" element={<Onboarding />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="role-selection" element={<RoleSelection />} />
        <Route path="otp-verification" element={<OTPVerification />} />
        {/* --- DEV ONLY: Role Switcher --- */}
        <Route path="dev" element={<DevRoleSwitcher />} />

        {/* --- ROUTE CUSTOMER --- */}
        <Route path="customer" element={<CustomerProvider><Outlet /></CustomerProvider>}>
          <Route index element={<Navigate to="home" replace />} />
          <Route element={<RequireCustomer><CustomerTabsLayout /></RequireCustomer>}>
            <Route path="home" element={<CustomerDashboard />} />
            <Route path="catalog" element={<Catalog />} />
            <Route path="my-melon" element={<MyMelon />} />
            <Route path="orders" element={<Orders />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route element={<RequireCustomer><CustomerPageLayout /></RequireCustomer>}>
            <Route path="product/:productId" element={<ProductDetail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="adoption-checkout" element={<AdoptionCheckout />} />
            <Route path="order-success" element={<OrderSuccess />} />
            <Route path="adoption-success" element={<OrderSuccess />} />
            <Route path="order/:orderId" element={<OrderDetail />} />
            <Route path="melon/:adoptionId" element={<GrowthDetail />} />
            <Route path="scan" element={<Scan />} />
            <Route path="edu-tani" element={<EduTani />} />
          </Route>
        </Route>

        {/* --- ROUTE MITRA --- */}
        <Route path="mitra">
          <Route index element={<Navigate to="home" replace />} />
          <Route element={<RequireMitra><MitraTabsLayout /></RequireMitra>}>
            <Route path="home" element={<MitraHome />} />
            <Route path="kuota" element={<MitraCatalog />} />
            <Route path="pesanan" element={<MitraOrders />} />
            <Route path="invoice" element={<MitraInvoice />} />
            <Route path="profile" element={<MitraProfile />} />
          </Route>
          {/* Detail Tanpa BottomNav */}
          <Route path="kuota/:id" element={<RequireMitra><MitraCatalogDetail /></RequireMitra>} />
          <Route path="pesanan/:id" element={<RequireMitra><MitraOrderDetail /></RequireMitra>} />
        </Route>

        {/* --- ROUTE OWNER --- */}
        <Route path="owner" element={<RequireOwner><OwnerLayout /></RequireOwner>}>
          <Route index element={<OwnerHome />} />
          <Route path="orders" element={<OwnerOrders />} />
          <Route path="orders/:id" element={<OwnerOrderDetail />} />
          <Route path="production" element={<OwnerProduction />} />
          <Route path="batch/:id" element={<OwnerBatchDetail />} />
          <Route path="reports" element={<OwnerReports />} />
          <Route path="profile" element={<OwnerProfile />} />
        </Route>

        {/* --- ROUTE STAFF --- */}
        <Route path="staff" element={<RequireStaff><StaffProvider /></RequireStaff>}>
          <Route index element={<Navigate to="home" replace />} />
          <Route element={<RequireStaff><StaffTabsLayout /></RequireStaff>}>
            <Route path="home" element={<StaffDashboard />} />
            <Route path="scan" element={<StaffScan />} />
            <Route path="activity" element={<StaffActivity />} />
            <Route path="profile" element={<StaffProfile />} />
          </Route>
          <Route path="plant/:code" element={<RequireStaff><StaffPlantDetail /></RequireStaff>} />
          <Route path="order/:id" element={<RequireStaff><StaffOrderDetail /></RequireStaff>} />
        </Route>

        {/* --- FALLBACK --- */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
