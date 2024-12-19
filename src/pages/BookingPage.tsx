import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod'; 
import { useAuth } from '../contexts/AuthContext';
import { Calendar, AlertCircle } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

const bookingSchema = z.object({
  date: z.string(),
  time: z.string(),
  notes: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export default function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const { user } = useAuth();
  const { service, specialist } = location.state || {};

  useEffect(() => {
    if (!service && !specialist) {
      navigate('/');
    }
  }, [service, specialist, navigate]);

  const { register, handleSubmit, formState: { errors } } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema)
  });

  const onSubmit = async (data: BookingFormData) => {
    if (!user) {
      navigate('/login', { state: { from: location } });
      return;
    }
    
    try {
      const appointmentData = {
        patientId: user.uid,
        doctorId: specialist?.id || '',
        doctorName: specialist ? `${specialist.firstName} ${specialist.lastName}` : '',
        specialization: specialist?.specialization || service?.title || '',
        date: data.date,
        time: data.time,
        notes: data.notes || '',
        status: 'scheduled',
        location: 'Studio 1', // Puoi rendere questo dinamico se necessario
        createdAt: new Date().toISOString()
      };

      await addDoc(collection(db, 'appointments'), appointmentData);
      navigate('/profilo');
    } catch (error) {
      console.error('Errore durante la prenotazione:', error);
      setError('Si è verificato un errore durante la prenotazione. Riprova più tardi.');
    }
  };

  if (!service && !specialist) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow px-6 py-8">
          <div className="text-center mb-8">
            <Calendar className="mx-auto h-12 w-12 text-rose-600" />
            <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
              Prenota Appuntamento
            </h2>
            {service && (
              <p className="mt-2 text-lg text-gray-600">
                Servizio: {service.title}
              </p>
            )}
            {specialist && (
              <p className="mt-2 text-lg text-gray-600">
                Specialista: Dr. {specialist.firstName} {specialist.lastName}
              </p>
            )}
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <p className="ml-3 text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Data
              </label>
              <input
                type="date"
                {...register('date')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                min={new Date().toISOString().split('T')[0]}
              />
              {errors.date && (
                <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                Orario
              </label>
              <select
                {...register('time')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
              >
                <option value="">Seleziona un orario</option>
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="12:00">12:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
                <option value="17:00">17:00</option>
              </select>
              {errors.time && (
                <p className="mt-1 text-sm text-red-600">{errors.time.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                Note (opzionale)
              </label>
              <textarea
                {...register('notes')}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                placeholder="Inserisci eventuali note o richieste particolari..."
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
            >
              Conferma Prenotazione
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}