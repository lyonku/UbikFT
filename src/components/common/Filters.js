import { useEffect } from "react";

function Filters({
  data,
  currentFilter,
  defaultFilter = true,
  setCurrentFilter,
}) {
  useEffect(() => {
    if (!currentFilter && defaultFilter) {
      setCurrentFilter(data[0].id);
    }
  }, []);

  return (
    <div className="Filters">
      {data.map((item, index) => {
        return (
          <div
            key={index}
            onClick={() => setCurrentFilter(item.id)}
            className={`Filter ${item.id?.includes(currentFilter) && "active"}`}
          >
            {item.text}
          </div>
        );
      })}
    </div>
  );
}

export default Filters;
