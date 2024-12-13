export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^[0-9]{10}$/; // Assuming a 10-digit phone number format
  return phoneRegex.test(phone);
};

export const isNotEmpty = (value: string): boolean => {
  return value.trim().length > 0;
};

export const isValidZipCode = (zipCode: string): boolean => {
  // const zipCodeRegex = /^[0-9]{5}(?:-[0-9]{4})?$/; // 5-digit or ZIP+4 format
  const zipCodeRegex = /^[0-9]{5,6}$/; // 5-digit or ZIP+4 format
  return zipCodeRegex.test(zipCode);
};
