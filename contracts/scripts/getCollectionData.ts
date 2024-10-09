import { TonClient } from '@ton/ton';
import { Address } from '@ton/ton';

export const toncenter = new TonClient({
    endpoint: 'https://toncenter.com/api/v2/jsonRPC',
});

export const nftCollectionAddress = Address.parse('EQAq8B1gr1h4nTKuXdWTNlUKDVxXSLf4nYEt85adduWNVnt7');
//https://testnet.explorer.tonnft.tools/collection/EQDf6HCOggN_ZGL6YsYleN6mDiclQ_NJOMY-x8G5cTRDOBW4
// https://testnet.tonscan.org/address/EQCj0TT40giOgsurE3gj6FZklQOPoW82-75tnoU-yztDq8iH

export async function getCollectionData() {
    let { stack } = await toncenter.callGetMethod(nftCollectionAddress, 'get_collection_data');
    let nextItemIndex = stack.readBigNumber();
    let contentRoot = stack.readCell();
    let owner = stack.readAddress();

    console.log('Collection info, from get_collection_data() method:');
    console.log('Next item index:', nextItemIndex.toString());
    console.log('Content root cell:', contentRoot);
    console.log('Collection owner adress:', owner);

    return nextItemIndex;
}

getCollectionData();
