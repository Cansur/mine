/* eslint-disable */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const BoardList = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [posts, setPosts] = useState([]);
	const [totalPosts, setTotalPosts] = useState(0);
	const [page, setPage] = useState(1); //페이지
	const [size, setSize] = useState(30);
	const offset = (page - 1) * size; // 시작점과 끝점을 구하는 offset

	useEffect(() => {
		axios.get(`/api/board/list?size=${size}`)
			.then(response => setPosts(response.data))

		axios.get(`/api/boardtotal`)
			.then(response => setTotalPosts(response.data))
	}, [])
	useEffect(() => {
		if(searchParams.get('page') != null) setPage(searchParams.get('page'));
		setSize(searchParams.get('size'))
	}, [])

	const postsData = (posts) => {
		if (posts) {
			let result = posts.slice(offset, offset + size);
			return result;
		}
	}

	return (
		<div className='margin-left-20'>
			<div className='center'>
				<img className='border-radius-10' height="450" width="800" src='c.png' />
			</div>
			<br />
			<br />
			<h2>전체 게시판</h2>
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
					{posts.map((item, index) =>
						<tr key={index} className='table-dark'>
							<th scope="row">{item.id}</th>
							<td>{item.type}</td>
							<td><Link to={`/boardview?id=${item.id}`} className='color-white'>{item.title}</Link></td>
							<td>{item.userid}</td>
							<td>{item.createtime.slice(0, 10)}</td>
							<td>{item.counts}</td>
							<td>{item.likes}</td>
						</tr>
					)}
				</tbody>
			</table>
			<br />
			<br />
			
		</div>
	);
}

export default BoardList;