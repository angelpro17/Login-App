
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string) => {
  const validation = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const isValid = Object.values(validation).every(Boolean);
  
  return {
    isValid,
    requirements: validation,
    score: Object.values(validation).filter(Boolean).length,
  };
};

export const validateForm = <T extends Record<string, any>>(
  data: T,
  rules: Record<keyof T, (value: any) => boolean | { isValid: boolean; message?: string }>
): { isValid: boolean; errors: Record<keyof T, string> } => {
  const errors = {} as Record<keyof T, string>;
  let isValid = true;

  for (const [field, rule] of Object.entries(rules)) {
    const result = rule(data[field as keyof T]);
    
    if (typeof result === 'boolean') {
      if (!result) {
        errors[field as keyof T] = `Invalid ${String(field)}`;
        isValid = false;
      }
    } else {
      if (!result.isValid) {
        errors[field as keyof T] = result.message || `Invalid ${String(field)}`;
        isValid = false;
      }
    }
  }

  return { isValid, errors };
};