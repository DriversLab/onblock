import { toNano } from '@ton/core';
import { TestGay } from '../wrappers/TestGay';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const testGay = provider.open(await TestGay.fromInit(BigInt(Math.floor(Math.random() * 10000))));

    await testGay.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(testGay.address);

    console.log('ID', await testGay.getId());
}
