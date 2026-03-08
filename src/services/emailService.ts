const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

// Get your free access key at https://web3forms.com/
// When creating the key, set the recipient email to: info@aicorelabs.net
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '';

export type EmailType =
    | 'contact'
    | 'event_registration'
    | 'event_materials'
    | 'product_waitlist';

interface BaseEmailData {
    type: EmailType;
    email: string;
}

interface ContactEmailData extends BaseEmailData {
    type: 'contact';
    fullName: string;
    phone: string;
    subject: string;
    message: string;
}

interface EventRegistrationEmailData extends BaseEmailData {
    type: 'event_registration';
    fullName: string;
    phone: string;
    eventTitle: string;
    eventDate: string;
    paymentStatus: string;
    note?: string;
}

interface EventMaterialsEmailData extends BaseEmailData {
    type: 'event_materials';
    phone: string;
    eventTitle: string;
}

interface ProductWaitlistEmailData extends BaseEmailData {
    type: 'product_waitlist';
}

export type EmailData =
    | ContactEmailData
    | EventRegistrationEmailData
    | EventMaterialsEmailData
    | ProductWaitlistEmailData;

const SUBJECT_MAP: Record<EmailType, string> = {
    contact: '[AICoreS] New Contact Request',
    event_registration: '[AICoreS] New Event Registration',
    event_materials: '[AICoreS] Event Materials Request',
    product_waitlist: '[AICoreS] New Product Waitlist Signup',
};

function buildMessage(data: EmailData): string {
    switch (data.type) {
        case 'contact':
            return [
                `Name: ${data.fullName}`,
                `Email: ${data.email}`,
                `Phone: ${data.phone}`,
                `Subject: ${data.subject}`,
                `Message:\n${data.message}`,
            ].join('\n');

        case 'event_registration':
            return [
                `Event: ${data.eventTitle}`,
                `Date: ${data.eventDate}`,
                `Name: ${data.fullName}`,
                `Email: ${data.email}`,
                `Phone: ${data.phone}`,
                `Payment: ${data.paymentStatus}`,
                data.note ? `Note: ${data.note}` : '',
            ].filter(Boolean).join('\n');

        case 'event_materials':
            return [
                `Event: ${data.eventTitle}`,
                `Email: ${data.email}`,
                `Phone: ${data.phone}`,
            ].join('\n');

        case 'product_waitlist':
            return `Email: ${data.email}`;
    }
}

export async function sendNotificationEmail(data: EmailData): Promise<boolean> {
    if (!ACCESS_KEY) {
        console.warn('[emailService] VITE_WEB3FORMS_ACCESS_KEY not set — skipping email send.');
        return true;
    }

    try {
        const response = await fetch(WEB3FORMS_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({
                access_key: ACCESS_KEY,
                subject: SUBJECT_MAP[data.type],
                from_name: 'type' in data && 'fullName' in data ? (data as { fullName: string }).fullName : data.email,
                email: data.email,
                message: buildMessage(data),
            }),
        });

        const result = await response.json();
        return result.success === true;
    } catch (error) {
        console.error('[emailService] Failed to send email:', error);
        return false;
    }
}
