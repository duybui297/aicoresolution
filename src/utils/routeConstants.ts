export const ROUTE_PATHS = {
    home: {
        vi: '/',
        en: '/'
    },
    services: {
        vi: '/dich-vu',
        en: '/services'
    },
    caseStudies: {
        vi: '/du-an',
        en: '/case-studies'
    },
    news: {
        vi: '/tin-tuc',
        en: '/news'
    },
    newsDetail: {
        vi: '/tin-tuc/:id',
        en: '/news/:id'
    },
    contact: {
        vi: '/lien-he',
        en: '/contact'
    },
    community: {
        vi: '/cong-dong',
        en: '/community'
    },
    products: {
        vi: '/san-pham',
        en: '/products'
    }
};

export const getRoutePath = (key: keyof typeof ROUTE_PATHS, language: string) => {
    const lang = language === 'vi' ? 'vi' : 'en';
    return ROUTE_PATHS[key][lang];
};

export const getRouteKeyByPath = (path: string): keyof typeof ROUTE_PATHS | undefined => {
    for (const key in ROUTE_PATHS) {
        const k = key as keyof typeof ROUTE_PATHS;
        if (Object.values(ROUTE_PATHS[k]).includes(path)) {
            return k;
        }
    }
    return undefined;
};
