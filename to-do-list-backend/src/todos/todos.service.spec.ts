import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';

describe('TodosService', () => {
  let service: TodosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodosService],
    }).compile();

    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create todo', () => {
    const dto = { content: 'test' };

    expect(service.create(dto)).toEqual({
      ...dto,
      done: false,
      id: 0,
    });
  });

  it('should update todo', () => {
    const newDto = {
      content: 'test',
    };

    service.create(newDto);

    const dto = { content: 'test_update', done: true };
    const todoId = 0;

    expect(service.update(todoId, dto)).toEqual({
      ...dto,
      id: todoId,
    });
  });

  it('should delete todo', () => {
    const newDto = {
      content: 'test',
    };

    service.create(newDto);
    const todoId = 0;

    expect(service.remove(todoId)).toEqual({
      ...newDto,
      done: false,
      id: todoId,
    });
  });
});
