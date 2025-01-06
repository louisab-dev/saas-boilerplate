export default {
  common: {
    error: "Error",
  },
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
    signupSuccess: {
      title: "Check Your Email",
      defaultEmail: "your email",
      emailSentText:
        "We've sent a confirmation email to {email}. Please click the link in the email to activate your account.",
      expiryNote: "The confirmation link will expire in 24 hours",
      spamNote: "If you don't see the email, check your spam folder",
      confirmationNote:
        "Once you confirm your email, you'll be able to sign in to your account.",
      loginButton: "Go to Login",
      differentEmailLink: "Sign up with a different email",
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
  nav: {
    user: {
      fetchError: "Failed to fetch user data",
      upgradePro: "Upgrade to Pro",
      account: "Account",
      billing: "Billing",
      settings: "Settings",
      theme: "Theme",
      themeLight: "Light",
      themeDark: "Dark",
      themeSystem: "System",
      logout: "Log out",
    },
    sidebar: {
      toggle: "Toggle sidebar",
    },
    main: {
      firstSection: "First Section",
      firstRoute: "First Route",
      secondSection: "Second Section",
      secondRoute: "Second Route",
      thirdRoute: "Third Route",
      fourthRoute: "Fourth Route",
    },
  },
} as const;
