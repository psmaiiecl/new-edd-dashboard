export function invertObjectKeys(obj) {
  const result = {};

  for (const outerKey in obj) {
    const innerObj = obj[outerKey];
    for (const innerKey in innerObj) {
      if (!result[innerKey]) result[innerKey] = {};
      result[innerKey][outerKey] = innerObj[innerKey];
    }
  }

  return result;
}