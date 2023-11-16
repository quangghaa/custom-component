import React from 'react';
import { DOTS, usePagination } from './usePagination'; // Assuming usePagination is in the same directory
import classnames from 'classnames';
import "./pagination.scss";

interface PaginationProps {
    onPageChange: (page: number) => void;
    totalCount: number;
    siblingCount?: number;
    currentPage: number;
    pageSize: number;
    className: any;
}

const Pagination: React.FC<PaginationProps> = ({
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
}) => {
    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize,
    });

    if (currentPage === 0 || !paginationRange || paginationRange.length < 2) {
        return null;
    }

    function onNext() {
        onPageChange(currentPage + 1);
    };

    function onPrevious() {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];

    return (
        <ul
            className={classnames('pagination-container', { [className]: className })}
        >
            <li
                className={classnames('pagination-item', {
                    disabled: currentPage === 1
                })}
                onClick={onPrevious}
            >
                <div className="arrow left" />
            </li>
            {paginationRange.map(pageNumber => {
                if (pageNumber === DOTS) {
                    return <li className="pagination-item dots">&#8230;</li>;
                }

                return (
                    <li
                        className={classnames('pagination-item', {
                            selected: pageNumber === currentPage
                        })}
                        onClick={() => onPageChange(Number(pageNumber))}
                    >
                        {pageNumber}
                    </li>
                );
            })}
            <li
                className={classnames('pagination-item', {
                    disabled: currentPage === lastPage
                })}
                onClick={onNext}
            >
                <div className="arrow right" />
            </li>
        </ul>
    );
};

export default Pagination;
