export interface IPatch {
    op: string;
    path: string;
    value: string;
}


// [
//     {
//     	"op": "replace",
//     	"path": "process",
//     	"value": "jonny"
//     },
//     {
//     	"op": "replace",
//     	"path": "title",
//     	"value": "teste JsonPatch"
//     }
// ]
