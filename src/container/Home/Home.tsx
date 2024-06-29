import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { IQuotes } from '../../types';
import axiosApi from '../../axios';
import Spinner from '../../components/Spinner/Spinner';
import { CATEGORIES } from '../../constants';

const Home = () => {
    const [quotes, setQuotes] = useState<IQuotes[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        void fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axiosApi.get('/quotes.json');
            if (response.data) {
                const quotes: IQuotes[] = Object.keys(response.data).map((key) => ({
                    id: key,
                    author: response.data[key].author,
                    category: response.data[key].category,
                    text: response.data[key].text,
                }));
                setQuotes(quotes);
            }
        } catch (error) {
            console.error('Error fetching quotes:', error);
            // Добавьте обработку ошибки, например, отображение сообщения пользователю
        } finally {
            setLoading(false);
            console.log('Fetch complete!');
        }
    };

    const deleteQuote = async (quoteId: string) => {
        setLoading(true);
        try {
            await axiosApi.delete(`/quotes/${quoteId}.json`);
            setQuotes((prevState) => prevState.filter((quote) => quote.id !== quoteId));
        } catch (error) {
            console.error('Error deleting quote:', error);
            // Добавьте обработку ошибки, например, отображение сообщения пользователю
        } finally {
            setLoading(false);
            console.log('Quote deleted!');
            navigate('/');
        }
    };

    const quotesCount = () => {
        if (quotes.length === 0) {
            return (
                <>
                    <h2 className="text-center mt-5">No Quotes yet...</h2>
                    <h3 className="text-center mt-3">Please Add New Quote!</h3>
                </>
            );
        }
    };

    return (
        <div className="d-flex justify-content-around m-3">
            {quotesCount()}
            <div className="card p-2 w-25">
                {loading ? (
                    <Spinner />
                ) : (
                    CATEGORIES.map((category) => (
                        <NavLink className="btn btn-primary d-block m-2" key={category.id} to={`/quotes/${category.id}`}>
                            {category.title}
                        </NavLink>
                    ))
                )}
            </div>
            <div className="w-50">
                {loading ? (
                    <Spinner />
                ) : (
                    quotes.map((quote) => (
                        <div key={quote.id}>
                            <div className="card p-3 m-3">
                                <h5 className="text-success fw-bold text-capitalize ms-auto">{quote.author}</h5>
                                <span className="mt-2">{quote.text}</span>
                                <div className="ms-auto">
                                    <Link className="btn btn-warning mt-5 me-2" to={`/quotes/${quote.id}/edit/`}>
                                        Edit
                                    </Link>
                                    <button className="btn btn-danger mt-5 me-2" onClick={() => deleteQuote(quote.id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Home;
