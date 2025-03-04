import { AztecAddress, ContractBase, ContractFunctionInteraction, ContractMethod, DeployMethod, FieldLike, Wallet } from '@aztec/aztec.js';
import { PXE, PublicKey } from '@aztec/types';
import { ContractAbi } from '@aztec/foundation/abi';
export declare const TokenBridgeContractAbi: ContractAbi;
/**
 * Type-safe interface for contract TokenBridge;
 */
export declare class TokenBridgeContract extends ContractBase {
    private constructor();
    /**
     * Creates a contract instance.
     * @param address - The deployed contract's address.
     * @param wallet - The wallet to use when interacting with the contract.
     * @returns A promise that resolves to a new Contract instance.
     */
    static at(
    /** The deployed contract's address. */
    address: AztecAddress, 
    /** The wallet. */
    wallet: Wallet): Promise<TokenBridgeContract>;
    /**
     * Creates a tx to deploy a new instance of this contract.
     */
    static deploy(rpc: PXE): DeployMethod<TokenBridgeContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified public key to derive the address.
     */
    static deployWithPublicKey(rpc: PXE, publicKey: PublicKey): DeployMethod<TokenBridgeContract>;
    /**
     * Returns this contract's ABI.
     */
    static get abi(): ContractAbi;
    /** Type-safe wrappers for the public methods exposed by the contract. */
    methods: {
        /** _assert_token_is_same(token: field) */
        _assert_token_is_same: ((token: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** _call_mint_on_token(amount: field, secret_hash: field) */
        _call_mint_on_token: ((amount: FieldLike, secret_hash: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** _initialize(token: struct) */
        _initialize: ((token: {
            address: FieldLike;
        }) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** claim_private(amount: field, secret_hash_for_redeeming_minted_notes: field, canceller: struct, msg_key: field, secret_for_L1_to_L2_message_consumption: field) */
        claim_private: ((amount: FieldLike, secret_hash_for_redeeming_minted_notes: FieldLike, canceller: {
            address: FieldLike;
        }, msg_key: FieldLike, secret_for_L1_to_L2_message_consumption: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** claim_public(to: struct, amount: field, canceller: struct, msg_key: field, secret: field) */
        claim_public: ((to: {
            address: FieldLike;
        }, amount: FieldLike, canceller: {
            address: FieldLike;
        }, msg_key: FieldLike, secret: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** exit_to_l1_private(recipient: struct, token: struct, amount: field, callerOnL1: struct, nonce: field) */
        exit_to_l1_private: ((recipient: {
            address: FieldLike;
        }, token: {
            address: FieldLike;
        }, amount: FieldLike, callerOnL1: {
            address: FieldLike;
        }, nonce: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** exit_to_l1_public(recipient: struct, amount: field, callerOnL1: struct, nonce: field) */
        exit_to_l1_public: ((recipient: {
            address: FieldLike;
        }, amount: FieldLike, callerOnL1: {
            address: FieldLike;
        }, nonce: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** get_token() */
        get_token: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** token() */
        token: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
    };
}
//# sourceMappingURL=TokenBridge.d.ts.map