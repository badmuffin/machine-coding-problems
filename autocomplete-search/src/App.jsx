import React, { useEffect, useState } from "react";

const App = () => {
  const [result, setResult] = useState([]);
  const [input, setInput] = useState("");
  const [isResultVisible, setIsResultVisible] = useState(false);
  const [cache, setCache] = useState({});

  const fetchData = async () => {
    const key = input.trim().toLowerCase();

    if (cache[key]) {
      setResult(cache[key]);
      console.log("CACHE -> ", key);
      return;
    }

    console.log("API TEST -> ", input);
    const data = await fetch(`https://dummyjson.com/recipes/search?q=${input}`);
    const json = await data.json();

    setResult(json?.recipes);
    // putting key in square bracket because key is dynamic, otherwise it will simply take key as string literal.
    setCache((prev) => ({ ...prev, [key]: json?.recipes }));
  };

  // debouncing
  useEffect(() => {
    const timer = setTimeout(fetchData, 350);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <div className="app">
      <h1>Autocomplete Search Bar</h1>

      <div>
        <input
          type="text"
          className="input-search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setIsResultVisible(true)}
          onBlur={() => setIsResultVisible(false)}
        />
        {isResultVisible && (
          <ul className="result-container">
            {result.map((data) => (
              <li className="result" key={data.id}>
                {data.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;
