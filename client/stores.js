import { writable, readable } from 'svelte/store';

export const language = writable('english');

export const about = readable({
    name: 'about',
    colors: 'blue',
    english: {
        displayName: 'About',
        description: "I'm Constantijn Baarendse. I've worked on different continents, for blue chip advertisers, media and advertising agencies.",
    },
    dutch: {
        displayName: 'Over',
        description: "Ik ben Constantijn Baarendse. Ik heb gewerkt op verschillende continenten, voor 'blue chip' adverteerders, media - en reclamebureaus."

    }
})

export const contactItems = readable([{
        name: 'email',
        colors: 'blue',
        english: {
            displayName: 'E-Mail',
            description: 'cbaarendse[at]commswithaplan.com'
        },
        dutch: {
            displayName: 'E-Mail',
            description: 'cbaarendse[at]commswithaplan.com'
        },
    },
    {
        name: 'telephone',
        colors: 'blue',
        english: {
            displayName: 'Telephone',
            description: 'Telephone: plus three one six one two three nine eight seven three four',
        },
        dutch: {
            displayName: 'Telefoon',
            description: 'Telefoon: nul zes een twee drie negen acht zeven drie vier'
        },
    },
    {
        name: 'address',
        colors: 'blue',
        english: {
            displayName: 'Address',
            description: 'Erich Salomonstraat 507, 1087 GT Amsterdam, The Netherlands',
        },
        dutch: {
            displayName: 'Adres',
            description: 'Erich Salomonstraat 507, 1087 GT Amsterdam, The Netherlands'
        },
    }
])