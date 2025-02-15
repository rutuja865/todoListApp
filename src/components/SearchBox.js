export default function SearchBox({ search, setSearch }) {
    return (
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search tasks..."
        className="search-box"
      />
    );
  }
  