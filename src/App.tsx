import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import SpecialistsPage from './pages/SpecialistsPage';
import Hero from './components/home/Hero';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ProfilePage from './pages/ProfilePage';
import BookingPage from './pages/BookingPage';
import EmailVerificationPage from './pages/EmailVerificationPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white">
        <Header />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/servizi" element={<ServicesPage />} />
          <Route path="/specialisti" element={<SpecialistsPage />} />
          <Route path="/contatti" element={<ContactPage />} />
          <Route path="/registrati" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profilo" element={<ProfilePage />} />
          <Route path="/recupera-password" element={<ResetPasswordPage />} />
          <Route path="/prenota" element={<BookingPage />} />
          <Route path="/verifica-email" element={<EmailVerificationPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/termini" element={<TermsPage />} />
        </Routes>
        <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
