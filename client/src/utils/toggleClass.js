export const toggleClass = (element, className, condition) => {
  if (element && condition) {
    element.classList.add(className);
  } else {
    element.classList.remove(className);
  }
};
