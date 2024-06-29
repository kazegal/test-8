import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IQuotes, TApiQuote } from '../../types';
import axiosApi from '../../axios';
import QuoteForm from '../QuoteForm/QuoteForm';
import Spinner from '../../components/Spinner/Spinner';

const EditQuote = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quote, setQuote] = useState<IQuotes | null>(null);

    const fetchData = useCallback(async (quoteId: string) => {
        try {
            const response = await axiosApi.get<IQuotes>(`/quotes/${quoteId}.json`);
            setQuote(response.data);
        } catch (error) {
            console.error('Error fetching quote:', error);
            // Можно добавить логику для сообщения об ошибке пользователю
        }
    }, []);

    useEffect(() => {
        if (id) {
            fetchData(id);
        }

        return () => {
            // Логика очистки, если необходимо
        };
    }, [fetchData, id]);

    const updateQuote = async (data: TApiQuote) => {
        try {
            await axiosApi.put(`/quotes/${id}.json`, data);
            navigate('/');
        } catch (error) {
            console.error('Error updating quote:', error);
            // Можно добавить логику для сообщения об ошибке пользователю
        } finally {
            console.log('Saved!');
        }
    };

    return (
        <div>
            <h4 className="text-center mt-5 mb-5">Edit quote</h4>
            {quote ? (
                <QuoteForm onSubmit={updateQuote} quote={quote} />
            ) : (
                <Spinner />
            )}
        </div>
    );
};

export default EditQuote;
