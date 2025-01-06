export default {
  example: {
    client: {
      title: "Exemple de Composant Client",
      description: "Ceci est un exemple de composant client",
      button: "Cliquez-moi",
    },
    server: {
      title: "Exemple de Composant Serveur",
      description: "Ceci est un exemple de composant serveur",
      button: "Cliquez-moi",
    },
  },
  auth: {
    common: {
      emailLabel: "E-mail",
      emailPlaceholder: "Entrez votre e-mail",
      emailError: "Adresse e-mail invalide",
      passwordLabel: "Mot de passe",
      passwordPlaceholder: "Entrez votre mot de passe",
      passwordError: "Le mot de passe doit contenir au moins 6 caractères",
      termsText: "En continuant, vous acceptez nos",
      termsLink: "Conditions d'Utilisation",
      privacyLink: "Politique de Confidentialité",
      and: "et",
    },
    signIn: {
      title: "Bonjour",
      description: "Connectez-vous à votre compte",
      submitButton: "Se connecter",
      noAccountText: "Vous n'avez pas de compte ?",
      signUpLink: "S'inscrire",
      forgotPasswordLink: "Mot de passe oublié ?",
    },
    signUp: {
      title: "Créer un compte",
      description: "Inscrivez-vous pour commencer à utiliser CHANGEME.",
      submitButton: "Créer un compte",
      haveAccountText: "Vous avez déjà un compte ?",
      signInLink: "Se connecter",
    },
    passwordReset: {
      title: "Réinitialiser le mot de passe",
      description: "Entrez votre e-mail pour réinitialiser votre mot de passe",
      submitButton: "Réinitialiser le mot de passe",
      backToLogin: "Retour à la page de connexion",
    },
    passwordResetConfirm: {
      title: "Réinitialiser le mot de passe",
      description: "Entrez votre nouveau mot de passe",
      newPasswordLabel: "Mot de passe",
      newPasswordPlaceholder: "Entrez votre nouveau mot de passe",
      confirmPasswordLabel: "Confirmer le mot de passe",
      confirmPasswordPlaceholder: "Confirmez votre nouveau mot de passe",
      passwordMismatch: "Les mots de passe ne correspondent pas",
      submitButton: "Réinitialiser le mot de passe",
      errorTitle: "Erreur",
      errorMismatch: "Les mots de passe ne correspondent pas",
    },
    card: {
      imageAlt: "Image",
    },
    socials: {
      continueWith: "Ou continuez avec",
    },
  },
} as const;
