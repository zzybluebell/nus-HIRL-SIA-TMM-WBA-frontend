import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ChangePassword from './views/ChangePassword/ChangePassword'
import ChangeSession from './views/ChangeSession/ChangeSession'
import Dashboard from './views/Dashboard/Dashboard'
import Exercise from './views/Exercise/Exercise'
import Fatigue from './views/Fatigue/Fatigue'
import ForgetPassword from './views/ForgetPassword/ForgetPassword'
import HealthMetrics from './views/HealthMetrics/HealthMetrics'
import Home from './views/Home/Home'
import Layout from './views/Layout/Layout'
import Login from './views/Login/Login'
import MockSSO from './views/MockSSO/MockSSO'
import Onboarding from './views/OnBoarding'
import OnBoardingSession from './views/OnBoardingSession/OnBoardingSession'
import PageNotFound from './views/PageNotFound/PageNotFound'
import Pvt from './views/Pvt/Pvt'
import Register from './views/Register/Register'
import Schedule from './views/Schedule/Schedule'
import SessionAdd from './views/SessionAdd/SessionAdd'
import Sleep from './views/Sleep/Sleep'
import Unauthorized from './views/Unauthorized/Unauthorized'
import User from './views/User/User'
import Wellbeing from './views/Wellbeing/Wellbeing'
import Workload from './views/Workload/Workload'
import Whitelist from './views/Whitelist/Whitelist'
import SessionEdit from './views/SessionAdd/SessionEdit'
import Collection from './views/Collection/Collection'
import PrivacyPolicy from './views/PrivacyPolicy/PrivacyPolicy'

// const Home = lazy(() => import('./views/Home/Home'))
// const Layout = lazy(() => import('./views/Layout/Layout'))
// const Dashboard = lazy(() => import('./views/Dashboard/Dashboard'))
// const ChangePassword = lazy(() => import('./views/ChangePassword/ChangePassword'))
// const ChangeSession = lazy(() => import('./views/ChangeSession/ChangeSession'))

function App() {
  return (
    <BrowserRouter>
      {/* <Suspense fallback={<div>Loading...</div>}></Suspense> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/mocksso' element={<MockSSO />} />
        <Route path='/onboarding' element={<Onboarding />} />
        <Route path='/unauthorized' element={<Unauthorized />} />
        <Route path='/forgetPassword' element={<ForgetPassword />} />
        <Route path='/register' element={<Register />} />
        <Route path='/privacy' element={<PrivacyPolicy />} />
        <Route path='/layout' element={<Layout />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='user' element={<User />} />
          <Route path='collection' element={<Collection />} />
          <Route path='sleep' element={<Sleep />} />
          <Route path='exercise' element={<Exercise />} />
          <Route path='healthMetrics' element={<HealthMetrics />} />
          <Route path='fatigue' element={<Fatigue />} />
          <Route path='workload' element={<Workload />} />
          <Route path='wellbeing' element={<Wellbeing />} />
          <Route path='pvt' element={<Pvt />} />
          <Route path='onBoardingSession' element={<OnBoardingSession />} />
          <Route path='schedule' element={<Schedule />} />
          <Route path='changePassword' element={<ChangePassword />} />
          <Route path='sessionAdd' element={<SessionAdd />} />
          <Route path='session-edit/:id' element={<SessionEdit />} />
          <Route path='session-view' element={<ChangeSession />} />
          <Route path='whitelist' element={<Whitelist />} />
        </Route>
        {/* 404页面处理 */}
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
