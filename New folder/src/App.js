import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Singup from './Singup';
import Payement from './Payement';
import ForgotPassword from "./ForgotPassword";
import Matches from "./Matches";
import Category from "./Category"; 
import Guest from './Guest';
import Reset from './Reset';
import WelcomeScreen from './WelcomeScreen';
import Success from './Success';
import TicketQuantityPage from './TicketQuantityPage';
import Confirmation from './Confirmation';
import  DoorsPage from './DoorsPage';
import AuthGuard from './Authguard';

import Layout from './Layout';
import Done from './Done';
import MyTickets from './MyTickets';
import TicketDetail from './Ticket';
import AdminMatches from './AdminMatches';
import AdminStadiums from './AdminStadiums';

export const RecoveryContext = createContext();

function App() {

  const [qrCode, setQrCode] = useState(null);

  return (
    
    <Router>
      <Routes>
        <Route path='/' element={<Layout><Login /></Layout>} />
        <Route path='/singup' element={<Layout><Singup /></Layout>} />
        <Route path='/payement' element={             <Layout> <Payement setQrCode={setQrCode}/></Layout> } />
        <Route path='/ForgotPassword' element={ <Layout><ForgotPassword /></Layout>} />
        <Route path='/Matches' element={ <Layout> <Matches /></Layout>  } />
        <Route path='/Category' element={  <Layout><Category /> </Layout> } />
        <Route path='/Guest' element={ <Layout> <Guest /></Layout> } />
        <Route path='/Reset' element={ <Layout> <Reset /></Layout> } />
        <Route path='/WelcomeScreen' element={ <Layout><WelcomeScreen /></Layout> } />
        <Route path='/TicketQuantityPage' element={  <Layout><TicketQuantityPage /></Layout> } />
        <Route path="/success" element={ <Layout> <Success qrCode={qrCode} /></Layout> } />
        <Route path="/DoorsPage" element={<Layout>< DoorsPage /></Layout>} />
        <Route path="/Done" element={ <Layout> <Done/></Layout> } />
        <Route path="/my-tickets" element={<Layout><MyTickets /></Layout>} />
        <Route path="/Confirmation" element={<Layout>< Confirmation /></Layout>} />
        <Route path="/ticket/:ticketId" element={<Layout><TicketDetail /></Layout>} />
        <Route path="/Admin/matches" element={<Layout><AdminMatches /></Layout>} />
        <Route path="/Admin/stadiums" element={<Layout><AdminStadiums /></Layout>} />

       
      </Routes>
    </Router>
   
  );
}

export default App;
