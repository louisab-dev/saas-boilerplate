export default {
  common: {
    error: "Erreur",
  },
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
    signupSuccess: {
      title: "Vérifiez votre e-mail",
      defaultEmail: "votre e-mail",
      emailSentText:
        "Nous avons envoyé un e-mail de confirmation à {email}. Veuillez cliquer sur le lien dans l'e-mail pour activer votre compte.",
      expiryNote: "Le lien de confirmation expirera dans 24 heures",
      spamNote: "Si vous ne voyez pas l'e-mail, vérifiez votre dossier spam",
      confirmationNote:
        "Une fois votre e-mail confirmé, vous pourrez vous connecter à votre compte.",
      loginButton: "Aller à la page de connexion",
      differentEmailLink: "S'inscrire avec un autre e-mail",
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
  nav: {
    user: {
      fetchError: "Échec de la récupération des données utilisateur",
      upgradePro: "Passer à Pro",
      account: "Compte",
      billing: "Facturation",
      settings: "Paramètres",
      theme: "Thème",
      themeLight: "Clair",
      themeDark: "Sombre",
      themeSystem: "Système",
      logout: "Se déconnecter",
    },
    sidebar: {
      toggle: "Basculer la barre latérale",
    },
    main: {
      firstSection: "Première section",
      firstRoute: "Première route",
      secondSection: "Deuxième section",
      secondRoute: "Deuxième route",
      thirdRoute: "Troisième route",
      fourthRoute: "Quatrième route",
    },
  },
} as const;
