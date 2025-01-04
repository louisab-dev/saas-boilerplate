import { Context } from "../trpc";
import { ExampleService } from "../services/example.service";

export class ExampleController {
  private exampleService: ExampleService;

  constructor(ctx: Context) {
    this.exampleService = new ExampleService(ctx);
  }

  async hello(input: string) {
    return this.exampleService.hello(input);
  }
}
