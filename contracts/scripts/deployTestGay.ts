import { toNano } from '@ton/core';
import { ReceiveAndWithdraw } from '../wrappers/TestGay';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const testGay = provider.open(await ReceiveAndWithdraw.fromInit());

    await testGay.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        },
    );

    await provider.waitForDeploy(testGay.address);

    // console.log('ID', await testGay.getId());
}
