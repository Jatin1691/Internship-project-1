package com.todo.controller;

import com.todo.model.ToDo;
import com.todo.repository.ToDoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")

@RestController
@RequestMapping("/api/todos")
public class ToDoController {

    @Autowired
    private ToDoRepository toDoRepository;

    @GetMapping
    public List<ToDo> getAllToDos() {
        return toDoRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<ToDo> getToDoById(@PathVariable Long id) {
        return toDoRepository.findById(id);
    }

    @PostMapping
    public ToDo createToDo(@RequestBody ToDo toDo) {
        return toDoRepository.save(toDo);
    }

    @PutMapping("/{id}")
    public ToDo updateToDo(@PathVariable Long id, @RequestBody ToDo toDoDetails) {
        ToDo toDo = toDoRepository.findById(id).orElseThrow(() -> new RuntimeException("ToDo not found"));
        toDo.setTitle(toDoDetails.getTitle());
        toDo.setDescription(toDoDetails.getDescription());
        toDo.setCompleted(toDoDetails.isCompleted());
        return toDoRepository.save(toDo);
    }

    @DeleteMapping("/{id}")
    public void deleteToDo(@PathVariable Long id) {
        toDoRepository.deleteById(id);
    }
}
