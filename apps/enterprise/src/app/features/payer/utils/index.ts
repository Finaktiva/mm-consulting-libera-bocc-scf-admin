import {
    LenderCustomAttribute,
    LENDER_CUSTOM_ATTRIBUTE_TYPES,
    Option,
} from '@libera/models/lender';
import {
    PayerCustomAttribute,
    PayerCustomAttributeOption,
    PayerCustomAttributePayload,
} from '@libera/models/payer';
import { clean } from '@libera/shared';

interface ReducedPayerOptions {
    [id: number]: boolean;
}

interface ReducedPayer {
    [id: number]: {
        value: any;
        options?: ReducedPayerOptions;
        id: any;
    };
}

const reduceOptions = function reducedOptions(
    reduced: ReducedPayerOptions,
    { id, isChecked }: PayerCustomAttributeOption
): ReducedPayerOptions {
    return {
        ...reduced,
        [id]: isChecked,
    };
};

const reducePayer = function reducedPayer(
    reduced: ReducedPayer,
    payer: PayerCustomAttribute
): ReducedPayer {
    const { attributeId, value, options, id } = payer;
    const reducedOptions = options ? options.reduce(reduceOptions, {}) : null;
    return {
        ...reduced,
        [attributeId]: {
            value,
            options: reducedOptions,
            id,
        },
    };
};

const mapOptions = function mapOptions(payerOptions: ReducedPayerOptions) {
    return (lenderOption: Option): PayerCustomAttributeOption => {
        const isChecked = payerOptions[lenderOption.id];
        return {
            ...lenderOption,
            isChecked,
        };
    };
};

const mapLenderAttributes = function mapLenderAttributes(
    reducedPayer: ReducedPayer
) {
    return (
        attribute: LenderCustomAttribute
    ): PayerCustomAttribute | LenderCustomAttribute => {
        const payerAttribute = reducedPayer[attribute.id];

        if (!payerAttribute)
            return {
                ...attribute,
                value: null,
                id: attribute.id,
                attributeId: attribute.id,
            };

        const { value, options, id } = payerAttribute;

        return {
            ...attribute,
            value,
            id,
            attributeId: attribute.id,
            options:
                attribute.type == LENDER_CUSTOM_ATTRIBUTE_TYPES.CHECKBOX
                    ? attribute.options.map(mapOptions(options))
                    : attribute.options,
        };
    };
};

export const mergeAttributes = function mergeAttributes([payer, all]: [
    PayerCustomAttribute[],
    LenderCustomAttribute[]
]): (PayerCustomAttribute | LenderCustomAttribute)[] {
    if (!payer.length)
        return all.map(a => ({ ...a, attributeId: a.id, value: null }));
    if (!all.length) return [];

    return all.map(mapLenderAttributes(payer.reduce(reducePayer, {})));
};

export const notEmpty = x => !!x;

export const hasAttributes = x => !!x.length;

export const mapAttributesPayload = function mapAttributesPayload({
    id,
    value,
    options,
    type,
    attributeId,
}: PayerCustomAttribute): PayerCustomAttributePayload {
    let newOptions = null;

    if (type == LENDER_CUSTOM_ATTRIBUTE_TYPES.RADIO) {
        newOptions = options
            .filter(o => o.id === value)
            .map(({ id }) => ({ id }));
    } else if (type === LENDER_CUSTOM_ATTRIBUTE_TYPES.CHECKBOX) {
        newOptions = options
            .filter(({ isChecked }) => isChecked)
            .map(({ id }) => ({ id }));
    }

    return clean({
        id: attributeId,
        value,
        options: newOptions,
    });
};
