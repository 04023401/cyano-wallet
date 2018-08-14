import Address = Crypto.Address;
import { Asset, Balance, Block, MerkleProof, Network, Transaction } from 'ontology-dapi';
import { Crypto } from 'ontology-ts-sdk';
import { getClient } from '../network';
import { getStore } from '../redux';

/**
 * Checks if connected to network.
 * Because of multiple delays in different parts of browser and api,
 * the information about disconnect is not instant.
 */
export function isConnected(): Promise<boolean> {
    const state = getStore().getState();
    const status = state.status.networkState;

    return Promise.resolve(status === 'CONNECTED');
}

/**
 * Gets the currently connected network.
 */
export function getNetwork(): Promise<Network> {
    const state = getStore().getState();
    return Promise.resolve(state.settings.net);
}

export async function getBalance(address: string): Promise<Balance> {
    const client = getClient();
    const response = await client.getBalance(new Address(address));
    return {
        ong: response.Result.ong,
        ont: response.Result.ont
    };
}

export async function getBlock(block: number | string): Promise<Block> {
    const client = getClient();
    const response = await client.getBlockJson(block);
    return response.Result;
}

export async function getTransaction(txHash: string): Promise<Transaction> {
    const client = getClient();
    const response = await client.getRawTransactionJson(txHash);
    return response.Result;
}

export async function getGenerateBlockTime(): Promise<number | null> {
    const client = getClient();
    const response = await client.getGenerateBlockTime();
    return response.Result;
}

export async function getNodeCount(): Promise<number> {
    const client = getClient();
    const response = await client.getNodeCount();
    return response.Result;
}

export async function getBlockHeight(): Promise<number> {
    const client = getClient();
    const response = await client.getBlockHeight();
    return response.Result;
}

export async function getMerkleProof(txHash: string): Promise<MerkleProof> {
    const client = getClient();
    const response = await client.getMerkleProof(txHash);
    return response.Result;
}

export async function getStorage(constractAddress: string, key: string): Promise<string> {
    const client = getClient();
    const response = await client.getStorage(constractAddress, key);
    return response.Result;
}

export async function getAllowance(asset: Asset, fromAddress: string, toAddress: string): Promise<number> {
    const client = getClient();
    const response = await client.getAllowance(asset, new Address(fromAddress), new Address(toAddress));
    return response.Result;
}
