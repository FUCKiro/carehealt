import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, UserPlus, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';

export default function Header() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center" onClick={closeMenu}>
              <Heart className="h-8 w-8 text-rose-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">Centro Medico Plus</span>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-8">
            <Link to="/servizi" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Servizi
            </Link>
            <Link to="/specialisti" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Specialisti
            </Link>
            <Link to="/contatti" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Contatti
            </Link>
            {user ? (<>
                <Link
                  to="/profilo"
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                >
                  Profilo
                </Link>
                <button
                  onClick={() => logout()}
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                >
                  Esci
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                >
                  Accedi
                </Link>
                <Link
                  to="/registrati"
                  className="inline-flex items-center text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                >
                  <UserPlus className="h-4 w-4 mr-1" />
                  Registrati
                </Link>
              </>
            )}
            <Link to="/prenota" className="bg-rose-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
              Prenota Visita
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/servizi"
              className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              onClick={closeMenu}
            >
              Servizi
            </Link>
            <Link
              to="/specialisti"
              className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              onClick={closeMenu}
            >
              Specialisti
            </Link>
            <Link
              to="/contatti"
              className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              onClick={closeMenu}
            >
              Contatti
            </Link>
            {user ? (
              <>
                <Link
                  to="/profilo"
                  className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                  onClick={closeMenu}
                >
                  Profilo
                </Link>
                <button
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                >
                  Esci
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                  onClick={closeMenu}
                >
                  Accedi
                </Link>
                <Link
                  to="/registrati"
                  className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                  onClick={closeMenu}
                >
                  <UserPlus className="h-4 w-4 inline-block mr-1" />
                  Registrati
                </Link>
              </>
            )}
            <Link
              to="/prenota"
              className="block px-3 py-2 text-base font-medium bg-rose-600 text-white hover:bg-rose-700 rounded-md"
              onClick={closeMenu}
            >
              Prenota Visita
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}