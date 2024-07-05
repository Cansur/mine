/* eslint-disable */
import React, { useEffect, useRef } from "react";
import '@toast-ui/editor/dist/i18n/ko-kr';
import { Editor } from '@toast-ui/react-editor'
import '@toast-ui/editor/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css'
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const TuiEditor = (props) => {
    const today = new Date();
    const editorRef = useRef();
    const navigate = useNavigate();

    const addBoard = () => {
        if (props.title === "" || editorRef.current.getInstance().getMarkdown() === "") {
            alert("제목, 내용을 제대로 써주세요.")
            return;
        }
        axios.post(`api/board/write`, {
            type: props.type,
            title: props.title,
            content: editorRef.current.getInstance().getMarkdown(),
            userid: "abc",
        }).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.error(error);
        });
        alert("작성이 완료 되었습니다.");
        navigate('/');
    };

    const putBoard = () => {
        if (props.title === "" || editorRef.current.getInstance().getMarkdown() === "") {
            alert("제목, 내용을 제대로 써주세요.")
            return;
        }
        axios.put(`api/board/update/${props.id}`, {
            type: props.type,
            title: props.title,
            content: editorRef.current.getInstance().getMarkdown(),
            userid: "abc",
        }).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.error(error);
        });
        alert("수정이 완료 되었습니다.");
        navigate('/');
    };

    const uploadImages = async(blob, callback) => {
        try {
            /*
            * 1. 에디터에 업로드한 이미지를 FormData 객체에 저장
            *    (이때, 컨트롤러 uploadEditorImage 메서드의 파라미터인 'image'와 formData에 append 하는 key('image')값은 동일해야 함)
            */
            let formData = new FormData();
            formData.append("image", blob);

            // 2. FileApiController - uploadEditorImage 메서드 호출
            const response = await fetch("api/board/images", {
                method: "POST",
                body: formData,
            });

            // 3. 컨트롤러에서 전달받은 디스크에 저장된 파일명
            const filename = await response.text();
            console.log('서버에 저장된 파일명 : ', filename);

            // 4. addImageBlobHook의 callback 함수를 통해, 디스크에 저장된 이미지를 에디터에 렌더링
            const imageUrl = `/api/tui-editor/image-print?filename=${filename}`;
            callback(imageUrl, 'alt text');
        } catch (err) {
            console.log("에러" + err);
        }
    };

    return (
        <>
            {props.content&&<Editor
                ref={editorRef}
                height="600px"
                language="ko-KR"
                initialValue={props.content}
                theme='dark'
                hooks={{ addImageBlobHook: (blob, callback) => uploadImages(blob, callback) }}
            />}
            <div className="bg-color-black padding-top-30 text-align-end padding-lr-20">
                {props.write&&<button onClick={addBoard} className="btn btn-success padding-lr-20">등록</button>}
                {props.put&&<button onClick={putBoard} className="btn btn-outline-info padding-lr-20">수정</button>}
            </div>
        </>
    );
}

export default TuiEditor;