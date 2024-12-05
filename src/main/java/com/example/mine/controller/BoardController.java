package com.example.mine.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.mine.dto.BoardRequestDto;
import com.example.mine.entity.Board;
import com.example.mine.service.BoardService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;





@RestController
public class BoardController {
    
    @Autowired
    private BoardService boardService;

    @GetMapping("/api/board/list")
    public List<Board> getBoardList(@PageableDefault(page=0,size=10,sort="id",direction = Sort.Direction.DESC) Pageable pageable) {
        Page<Board> boards = boardService.boardList(pageable);
        return boards.getContent();
    }

    // @GetMapping("/api/board/list/type")
    // public List<Board> getBoardListByType(@PageableDefault(page=0,size=10,sort="id",direction = Sort.Direction.DESC) Pageable pageable) {
    //     Page<Board> boards = boardService.boardListByType(pageable);
    //     return boards.getContent();
    // }

    @GetMapping("/api/board/list/type")
    public List<Board> getBoardListByType(@RequestParam("type") String type, 
        @PageableDefault(page=0,size=10,sort="id",direction = Sort.Direction.DESC) Pageable pageable) {
        
        return boardService.boardListByType(type, pageable);
    }

    @GetMapping("/api/boardview")
    public Board getBoardView(@RequestParam("id") Integer param) {
        return boardService.boardview(param);
    }

    @GetMapping("/api/boardtotal")
    public Long getBoardTotal() {
        return boardService.boardTotal();
    }
    
    @PostMapping("/api/board/write")
    public void postBoardWrite(@RequestBody BoardRequestDto entity) {
        boardService.writeBoard(entity);
    }

    @PutMapping("/api/board/update/{id}")
    public void putBoardUpdate(@PathVariable Integer id, @RequestBody BoardRequestDto entity) {
        boardService.putBoardUpdate(id, entity);
    }

    @PutMapping("/api/board/count/{id}")
    public void putMethodName(@PathVariable Integer id, @RequestBody String entity) {
        boardService.increaseCount(id);
    }

    @PostMapping("/api/board/images")
    public String postBoardImages(MultipartFile image) {
        return boardService.postImages(image);
    }

    @GetMapping(value = "/api/tui-editor/image-print", produces = { MediaType.IMAGE_GIF_VALUE, MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE })
    public byte[] printEditorImage(@RequestParam final String filename) {
        // System.out.println("Dd");
        return boardService.getImages(filename);
    }
}
