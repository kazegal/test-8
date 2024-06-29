export interface IQuotes {
    id:string;
    author:string;
    category:string;
    text:string;
}

export type TApiQuote = Omit<IPost,'id'>;

export interface IQoteForm {
    onSubmit: (newQuote: TApiQuote) => void;
    quote?: TApiQuote;
}