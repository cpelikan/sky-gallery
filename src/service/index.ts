import { DataImage } from "@models";

export const ENDPOINT_DATA = 'https://www.reddit.com/r/dog/top.json';

export async function fetchData(): Promise<DataImage[]>{
    const response = await fetch(ENDPOINT_DATA)
    const body = await response.json();
    const images = body.data.children;
    const dataImage: DataImage[] = images.map( (img:any) => {
        return {
            id : img.data.id,
            title : img.data.title,
            thumb: img.data.thumbnail,
            full: img.data.url
        }
    });
    return dataImage;
}
