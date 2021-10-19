
export type MediaType = 'image' | 'rich:video' | 'hosted:video';

export type BaseDataImage = {
    full: string;
    title?: string;
    mediaType: MediaType;
}

export interface DataImage extends BaseDataImage {
    id: string;
    thumb: string;
    width: number;
    height: number;
    url?: string;
}


