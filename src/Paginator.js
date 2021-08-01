import React from "react";

const Paginator = ({ pageNum, setPageNum, totalPage }) => {
  const setPage = (evt) => {
    setPageNum(parseInt(evt.target.value, 10));
  };
  const GoPage = ({ page }) => {
    return (
      <button className="num" value={page} onClick={setPage}>
        {page}
      </button>
    );
  };
  return (
    <span className="buttons">
      <button
        className="dir"
        disabled={pageNum === 1}
        onClick={() => setPageNum(pageNum - 1)}
      >
        Previous
      </button>
      <GoPage page="1" />
      <GoPage page="2" />
      <GoPage page="3" />
      ...
      <GoPage page={totalPage} />
      <button
        className="dir"
        disabled={pageNum === totalPage}
        onClick={() => setPageNum(pageNum + 1)}
      >
        Next
      </button>
    </span>
  );
};

export default Paginator;
