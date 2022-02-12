import css from '../styles/Home.module.css';
import React from "react";

interface Props {
    onLoadMore: () => void;
    totalCount: number;
    itemCount: number;
}

export const Pagination = ({
    onLoadMore,
    totalCount,
    itemCount
}: Props) => {
    return(
        <nav className="nav">
            { itemCount < totalCount &&
                <a onClick={onLoadMore} className={css["button-accent"]}>
                    Load More
                </a>
            }           
                {itemCount &&totalCount&& (
                    <div className="info">
                        {itemCount} out of {totalCount}
                    </div>
                )}
            <style jsx>{`
                .nav {
                    margin: 2rem 0;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
                .info {
                    margin-top: 0.5rem;
                    color: var(--foreground-color-faded)
                }
            `}</style>
        </nav>
    )
}