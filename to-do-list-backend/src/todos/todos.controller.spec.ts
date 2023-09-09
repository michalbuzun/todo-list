import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

describe('TodosController', () => {
  let controller: TodosController;

  const mockTodosService = {
    create: jest.fn((dto) => {
      return {
        ...dto,
        done: false,
        id: Date.now(),
      };
    }),
    update: jest.fn((id, dto) => {
      return {
        id,
        ...dto,
      };
    }),
    remove: jest.fn((id) => {
      return {
        id,
        done: false,
        content: 'test',
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [TodosService],
    })
      .overrideProvider(TodosService)
      .useValue(mockTodosService)
      .compile();

    controller = module.get<TodosController>(TodosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('test create todo', () => {
    const dto = { content: 'test' };

    expect(controller.create(dto)).toEqual({
      ...dto,
      done: false,
      id: expect.any(Number),
    });
    expect(mockTodosService.create).toHaveBeenCalled();
  });

  it('should update todo', () => {
    const dto = { content: 'test', done: false, id: 123 };

    expect(controller.update('123', dto)).toEqual(dto);
    expect(mockTodosService.update).toHaveBeenCalled();
  });

  it('should remove todo', () => {
    const dto = { content: 'test', done: false, id: 123 };

    expect(controller.remove('123')).toEqual(dto);
    expect(mockTodosService.update).toHaveBeenCalled();
  });
});
