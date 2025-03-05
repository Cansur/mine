package com.example.mine.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;
import java.util.List;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.mine.dto.BoardRequestDto;
import com.example.mine.entity.Board;
import com.example.mine.repository.BoardRepository;

@Service
public class BoardService {
    
    @Autowired
    private BoardRepository boardRepository;

    private final String uploadDir = Paths.get("C:", "tui-editor", "upload").toString();

    public Page<Board> boardList(Pageable pageable){
        return boardRepository.findAll(pageable);
    }

    public List<Board> boardListByType(String type, Pageable pageable){
        return boardRepository.findByType(type, pageable);
    }

    public Board boardview(Integer id){
        return boardRepository.findById(id).get();
    }

    public Long boardTotal(){
        return boardRepository.count();
    }

    public void writeBoard(BoardRequestDto entity){
        Board board = new Board();
        board.setType(entity.getType());
        board.setTitle(entity.getTitle());
        board.setContent(entity.getContent());
        board.setUserid(entity.getUserid());
        // board.setCreatetime(entity.getCreatetime());
        board.setCreatetime(LocalDateTime.now());
        board.setLikes(0);
        board.setCounts(0);
        boardRepository.save(board);
    }

    public void putBoardUpdate(Integer id, BoardRequestDto entity){
        Board board = boardRepository.findById(id).get();
        board.setType(entity.getType());
        board.setTitle(entity.getTitle());
        board.setContent(entity.getContent());
        board.setUserid(entity.getUserid());
        boardRepository.save(board);
    }

    public void increaseCount(Integer id){
        Board board = boardRepository.findById(id).get();
        board.setCounts(board.getCounts()+1);
        boardRepository.save(board);
    }

    public String postImages(MultipartFile image){
        if (image.isEmpty()) {System.out.println("error"); return "";}
        String orgFilename = image.getOriginalFilename();                                         // 원본 파일명
        String uuid = UUID.randomUUID().toString().replaceAll("-", "");           // 32자리 랜덤 문자열
        String extension = orgFilename.substring(orgFilename.lastIndexOf(".") + 1);  // 확장자
        String saveFilename = uuid + "." + extension;                                             // 디스크에 저장할 파일명
        String fileFullPath = Paths.get(uploadDir, saveFilename).toString();                      // 디스크에 저장할 파일의 전체 경로
        // uploadDir에 해당되는 디렉터리가 없으면, uploadDir에 포함되는 전체 디렉터리 생성
        File dir = new File(uploadDir);
        if (dir.exists() == false) {
            dir.mkdirs();
        }
        try {
            // 파일 저장 (write to disk)
            File uploadFile = new File(fileFullPath);
            image.transferTo(uploadFile);
            return saveFilename;

        } catch (IOException e) {
            // 예외 처리는 따로 해주는 게 좋습니다.
            throw new RuntimeException(e);
        }
    }

    public byte[] getImages(String filename){
        // 업로드된 파일의 전체 경로
        String fileFullPath = Paths.get(uploadDir, filename).toString();

        // 파일이 없는 경우 예외 throw
        File uploadedFile = new File(fileFullPath);
        if (uploadedFile.exists() == false) {
            throw new RuntimeException();
        }

        try {
            // 이미지 파일을 byte[]로 변환 후 반환
            byte[] imageBytes = Files.readAllBytes(uploadedFile.toPath());
            return imageBytes;

        } catch (IOException e) {
            // 예외 처리는 따로 해주는 게 좋습니다.
            throw new RuntimeException(e);
        }
    }
}
