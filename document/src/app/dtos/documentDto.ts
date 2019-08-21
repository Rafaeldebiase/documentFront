
import { Category } from '../enums/categoryEnum';

export class DocumentDto {
    code: number;
    title: string;
    process: string;
    category: Category;
    formFile: FormData;
}
