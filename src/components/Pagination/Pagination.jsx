import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Pagination = ({ totalPage, page, query }) => {
  const location = useLocation();

  const genItems = showItems => {
    if (!totalPage) return [];
    const items = [];
    let start = Number(page) - Math.trunc(showItems / 2);
    if (showItems > totalPage) {
      showItems = totalPage;
    }
    if (start < 1) {
      start = 1;
    } else if (start + showItems > totalPage) {
      start = totalPage - showItems + 1;
    }

    for (let i = start; i < start + showItems; i++) {
      items.push(i.toString());
    }

    return items;
  };

  return (
    <div className="mt-4 d-flex justify-content-center">
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <Link
              to={location.pathname + `?query=${query}&page=1`}
              className="page-link"
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
            </Link>
          </li>
          {genItems(9).map(item => {
            return (
              <li
                className={page === item ? 'page-item active' : 'page-item'}
                key={item}
              >
                <Link
                  to={location.pathname + `?query=${query}&page=${item}`}
                  className="page-link"
                >
                  {item}
                </Link>
              </li>
            );
          })}
          <li className="page-item">
            <Link
              to={location.pathname + `?query=${query}&page=${totalPage}`}
              className="page-link"
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
