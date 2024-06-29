import React, { useState } from 'react';
import { IQoteForm, TApiQuote } from '../../types';
import { CATEGORIES } from '../../constants';

const QuoteForm: React.FC<IQoteForm> = ({ onSubmit, quote }) => {
    const initialState = quote
        ? { ...quote }
        : {
            author: '',
            category: '',
            text: '',
        };

    const [newQuote, setNewQuote] = useState<TApiQuote>(initialState);

    const quoteChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setNewQuote((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onSubmit({
            ...newQuote,
        });
    };

    return (
        <form className="card p-3 m-5" onSubmit={onFormSubmit}>
            <div className="form-group mb-4">
                <label className="text-danger mb-2" htmlFor="category">
                    Category
                </label>
                <select
                    className="form-select"
                    id="category"
                    value={newQuote.category}
                    onChange={quoteChange}
                    name="category"
                    required
                >
                    <option value="" disabled>
                        Select Category
                    </option>
                    {CATEGORIES.map((key) => (
                        <option key={key.id}>{key.title}</option>
                    ))}
                </select>
            </div>

            <div className="form-group mb-4">
                <label className="text-primary" htmlFor="author">
                    Author:
                </label>
                <input
                    name="author"
                    id="author"
                    className="form-control m-2"
                    value={newQuote.author}
                    onChange={quoteChange}
                    required
                />
            </div>

            <div className="form-group">
                <label className="text-primary" htmlFor="text">
                    Quote text:
                </label>
                <textarea
                    name="text"
                    id="text"
                    className="form-control m-2"
                    value={newQuote.text}
                    onChange={quoteChange}
                    required
                />
            </div>

            <div className="d-flex">
                <button className="btn btn-success mt-4 ms-auto" type="submit">
                    {quote ? 'Save' : 'Create'}
                </button>
            </div>
        </form>
    );
};

export default QuoteForm;
