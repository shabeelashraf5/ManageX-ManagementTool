import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToDoList } from '../../models/todolist.model';
import { TodolistService } from '../../core/services/todolist/todolist.service';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css',
})
export class TodolistComponent implements OnInit {
  tasks: ToDoList[] = [];
  newTask: string = '';
  filter: 'all' | 'active' | 'completed' = 'all';
  title: string = '';
  user_id: string = '';
  completed: boolean = false;

  todoService = inject(TodolistService);

  ngOnInit() {
    this.loadList();
  }

  loadList() {
    this.todoService.loadlist().subscribe({
      next: (response) => {
        this.tasks = response.list;
        console.log(this.tasks);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  addTask() {
    const listData: ToDoList = {
      _id: '',
      user_id: this.user_id,
      title: this.title,
      completed: this.completed,
      date: new Date(),
    };

    this.todoService.addList(listData).subscribe({
      next: (response) => {
        this.loadList();
        console.log(response);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  deleteTask(id: string) {
    this.todoService.deletelist(id).subscribe({
      next: (response) => {
        this.loadList();
        console.log('Deleted:', response);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  toggleCompletion(id: string) {
    const task = this.tasks.find((task) => task._id === id);
    if (task) {
      task.completed = !task.completed;

      this.todoService.updtaeCompletion(id, task.completed).subscribe({
        next: (response) => {
          console.log('Task completion updated:', response);
        },
        error: (error) => {
          console.error('Error updating task completion:', error);
        },
      });
    }
  }

  filteredTasks() {
    if (this.filter === 'all') {
      return this.tasks;
    }
    return this.tasks.filter((task) =>
      this.filter === 'active' ? !task.completed : task.completed
    );
  }

  setFilter(filter: 'all' | 'active' | 'completed') {
    this.filter = filter;
  }
}
