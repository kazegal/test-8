import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import Home from './container/Home/Home';
import Toolbar from './components/Toolbar/Toolbar';
import AddQuote from './container/AddQuote/AddQuote';
import EditQuote from './container/EditQuote/EditQuote';
import { CATEGORIES } from './constants';
import Category from './components/Category/Category';
import './App.css';

const App = () => {
  return (
      <ErrorBoundary>
        <Router>
          <>
            <header>
              <Toolbar />
            </header>
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/quotes" element={<Home />} />
                {CATEGORIES.map((category, index) => (
                    <Route
                        key={index}
                        path={`/quotes/${category.id}`}
                        element={<Category categoryId={category.id} title={category.title} />}
                    />
                ))}
                <Route path="/add-quote" element={<AddQuote />} />
                <Route path="/quotes/:id/edit/" element={<EditQuote />} />
                <Route path="*" element={<h1 className="text-center mt-5">Страница не найдена!</h1>} />
              </Routes>
            </main>
          </>
        </Router>
      </ErrorBoundary>
  );
}

export default App;
