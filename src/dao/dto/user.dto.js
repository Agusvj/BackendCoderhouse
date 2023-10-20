export function userDto(user) {
  return {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    rol: user.rol,
    cart: user.cart,
  };
}
