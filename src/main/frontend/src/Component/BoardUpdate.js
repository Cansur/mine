/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import TuiEditor from './TuiEditor';
import axios from 'axios';


const BoardUpdate = () => {
    const [body, setBody] = useState([]);
    const [title, setTitle] = useState('');
    const [type, setType] = useState('자유');
    const onChangeTitle = (e) => { setTitle(e.target.value)};
    const onChangeType = (e) => { setType(e.target.value)};

    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get("id");

    const getBoard = async () => {
        const resp = await (await axios.get(`/api/boardview?id=${id}`)).data;
        set
    }
    useEffect(()=> {
        axios.get(`/api/boardview?id=${id}`)
        .then(response => setBody(response.data));
    })
    useEffect(()=> {
        setTitle(body.title)
        setType(body.type)
    }, [body.title, body.type])
    

    return (
        <div className='margin-left-20'>
            <br />
            <br />
            <br />
            <h2>글쓰기</h2>
            <hr />
            <br />
            <div className='padding-20 border-0_5 border-radius-10'>
                <div className='text-align-end'>
                    <select className='bg-dark color-white border-radius-5 padding-lr-10' value={type} onChange={onChangeType}>
                        <option value="자유">자유 게시판</option>
                        <option value="공지">공지 사항</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control bgColor-dark color-white" id="title" value={title || ""} onChange={onChangeTitle} />
                </div>
            </div>
            <br />
            <br />
            <div className='border-radius-10'>
                <TuiEditor title={title} type={type} content={body.content} id={id} put={true}/>
            </div>

        </div>
    );
};

export default BoardUpdate;