import { DataImage } from "@models";

let _indexFetch: string;
export const getIndexFetch = () => _indexFetch;


//export const CATEGORIES = ['dog', 'cat', 'funny'];
//export const ENDPOINT_DATA = (index: number) => `https://www.reddit.com/r/${CATEGORIES[index]}/top.json?limit=25`;
export const ENDPOINT_DATA = (index: string) => `https://www.reddit.com/r/dog/top.json?after=${index}&limit=10`;

export async function fetchData(): Promise<DataImage[]>{

    const response = await fetch(ENDPOINT_DATA(_indexFetch))
    const body = await response.json();
    
    _indexFetch = body.data.after;
    const images = body.data.children;
    const dataImage: DataImage[] = images
                                        .filter( (img:any) => img.data?.preview && img.data?.thumbnail !== 'self')
                                        .map( (img:any) => {
    const objImg = img.data;                                                

        return {
            id : objImg.id,
            title : objImg.title,
            thumb: objImg.thumbnail,
            width: objImg.thumbnail_width,
            height: objImg.thumbnail_height,
            full: objImg.url_overridden_by_dest,
            url: objImg.url
        }
    });
    return dataImage;
}
