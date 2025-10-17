import { useState } from 'react';
import { Search } from 'lucide-react';
import '../Styles/SearchBar.css';

const SearchBar = ({ onSearch, placeholder = 'Search leagues or teams...' }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (value) => {
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="search-bar">
      <Search className="search-icon" size={20} />
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={placeholder}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;
