import { Segurado } from './segurado';

export interface SeguradoPage {
  segurados: Segurado[];
  totalPages: number;
  totalElements: number;
}
