import { FileItem } from 'ng2-file-upload';
import { Category } from '../enums/categoryEnum';

export class DocumentDto {
    code: number;
    title: string;
    process: string;
    category: Category;
    file: FileItem;
}
