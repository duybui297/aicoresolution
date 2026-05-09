/**
 * Formats an ISO date string or Date object for display
 * Format: DD/MM/YYYY - HH:MM AM/PM
 */
export const formatISODateForDisplay = (isoString: string | Date | undefined | null): string => {
  if (!isoString) return '';
  const date = typeof isoString === 'string' ? new Date(isoString) : isoString;
  
  if (isNaN(date.getTime())) return '';

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const strHours = String(hours).padStart(2, '0');
  
  return `${day}/${month}/${year} - ${strHours}:${minutes} ${ampm}`;
};
