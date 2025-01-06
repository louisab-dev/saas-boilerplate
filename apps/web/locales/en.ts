export default {
  example: {
    client: {
      title: "Example Client Component",
      description: "This is a client component example",
      button: "Click Me",
    },
    server: {
      title: "Example Server Component",
      description: "This is a server component example",
      button: "Click Me",
    },
  },
  auth: {
    common: {
      emailLabel: "Email",
      emailPlaceholder: "Enter your email",
      emailError: "Invalid email address",
      passwordLabel: "Password",
      passwordPlaceholder: "Enter your password",
      passwordError: "Password must be at least 6 characters",
      termsText: "By clicking continue, you agree to our",
      termsLink: "Terms of Service",
      privacyLink: "Privacy Policy",
      and: "and",
    },
    signIn: {
      title: "Welcome back",
      description: "Login to your account",
      submitButton: "Sign in",
      noAccountText: "Don't have an account?",
      signUpLink: "Sign up",
      forgotPasswordLink: "Forgot your password?",
    },
    signUp: {
      title: "Create an account",
      description: "Sign up to start using CHANGEME.",
      submitButton: "Create account",
      haveAccountText: "Already have an account?",
      signInLink: "Sign in",
    },
    passwordReset: {
      title: "Reset Password",
      description: "Enter your email to reset your password",
      submitButton: "Reset Password",
      backToLogin: "Back to login",
    },
    passwordResetConfirm: {
      title: "Reset Password",
      description: "Enter your new password",
      newPasswordLabel: "Password",
      newPasswordPlaceholder: "Enter your new password",
      confirmPasswordLabel: "Confirm Password",
      confirmPasswordPlaceholder: "Confirm your new password",
      passwordMismatch: "Passwords do not match",
      submitButton: "Reset Password",
      errorTitle: "Error",
      errorMismatch: "Passwords do not match",
    },
    card: {
      imageAlt: "Image",
    },
    socials: {
      continueWith: "Or continue with",
    },
  },
} as const;
