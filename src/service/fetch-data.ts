import { DataImage } from "@models";

let _indexFetch: string;
export const getIndexFetch = () => _indexFetch;
export const resetIndexFetch = () => { 
    _indexFetch = ''
};


//export const CATEGORIES = ['dog', 'cat', 'funny'];
//export const ENDPOINT_DATA = (index: number) => `https://www.reddit.com/r/${CATEGORIES[index]}/top.json?limit=25`;
export const ENDPOINT_DATA = (term: string, index: string) => `https://www.reddit.com/r/${term}/top.json?after=${index}&limit=10`;

export async function fetchData(term?: string): Promise<DataImage[]>{

    const response = await fetch(ENDPOINT_DATA(term, _indexFetch))
    const body = await response.json();
    let dataImage: DataImage[];
    if(body && body.data){
        _indexFetch = body.data.after;
        const images = body.data.children;
        dataImage = images
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
    }
    return dataImage;
}
