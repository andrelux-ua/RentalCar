/**
 * Форматує число пробігу з комами
 * @param {number} mileage - Пробіг в кілометрах
 * @returns {string} - Відформатований пробіг з комами
 */
export const formatMileage = (mileage) => {
  if (!mileage && mileage !== 0) return '';
  return mileage.toLocaleString('en-US');
};

/**
 * Форматує ціну з символом долара
 * @param {number|string} price - Ціна
 * @returns {string} - Відформатована ціна з символом долара
 */
export const formatPrice = (price) => {
  if (!price && price !== 0) return '';
  return `$${price}`;
}; 