
import { Category } from '../enums/categoryEnum';

export interface IDocument {
    code: number;
    title: string;
    process: string;
    category: Category;
    delete: boolean;
}
