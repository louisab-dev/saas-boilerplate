import { Context } from "../trpc";

export class ExampleService {
  constructor(private ctx: Context) {}

  async hello(input: string) {
    return `Hello ${input}`;
  }
}
