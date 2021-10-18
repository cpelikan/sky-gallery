
export type BaseDataImage = {
    full: string;
    title?: string;
}

export interface DataImage extends BaseDataImage {
    id: string;
    thumb: string;
    width: number;
    height: number;
    url?: string;
}


