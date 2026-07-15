export function canSeeByRole(tipoUsuario, { excludedRoles = [], permittedRoles = null } = {}) {
  if (permittedRoles) return permittedRoles.includes(tipoUsuario);
  return !excludedRoles.includes(tipoUsuario);
}
