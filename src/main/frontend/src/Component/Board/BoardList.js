/* eslint-disable */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const BoardList = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [posts, setPosts] = useState([]);
	const [totalPosts, setTotalPosts] = useState(0);
	const [page, setPage] = useState(0); //페이지
	const [size, setSize] = useState(20);
	const [curpage, setCurpage] = useState(0);
	const [number, setNumber] = useState(0);

	useEffect(() => {
		axios.get(`/api/board/list?size=${size}&page=${page}`)
			.then(response => setPosts(response.data))

		axios.get(`/api/boardtotal`)
			.then(response => setTotalPosts(response.data))
	}, [size, page])
	// useEffect(() => {
	// 	if (searchParams.get('page') != null) setPage(parseInt(searchParams.get('page')));
	// 	setSize(parseInt(searchParams.get('size')))
	// }, [])
	useEffect(() => {
		setCurpage((Math.floor(page / 5)) * 5);
		let maxpage = totalPosts - (curpage * size);
		if (maxpage >= 5 * size) setNumber(5);
		else setNumber(Math.ceil(maxpage / size));
	}, [totalPosts, size, page])
	
	const rendering = () => {
		const result = [];
		for (let i = 0; i < number; i++) {
			result.push(<li class="page-item"><Link class="page-link" onClick={()=>{setPage(curpage+i)}}>{curpage+i+1}</Link></li>);
		}
		return result;
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
			<br />
			<nav aria-label="Page navigation example">
				<ul class="pagination justify-content-center">
					<li class="page-item"><Link class="page-link" onClick={()=>{if(page != 0) setPage(page-1)}}>{`<`}</Link></li>
					{rendering()}
					<li class="page-item"><Link class="page-link" onClick={()=>{if(Math.ceil(totalPosts/size) != page+1) setPage(page+1)}}>{`>`}</Link></li>
				</ul>
			</nav>
		</div>
	);
}

export default BoardList;