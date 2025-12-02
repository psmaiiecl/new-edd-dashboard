export function filterTabsByUserRole(tabArray, tipoUsuario) {
  return tabArray.map((tab) => {
    if (tab.restrictedTo && Array.isArray(tab.restrictedTo)) {
      return {
        ...tab,
        exclude: !tab.restrictedTo.includes(tipoUsuario),
      };
    }

    if (tab.excludeFor && Array.isArray(tab.excludeFor)) {
      return {
        ...tab,
        exclude: tab.excludeFor.includes(tipoUsuario),
      };
    }
    if (tab.inner) {
      tab.inner = filterTabsByUserRole(tab.inner, tipoUsuario);
    }
    return tab;
  });
}
