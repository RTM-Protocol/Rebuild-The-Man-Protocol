export interface CrisisResource {
  country: string;
  countryCode: string;
  emergency: string;
  suicidePrevention?: string;
  crisisLine?: string;
  textLine?: string;
  additional?: Array<{
    name: string;
    number: string;
  }>;
}

export const crisisResources: CrisisResource[] = [
  {
    country: 'United States',
    countryCode: 'US',
    emergency: '911',
    suicidePrevention: '988',
    textLine: 'Text HOME to 741741',
    additional: [
      { name: 'Veterans Crisis Line', number: '988 (Press 1)' },
      { name: 'SAMHSA Helpline', number: '1-800-662-4357' }
    ]
  },
  {
    country: 'United Kingdom',
    countryCode: 'GB',
    emergency: '999',
    suicidePrevention: '116 123 (Samaritans)',
    textLine: 'Text SHOUT to 85258',
    additional: [
      { name: 'CALM (Men\'s)', number: '0800 58 58 58' },
      { name: 'NHS 111', number: '111' }
    ]
  },
  {
    country: 'Canada',
    countryCode: 'CA',
    emergency: '911',
    suicidePrevention: '988',
    crisisLine: '1-833-456-4566',
    textLine: 'Text TALK to 686868'
  },
  {
    country: 'Australia',
    countryCode: 'AU',
    emergency: '000',
    suicidePrevention: '13 11 14 (Lifeline)',
    crisisLine: '1300 659 467 (Suicide Call Back)',
    textLine: 'Text 0477 13 11 14'
  },
  {
    country: 'New Zealand',
    countryCode: 'NZ',
    emergency: '111',
    suicidePrevention: '1737',
    crisisLine: '0800 726 666 (Lifeline)',
    textLine: 'Text 1737'
  },
  {
    country: 'Ireland',
    countryCode: 'IE',
    emergency: '999 or 112',
    suicidePrevention: '116 123 (Samaritans)',
    crisisLine: '1800 247 247 (Pieta House)',
    textLine: 'Text HELLO to 50808'
  },
  {
    country: 'Germany',
    countryCode: 'DE',
    emergency: '112',
    suicidePrevention: '0800 111 0 111',
    crisisLine: '0800 111 0 222',
    additional: [
      { name: 'TelefonSeelsorge', number: '0800 111 0 111' }
    ]
  },
  {
    country: 'France',
    countryCode: 'FR',
    emergency: '112',
    suicidePrevention: '3114',
    crisisLine: '01 45 39 40 00 (SOS Amitié)',
    additional: [
      { name: 'SOS Suicide Phénix', number: '01 40 44 46 45' }
    ]
  },
  {
    country: 'Netherlands',
    countryCode: 'NL',
    emergency: '112',
    suicidePrevention: '0800 0113',
    crisisLine: '113 (Zelfmoordpreventie)',
    textLine: 'Chat: 113.nl'
  },
  {
    country: 'Belgium',
    countryCode: 'BE',
    emergency: '112',
    suicidePrevention: '1813',
    crisisLine: '106 (Tele-Onthaal)',
    additional: [
      { name: 'Centre de Prévention', number: '0800 32 123' }
    ]
  },
  {
    country: 'Spain',
    countryCode: 'ES',
    emergency: '112',
    suicidePrevention: '024',
    crisisLine: '717 003 717 (Teléfono de la Esperanza)'
  },
  {
    country: 'Italy',
    countryCode: 'IT',
    emergency: '112',
    suicidePrevention: '800 86 00 22 (Telefono Amico)',
    crisisLine: '02 2327 2327'
  },
  {
    country: 'Sweden',
    countryCode: 'SE',
    emergency: '112',
    suicidePrevention: '90101 (Mind)',
    crisisLine: '020-22 00 60 (BRIS)'
  },
  {
    country: 'Norway',
    countryCode: 'NO',
    emergency: '112',
    suicidePrevention: '116 123',
    crisisLine: '810 03 030 (Mental Helse)'
  },
  {
    country: 'Denmark',
    countryCode: 'DK',
    emergency: '112',
    suicidePrevention: '70 201 201 (Livslinien)',
    crisisLine: '116 123 (Børnetelefonen)'
  },
  {
    country: 'Finland',
    countryCode: 'FI',
    emergency: '112',
    suicidePrevention: '09 2525 0111 (MIELI)',
    crisisLine: '116 123'
  },
  {
    country: 'Switzerland',
    countryCode: 'CH',
    emergency: '112',
    suicidePrevention: '143 (Die Dargebotene Hand)',
    crisisLine: '147 (Pro Juventute)'
  },
  {
    country: 'Austria',
    countryCode: 'AT',
    emergency: '112',
    suicidePrevention: '142',
    crisisLine: '147 (Rat auf Draht)'
  },
  {
    country: 'Poland',
    countryCode: 'PL',
    emergency: '112',
    suicidePrevention: '116 123',
    crisisLine: '800 70 2222'
  },
  {
    country: 'Japan',
    countryCode: 'JP',
    emergency: '110 or 119',
    suicidePrevention: '0120 783 556 (TELL)',
    crisisLine: '03 5774 0992 (TELL Lifeline)'
  },
  {
    country: 'South Korea',
    countryCode: 'KR',
    emergency: '112 or 119',
    suicidePrevention: '1393',
    crisisLine: '109 (Hope Line)'
  },
  {
    country: 'Singapore',
    countryCode: 'SG',
    emergency: '999',
    suicidePrevention: '1-767 (SOS)',
    crisisLine: '6389 2222 (Samaritans of Singapore)'
  },
  {
    country: 'India',
    countryCode: 'IN',
    emergency: '112',
    suicidePrevention: '9152987821 (AASRA)',
    crisisLine: '91-22-27546669 (iCall)',
    additional: [
      { name: 'Vandrevala Foundation', number: '1860 2662 345' }
    ]
  },
  {
    country: 'South Africa',
    countryCode: 'ZA',
    emergency: '10111',
    suicidePrevention: '0800 567 567 (SADAG)',
    crisisLine: '0800 12 13 14 (Lifeline)'
  },
  {
    country: 'Brazil',
    countryCode: 'BR',
    emergency: '190',
    suicidePrevention: '188 (CVV)',
    crisisLine: '141 (Vida Valer)'
  },
  {
    country: 'Mexico',
    countryCode: 'MX',
    emergency: '911',
    suicidePrevention: '800 290 0024 (SAPTEL)',
    crisisLine: '55 5259 8121 (Línea de la Vida)'
  },
  {
    country: 'Argentina',
    countryCode: 'AR',
    emergency: '911',
    suicidePrevention: '135 (Centro de Asistencia)',
    crisisLine: '(011) 5275-1135'
  },
  {
    country: 'Chile',
    countryCode: 'CL',
    emergency: '133',
    suicidePrevention: '600 360 7777 (Salud Responde)',
    crisisLine: '2 2923 2035'
  },
  {
    country: 'Israel',
    countryCode: 'IL',
    emergency: '100',
    suicidePrevention: '1201 (ERAN)',
    crisisLine: '*2171 (SAHAR)'
  },
  {
    country: 'Philippines',
    countryCode: 'PH',
    emergency: '911',
    suicidePrevention: '(02) 8969 0917 (NCMH)',
    crisisLine: '2919 (In Touch Crisis Line)'
  },
  {
    country: 'Hong Kong',
    countryCode: 'HK',
    emergency: '999',
    suicidePrevention: '2896 0000 (Samaritans)',
    crisisLine: '2382 0000 (Suicide Prevention Services)'
  },
  {
    country: 'Malaysia',
    countryCode: 'MY',
    emergency: '999',
    suicidePrevention: '03-7627 2929 (Befrienders)',
    crisisLine: '15999 (Talian Kasih)'
  },
  {
    country: 'Greece',
    countryCode: 'GR',
    emergency: '112',
    suicidePrevention: '1018',
    crisisLine: '801 801 99 99 (Klimaka)'
  },
  {
    country: 'Portugal',
    countryCode: 'PT',
    emergency: '112',
    suicidePrevention: '21 354 45 45 (SOS Voz Amiga)',
    crisisLine: '808 200 204 (SNS24)'
  },
  {
    country: 'Czech Republic',
    countryCode: 'CZ',
    emergency: '112',
    suicidePrevention: '116 123',
    crisisLine: '800 155 555 (Linka Důvěry)'
  },
  {
    country: 'Other / International',
    countryCode: 'INTL',
    emergency: '112 (Europe) or local emergency number',
    crisisLine: 'Find local resources at befrienders.org',
    additional: [
      { name: 'International Association', number: 'suicide.org/international' },
      { name: 'Find a Helpline', number: 'findahelpline.com' }
    ]
  }
];





