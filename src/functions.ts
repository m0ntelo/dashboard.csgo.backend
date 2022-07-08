const fetch = require('node-fetch');
const url = 'https://api.steampowered.com/ISteamRemoteStorage/';
const path = { collectionDetails: 'GetCollectionDetails/v1/', fileDetails: 'GetPublishedFileDetails/v1/' };

export async function GetAllMaps(collectionId: number, collectionCount: number) {
    let json, response;
    const config = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(
            { 
                'collectioncount': `${collectionCount}`, 
                'publishedfileids[0]': `${collectionId}` 
            }
        )
    }

    response = await fetch(url + path.collectionDetails, config);
    json = await response.json()
    
    const total = json.response.collectiondetails[0].children.length;
    const maps = json.response.collectiondetails[0].children;

    return { maps, total}
}

export async function GetMapsById(collectionId: number[], itemCount: number) {
    let json, response;
    const config = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(createBody(collectionId, itemCount))
    }

    response = await fetch(url + path.fileDetails, config);
    json = await response.json();
    return json.response;
}

function createBody(collectionId: number[], itemCount: number): URLSearchParams {
    const body = new URLSearchParams(remapArray(collectionId))
    body.set('itemCount', `${itemCount}`)
    return body;
}

function remapArray(collectionId: number[]): any {
    const maps = collectionId;
    return (
      maps.map(
        (item: any, index) => [`publishedfileids[${index}]`, item]
      )
    )
}