import { ProviderPayment } from '@libera/models/provider';

export const PAYMENT_REQUEST_MOCK: ProviderPayment = {
    id: 1,
    lenderName: "Mediomelon",
    comments: "Lorem ipsum dolor sit amet consectetur adipiscing elit hendrerit, ut velit erat felis enim tempor venenatis parturient, mauris platea litora ornare facilisi cursus sagittis.",
    effectivePaymentDate: new Date,
    effectivePaymentAmount: 1000,
    file: {
        id: 5,
        name: 'ANOTHER.pdf',
        url: 'https://source.android.com/compatibility/android-cdd.pdf',
    },
};