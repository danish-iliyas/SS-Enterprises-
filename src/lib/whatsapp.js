import { applianceLabel, DEFAULT_CONTACT, TIME_SLOTS } from './constants';
import { formatINR, formatDate } from './format';

// wa.me opens the WhatsApp app directly on phones and WhatsApp Web on desktop.
export const waLink = (message = '', number = DEFAULT_CONTACT.whatsapp) =>
  `https://wa.me/${String(number).replace(/\D/g, '')}${message ? `?text=${encodeURIComponent(message)}` : ''}`;

const lines = (...rows) => rows.filter(Boolean).join('\n');

export const msg = {
  general: (lang) =>
    lang === 'hi'
      ? 'Namaste SS Enterprises, mujhe aapki service ke baare mein jaankari chahiye.'
      : 'Hello SS Enterprises, I would like to know more about your services.',

  service: (serviceName, lang) =>
    lang === 'hi'
      ? `Namaste SS Enterprises, mujhe ${serviceName} ke baare mein jaankari chahiye. Kripya mujhse sampark karein.`
      : `Hello SS Enterprises, I need help with ${serviceName}. Please contact me.`,

  product: (product, lang) =>
    lines(
      lang === 'hi'
        ? 'Namaste SS Enterprises, mujhe is product ke baare mein jaankari chahiye:'
        : 'Hello SS Enterprises, I am interested in this product:',
      '',
      `${product.name}`,
      product.price != null ? `${lang === 'hi' ? 'Offer Price' : 'Offer price'}: ${formatINR(product.price)}` : '',
      product.url ? `Link: ${product.url}` : '',
      '',
      lang === 'hi' ? 'Kya yeh available hai?' : 'Is it available?'
    ),

  spareParts: (lang) =>
    lang === 'hi'
      ? 'Namaste SS Enterprises, mujhe spare parts chahiye. Appliance / part ka naam: '
      : 'Hello SS Enterprises, I need a spare part. Appliance / part name: ',

  booking: (b) =>
    lines(
      'Hello SS Enterprises, I want to book a service.',
      '',
      b.bookingNo ? `Booking No: ${b.bookingNo}` : '',
      `Name: ${b.name}`,
      `Mobile: ${b.mobile}`,
      `Appliance: ${applianceLabel(b.appliance, 'en')}`,
      `Service: ${b.serviceType}`,
      b.problem ? `Problem: ${b.problem}` : '',
      `Address: ${b.address}`,
      b.preferredDate ? `Preferred Date: ${formatDate(b.preferredDate)}` : '',
      b.preferredTime ? `Preferred Time: ${TIME_SLOTS.find((s) => s.value === b.preferredTime)?.en || b.preferredTime}` : '',
      '',
      'Please contact me.'
    ),

  order: ({ name, mobile, address, note, items, total }) =>
    lines(
      'Hello SS Enterprises, I want to place an order.',
      '',
      `Name: ${name}`,
      `Mobile: ${mobile}`,
      `Delivery Address: ${address}`,
      '',
      'Items:',
      ...items.map(
        (i, n) => `${n + 1}. ${i.name} x ${i.qty}${i.price != null ? ` = ${formatINR(i.price * i.qty)}` : ' (price on request)'}`
      ),
      '',
      total != null ? `Total: ${formatINR(total)}` : '',
      note ? `Note: ${note}` : '',
      '',
      'Please confirm availability and final price.'
    ),

  contact: ({ name, mobile, message }) =>
    lines('Hello SS Enterprises,', '', message, '', `Name: ${name}`, `Mobile: ${mobile}`),
};
