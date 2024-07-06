/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Viewer } from '@toast-ui/react-editor';
import { Link, useSearchParams } from 'react-router-dom';


const BoardView = (props) => {
    const [board, setBoard] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get("id");

    useEffect(() => {
        axios.get(`/api/boardview?id=${id}`)
            .then(response => setBoard(response.data));
    })
    // useEffect(() => {
    //     console.log("ddd")
    // }, [])

    return (
        <div className="margin-left-20">
            <br />
            <br />
            <br />
            <h2>{board.title}</h2>
            <hr />
            <div className="text-align-end padding-lr-10"><p>작성자 : {board.userid}</p></div>
            <br />
            {board.content&&<Viewer events={['load','change']} initialValue={board.content} theme="dark"/>}
            <div style={{height:100}}></div>
            <hr/>
            <div className="text-align-end padding-20">
                <Link to={`/boardupdate?id=${id}`}>
                    <button className="btn btn-outline-light">수정하기</button>
                </Link>
            </div>
            <div style={{height:200}}></div>
        </div>
    );
}

export default BoardView;