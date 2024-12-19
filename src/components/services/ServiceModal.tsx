import React from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Service } from '../../types';

interface ServiceModalProps {
  service: Service;
  isOpen: boolean;
  onClose: () => void;
}

export default function ServiceModal({ service, isOpen, onClose }: ServiceModalProps) {
  if (!isOpen) return null;

  const navigate = useNavigate();

  const handleBooking = () => {
    navigate('/prenota', { state: { service } });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
              onClick={onClose}
            >
              <span className="sr-only">Chiudi</span>
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 rounded-full bg-rose-100">
                  <service.icon className="h-6 w-6 text-rose-600" />
                </div>
              </div>
              <h3 className="text-2xl leading-6 font-semibold text-gray-900 text-center mb-4" id="modal-title">
                {service.title}
              </h3>
              <div className="mt-4 space-y-4">
                <p className="text-sm text-gray-500">{service.longDescription}</p>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Il servizio include:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-500 space-y-1">
                    {service.includes.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <div className="text-sm text-gray-500 mb-2">
                    <span className="font-medium text-gray-900">Durata:</span> {service.duration}
                  </div>
                  <div className="text-lg font-semibold text-rose-600 mb-4">
                    {service.price}
                  </div>
                  <button
                    type="button"
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                    onClick={handleBooking}
                  >
                    Prenota Appuntamento
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}