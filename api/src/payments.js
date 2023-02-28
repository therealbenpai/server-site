// @ts-nocheck
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51MNRnGKoIzRxc2CE2sABE2qV9yXosJ5DIWVdly9KBEKEO51AdldnN9qRyTOaLpuwPwvpEE8wh82rhe2qclvPs7eP00bcvvDA8k');

function createSession() {
    return stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price: 'price_1MRJlaKoIzRxc2CEiYC4Xb69'
            },
        ],
        mode: 'subscription',
        success_url: 'https://localhost/genkey?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: 'https://localhost/failed',
    });
}

async function CheckPayment(id) {
    if (await stripe.checkout.sessions.retrieve(id).payment_status !== 'unpaid') return true;
    return false;
}

module.exports = {
    createSession,
    CheckPayment
}
