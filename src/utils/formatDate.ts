import { format } from 'date-fns';

export function formatDate(dateString: string | undefined | null): string {
  if (!dateString) {
    return '';
  }

  try {
    const dateObject = new Date(dateString);

    if (isNaN(dateObject.getTime())) {
      console.error('Data inválida fornecida:', dateString);
      return '';
    }

    return format(dateObject, "dd/MM/yyyy HH:mm");
  } catch (error) {
    console.error('Erro ao formatar data:', error);
    return '';
  }
}