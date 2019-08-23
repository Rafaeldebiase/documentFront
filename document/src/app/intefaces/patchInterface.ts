export interface IPatch {
    op: "replace";
    path: string;
    value: string;
}


[
    {
    	"op": "replace",
    	"path": "process",
    	"value": "jonny"
    },
    {
    	"op": "replace",
    	"path": "title",
    	"value": "teste JsonPatch"
    }
]
