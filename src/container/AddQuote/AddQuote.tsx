import { useState } from 'react';
import QuoteForm from '../QuoteForm/QuoteForm';
import { useNavigate } from 'react-router-dom';
import { TApiQuote } from '../../types';
import axiosApi from '../../axios';
import Spinner from '../../components/Spinner/Spinner';

const AddQuote = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null); // Состояние для хранения ошибки
    const navigate = useNavigate();

    const onCreate = async (data: TApiQuote) => {
        setLoading(true);
        try {
            await axiosApi.post('/quotes.json', data);
            // Успешно добавлено, переходим на главную страницу
            navigate('/');
        } catch (error) {
            // Обработка ошибки
            console.error('Error creating quote:', error);
            setError('Failed to add quote. Please try again.'); // Установка текста ошибки
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-5">
            <h4 className="text-center mt-5 mb-5">Add New Quote</h4>
            {error && <div className="alert alert-danger">{error}</div>} {/* Отображение сообщения об ошибке */}
            {loading ? <Spinner /> : <QuoteForm onSubmit={onCreate} />}
        </div>
    );
};

export default AddQuote;
