import React from "react";

const ContestBtn = ({ activeContest, router }) => {
  if (activeContest.type !== "workAcceptance") {
    return null;
  }

  const handleClick = () => {
    router.toView("main");
  };

  return (
    <div className="Contest__btn btn" onClick={handleClick}>
      Принять участие в конкурсе
    </div>
  );
};

export default ContestBtn;
