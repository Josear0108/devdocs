import type { VCardData } from '../types';

export function formatVCard(data: VCardData): string {
    return [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${data.lastName};${data.firstName}`,
        `FN:${data.firstName} ${data.lastName}`,
        data.mobile ? `TEL;TYPE=CELL:${data.mobile}` : '',
        data.landline ? `TEL;TYPE=WORK:${data.landline}` : '',
        data.email ? `EMAIL:${data.email}` : '',
        data.company ? `ORG:${data.company}` : '',
        data.address ? `ADR;TYPE=WORK:;;${data.address};${data.city};${data.country}` : '',
        data.website ? `URL:${data.website}` : '',
        'END:VCARD'
    ]
    .filter(Boolean)
    .join('\r\n');
}