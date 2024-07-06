/* eslint-disable */
import React, { useEffect, useState } from 'react';
import TuiEditor from './TuiEditor';
const Board = () => {
    const [title, setTitle] = useState('');
    const [type, setType] = useState('자유');
    const onChange = (e) => { setTitle(e.target.value) };

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
                    <select className='bg-dark color-white border-radius-5 padding-lr-10' onChange={e => setType(e.target.value)}>
                        <option value="자유">자유 게시판</option>
                        <option value="공지">공지 사항</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control bgColor-dark color-white" id="titleInput" name='titleInput' onChange={onChange} />
                </div>
            </div>
            <br />
            <br />
            <div className='border-radius-10'>
                <TuiEditor title={title} type={type} content={" "} write={true}/>
            </div>

        </div>
    );
};

export default Board;