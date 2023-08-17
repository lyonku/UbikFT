import { useEffect } from "react";

function Filters({ data, currentFilter, setCurrentFilter }) {
  useEffect(() => {
    setCurrentFilter(data[0].id);
  }, []);

  return (
    <div className="Filters">
      {data.map((item, index) => {
        return (
          <div
            key={index}
            onClick={() => setCurrentFilter(item.id)}
            className={`Filter ${currentFilter == item.id && "active"}`}
          >
            {item.text}
          </div>
        );
      })}
    </div>
  );
}

export default Filters;
