import React, { useState } from "react";
import s from './paginator.module.css'
import cn from 'classnames';
import Pagination from '@material-ui/lab/Pagination';
type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}

const Paginatori = (props: PropsType) => {
    let pagesCount = Math.ceil(props.totalItemsCount / props.pageSize)
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let portionSize = 15
    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1 ) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize
    return (
        <div>
            <div className={s.pag}>
                <div>
                    <button onClick={() => {setPortionNumber(portionNumber - 1)}}>prev</button>
                </div>
                {pages
                    .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map((p) => {
                    return <span
                        className={cn({[s.selectedPage] : props.currentPage === p}, s.pageNumber)}
                        onClick={() => {props.onPageChanged(p)}}>
                            {p}
                        </span>
                })}
                {portionCount > portionNumber && <button onClick={() => {setPortionNumber(portionNumber + 1)}}>next</button>}
            </div>
        </div>
    )
}

export default Paginatori