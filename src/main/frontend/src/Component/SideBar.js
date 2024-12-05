import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => {
    return (
        <div>
            <ul className='ulSide'>
                <div className='center padding-10'>
                    <Link to="/board">
                        <button type="button" className="btn btn-secondary padding-lr-60 font-bold">글쓰기</button>
                    </Link>
                </div>
                <li><Link to="/boardlist" className='text-decoration-line-none color-white'>전체 게시판</Link></li>
                <li><Link to="/announcement" className='text-decoration-line-none color-white'>공지 사항</Link></li>
                {/* <li><Link to="/" className='text-decoration-line-none color-white'>전체 게시판</Link></li> */}
            </ul>
        </div>
    );
};

export default SideBar;