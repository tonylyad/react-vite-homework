import { useState } from 'react';
import { getCatFacts } from '../api/catFactsApi';
import { FactCard } from './FactCard';
import { ErrorCard } from './ErrorCard';

export function CatFacts() {
  const [facts, setFacts] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const loadFacts = async () => {
    setIsLoading(true);
    setError('');
    setFacts([]);

    try {
      const catFacts = await getCatFacts();
      setFacts(catFacts);
    } catch (err) {
      const status = err.response?.status;

      const message = status
        ? `Ошибка API. Код ответа: ${status}`
        : 'Не удалось выполнить запрос к API';

      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="cat-facts">
      <h1>Факты о котах</h1>

      <button onClick={loadFacts} disabled={isLoading}>
        {isLoading ? 'Загрузка...' : 'Загрузить факты'}
      </button>

      {error && <ErrorCard message={error} />}

      <div className="facts-list">
        {facts.map((item) => (
          <FactCard key={item.fact} fact={item.fact} />
        ))}
      </div>
    </section>
  );
}