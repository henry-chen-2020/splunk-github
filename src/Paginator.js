import React from "react";

export const PAGE_SIZE = 5;
export const Paginator = ({ pageNum, setPageNum, list }) => {
  const totalPage = Math.ceil(list.length / PAGE_SIZE);
  const setNewPage = (evt) => {
    setPageNum(parseInt(evt.target.value, 10));
  };
  const GoToPage = ({ page }) => {
    return (
      <button className="num" value={page} onClick={setNewPage}>
        {page}
      </button>
    );
  };
  const TraversePage = ({ label, stopPage, dir }) => {
    return (
      <button
        className="dir"
        disabled={pageNum === stopPage}
        onClick={() => setPageNum(pageNum + dir)}
      >
        {label}
      </button>
    );
  };

  return (
    <span className="buttons">
      <TraversePage label="Previous" dir={-1} stopPage={1} />
      <GoToPage page="1" />
      <GoToPage page="2" />
      <GoToPage page="3" />
      ...
      <GoToPage page={totalPage} />
      <TraversePage label="Next" dir={1} stopPage={totalPage} />
    </span>
  );
};
