import React, { useState } from "react";
import { PAGE_SIZE, Paginator } from "./Paginator";

const sortList = (list, { sort, ord }, pageNum, pageSize = PAGE_SIZE) => {
  const start = (pageNum - 1) * pageSize;
  return list
    .sort((a, b) => (a[sort] > b[sort] ? 1 : -1) * ord)
    .slice(start, start + pageSize);
};

const SplunkRepos = ({ list }) => {
  const [pageNum, setPageNum] = useState(1);
  const [sortOrder, setSortOrder] = useState({ sort: "name", ord: 1 });
  const setSort = (evt) => {
    const newSort = evt.target.getAttribute("data");
    if (newSort === sortOrder.sort) {
      setSortOrder(({ sort, ord }) => ({ sort, ord: ord * -1 }));
    } else {
      setSortOrder(() => ({ sort: newSort, ord: -1 }));
      setPageNum(1);
    }
  };
  const Col = ({ label, type, attr }) => {
    const Arrow = ({ attr }) => {
      const arrow =
        sortOrder.sort === attr ? (sortOrder.ord === 1 ? "up" : "down") : "";
      return <span className={arrow} />;
    };
    return (
      <th className={type} data={attr} onClick={setSort}>
        {label} <Arrow attr={attr} />
      </th>
    );
  };

  return (
    <div>
      <div className="title">
        <h1>
          Splunk <span className="plus">+</span> Github
        </h1>
        <Paginator {...{ pageNum, setPageNum, list }} />
      </div>
      <table>
        <thead>
          <tr>
            <Col label="Name" type="name" attr="name" />
            <Col label="Last Commiter" type="number" attr="author" />
            <Col label="# Forks" type="number" attr="forks" />
            <Col label="# Stars" type="number" attr="stars" />
          </tr>
        </thead>
        <tbody>
          {sortList(list, sortOrder, pageNum).map((row) => {
            const initials = row.name?.slice(0, 1) + row.name?.slice(-1);
            return (
              <tr key={row.key}>
                <td className="title">
                  <span className="circle">
                    {initials && initials.toUpperCase()}
                  </span>
                  {row.name}
                </td>
                <td>{row.author}</td>
                <td>{row.forks}</td>
                <td>{row.stars}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SplunkRepos;
