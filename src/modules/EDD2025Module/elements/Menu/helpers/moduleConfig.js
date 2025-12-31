export const MODULE_PERMISSIONS = {
  inscripcion: { hideFor: [5, 6, 7, 8, 9] },
  validacion: { hideFor: [5, 6, 7, 8, 9] },
  resultados: { hideFor: [5, 6, 7, 8, 9] },
  portafolio: { hideFor: [5, 6, 7, 8, 9] },
  agendamiento: { hideFor: [5, 6, 7, 8, 9] },
  grabaciones: { hideFor: [5, 6, 7, 8, 9] },
  recuperacion: { hideFor: [5, 6, 7, 8, 9] },
  procesamiento: { hideFor: [5, 6, 7, 8, 9] },
  ayuda: { hideFor: [5, 6, 7, 8, 9] },
  correccion_postulaciones: { hideFor: [6, 7, 8, 9] },
  correccion_portafolios: { hideFor: [5] },
};

export const canSeeModule = (tipoUsuario, moduleKey) =>
  !MODULE_PERMISSIONS[moduleKey]?.hideFor?.includes(tipoUsuario);
