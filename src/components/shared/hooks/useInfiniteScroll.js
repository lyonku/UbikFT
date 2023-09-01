import React, { useState, useEffect } from "react";

const useInfiniteScroll = ({ сurrentPage, func, className, maxPages }) => {
  const [page, setPage] = useState(сurrentPage);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (fetching) {
      func(page)
        .then(() => {
          setPage((prevState) => prevState + 1);
        })
        .finally(() => setFetching(false));
    }
  }, [fetching]);

  useEffect(() => {
    const element = document.querySelector(className);
    element.addEventListener("scroll", checkPosition);
    return () => {
      element.removeEventListener("scroll", checkPosition);
    };
  }, [page, maxPages]);

  const checkPosition = () => {
    const element = document.querySelector(className);
    const scrollPosition = element.scrollTop;
    const maxScrollHeight = element.scrollHeight - element.clientHeight;
    if (maxScrollHeight - scrollPosition < 100 && page < maxPages) {
      setFetching(true);
    }
  };
};

export default useInfiniteScroll;
