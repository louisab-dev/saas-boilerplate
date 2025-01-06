import { Context } from "../trpc";
import { AuthService } from "../services/auth.service";
import { SignUpResponseSchema, SignUpSchema } from "../schemas/auth.schema";

export class AuthController {
  private authService: AuthService;

  constructor(ctx: Context) {
    this.authService = new AuthService(ctx);
  }

  async signup(input: SignUpSchema): Promise<SignUpResponseSchema> {
    return this.authService.signup(input);
  }
}
