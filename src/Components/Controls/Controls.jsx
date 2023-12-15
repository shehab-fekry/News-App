import React, { useRef } from "react";
import styles from './Controls.module.css';

const Controls = (props) => {
    const sourceRef = useRef();
    const dateRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();
        let source = sourceRef.current.value;
        let date = dateRef.current.value;
        
        props.onFilter(source, date);
    }

    return (
        <div className={styles.Controls}>
            <div className={styles.switch}>
                <button>Results ({props.counter})</button>
                <button>Wishlist (0)</button>
            </div>
            <form className={styles.Filters} onSubmit={submitHandler}>
                <div className={styles.date}>
                    <label htmlFor="date">Date</label>
                    <select  id="date" ref={dateRef}>
                        <option defaultChecked value='all'>All</option>
                        <option value='2019'>2019</option>
                        <option value='2020'>2020</option>
                        <option value='2021'>2021</option>
                        <option value='2022'>2022</option>
                        <option value='2023'>2023</option>
                    </select>
                </div>
                <div className={styles.source}>
                    <label htmlFor="source">Source</label>
                    <select id="source" ref={sourceRef}>
                        <option defaultChecked value='all'>All</option>
                        <option value='CNN'>CNN</option>
                        <option value='Engadget'>Engadget</option>
                        <option value='Wired'>Wired</option>
                        <option value='Reuters'>Reuters</option>
                        <option value='BBC News'>BBC News</option>
                        <option value='NBC News'>NBC News</option>
                        <option value='Euronews'>Euronews</option>
                        <option value='Gizmodo.com'>Gizmodo.com</option>
                        <option value='Yahoo Entertainment'>Yahoo Entertainment</option>

                    </select>
                </div>
                <div className={styles.actions}>
                    <button className={styles.apply}>apply</button>
                </div>
            </form>
        </div>
    )
}

export default Controls;