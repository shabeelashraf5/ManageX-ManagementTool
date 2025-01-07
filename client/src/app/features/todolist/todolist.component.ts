import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css'
})
export class TodolistComponent {

  tasks: Task[] = [];
  newTask: string = '';
  filter: 'all' | 'active' | 'completed' = 'all';

  addTask() {
    if (this.newTask.trim()) {
      this.tasks.push({
        id: Date.now(),
        text: this.newTask.trim(),
        completed: false
      });
      this.newTask = '';
    }
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  toggleCompletion(id: number) {
    const task = this.tasks.find(task => task.id === id);
    if (task) {
      task.completed = !task.completed;
    }
  }

  filteredTasks() {
    if (this.filter === 'all') {
      return this.tasks;
    }
    return this.tasks.filter(task => (this.filter === 'active' ? !task.completed : task.completed));
  }

  setFilter(filter: 'all' | 'active' | 'completed') {
    this.filter = filter;
  }

  

}
