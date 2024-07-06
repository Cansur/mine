/* eslint-disable */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const Announcement = (props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [posts, setPosts] = useState([]);
    const page = searchParams.get('page');
    const size = searchParams.get('size');

	useEffect(() => {
		axios.get(`/api/board/list?size=${size}`)
			.then(response => setPosts(response.data))
	}, [])
    return (
        <div className='margin-left-20'>
			<div className='center' >
				<img className='border-radius-10' height="450" width="800" src='b.png' alt=''/>
			</div>
			<br />
			<br />
			<h2>공지 사항</h2>
			<table className="table">
				<thead>
					<tr className='table-dark'>
						<th scope="col">번호</th>
						<th scope="col">말머리</th>
						<th scope="col">제목</th>
						<th scope="col">작성자</th>
						<th scope="col">작성일</th>
						<th scope="col">조회</th>
						<th scope="col">추천</th>
					</tr>
				</thead>
				<tbody>
					{posts.map((item,index)=>
						<tr key={index} className='table-dark'>
							<th scope="row">{item.id}</th>
							<td>{item.type}</td>
							<td><Link to={`/boardview?id=${item.id}`} className='color-white'>{item.title}</Link></td>
							<td>{item.userid}</td>
							<td>{item.createtime.slice(0,10)}</td>
							<td>{item.counts}</td>
							<td>{item.likes}</td>
						</tr>
					)}
				</tbody>
			</table>
			<br/>
			<br/>
			<h3 className='center'>{`1   2   3   4   5`}</h3>
		</div>
    );
}

export default Announcement;