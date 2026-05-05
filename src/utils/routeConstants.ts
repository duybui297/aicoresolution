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
    },
    admin: '/admin',
    adminArticles: '/admin/articles',
    adminLogin: '/admin/login',
    adminCreateArticle: '/admin/articles/create',
    adminEditArticle: '/admin/articles/edit/:id',
    adminScheduled: '/admin/scheduled',
    adminContributors: '/admin/contributors',
    adminTrash: '/admin/trash',
    adminSettings: '/admin/settings'
};

export const getRoutePath = (key: keyof typeof ROUTE_PATHS, language: string) => {
    const route = ROUTE_PATHS[key];
    if (typeof route === 'string') {
        return route;
    }
    const lang = language === 'vi' ? 'vi' : 'en';
    return route[lang];
};

export const getRouteKeyByPath = (path: string): keyof typeof ROUTE_PATHS | undefined => {
    for (const key in ROUTE_PATHS) {
        const k = key as keyof typeof ROUTE_PATHS;
        const route = ROUTE_PATHS[k];
        if (typeof route === 'string') {
            if (route === path) return k;
        } else if (Object.values(route).includes(path)) {
            return k;
        }
    }
    return undefined;
};
