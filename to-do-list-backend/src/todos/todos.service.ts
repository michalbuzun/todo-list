import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  private todosDB = [];
  private id = 0;

  create(createTodoDto: CreateTodoDto) {
    const newTodo = {
      ...createTodoDto,
      done: false,
      id: this.id++,
    };

    this.todosDB.push(newTodo);

    return newTodo;
  }

  findAll() {
    return this.todosDB;
  }

  findOne(id: number) {
    return this.todosDB.find((todo) => todo.id === id);
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    this.todosDB = this.todosDB.map((todo) => {
      if (todo.id === id) {
        return { ...todo, ...updateTodoDto };
      }

      return todo;
    });

    return this.findOne(id);
  }

  remove(id: number) {
    const toBeRemoved = this.findOne(id);
    this.todosDB = this.todosDB.filter((todo) => todo.id !== id);
    return toBeRemoved;
  }
}
