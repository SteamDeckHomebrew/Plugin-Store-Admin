import { fetchUtils } from 'react-admin';
import authProvider from './authProvider';

export const apiUrl = "/";
export const cdnUrl = "https://cdn.tzatzikiweeb.moe/file/steam-deck-homebrew";
const httpClient = fetchUtils.fetchJson;

export let generateDownloadURL = (hash) => `${cdnUrl}/versions/${hash}.zip`

export let downloadArtifact = (hash) => {
    const link = document.createElement('a');
    link.href = generateDownloadURL(hash);
    link.click();
}

const dataProvider= {
    getList: (resource, params) => {
        // const { page, perPage } = params.pagination;
        // const { field, order } = params.sort;
        // const query = {
        //     sort: JSON.stringify([field, order]),
        //     range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        //     filter: JSON.stringify(params.filter),
        // };
        const url = `${apiUrl}/${resource}`//?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json,
            total: json.length,
        }));
    },

    getOne: (resource, params) =>
        httpClient(`${apiUrl}/${resource}`).then(({ json }) => {
            return {
                data: json.find(x => x.id.toString() === params.id),
            }
        }),

    // getMany: (resource, params) => {
    //     // const query = {
    //     //     filter: JSON.stringify({ id: params.ids }),
    //     // };
    //     const url = `${apiUrl}/${resource}`//?${stringify(query)}`;
    //     return httpClient(url).then(({ json }) => ({ data: json.filter(x => params.ids.includes(x.id)) }));
    // },

    // getManyReference: (resource, params) => {
    //     const { page, perPage } = params.pagination;
    //     const { field, order } = params.sort;
    //     const query = {
    //         sort: JSON.stringify([field, order]),
    //         range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
    //         filter: JSON.stringify({
    //             ...params.filter,
    //             [params.target]: params.id,
    //         }),
    //     };
    //     const url = `${apiUrl}/${resource}?${stringify(query)}`;

    //     return httpClient(url).then(({ headers, json }) => ({
    //         data: json,
    //         total: parseInt(headers.get('content-range').split('/').pop(), 10),
    //     }));
    // },

    update: (resource, params) => {
        if (resource === "plugins") {
            return httpClient(`${apiUrl}/__update`, {
                method: 'POST',
                headers: new Headers({
                    "Authorization": authProvider.getAuth()
                }),
                body: JSON.stringify(params.data),
            }).then(({ json }) => ({
                data: { ...params.data, id: json.id },
            }))
        }
        return Promise.reject("Not implemented")
    },
        // httpClient(`${apiUrl}/${resource}/${params.id}`, {
        //     method: 'PUT',
        //     body: JSON.stringify(params.data),
        // }).then(({ json }) => ({ data: json })),

    // updateMany: (resource, params) => {
    //     const query = {
    //         filter: JSON.stringify({ id: params.ids}),
    //     };
    //     return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
    //         method: 'PUT',
    //         body: JSON.stringify(params.data),
    //     }).then(({ json }) => ({ data: json }));
    // },

    // create: (resource, params) =>
    //     httpClient(`${apiUrl}/${resource}`, {
    //         method: 'POST',
    //         body: JSON.stringify(params.data),
    //     }).then(({ json }) => ({
    //         data: { ...params.data, id: json.id },
    //     })),

    delete: (resource, params) => {
        if (resource === "plugins") {
            return httpClient(`${apiUrl}/__delete`, {
                method: 'POST',
                headers: new Headers({
                    "Authorization": authProvider.getAuth()
                }),
                body: JSON.stringify(params),
            }).then(({ json }) => ({ data: json }))
        }
        return Promise.reject("Not implemented")
    },
        // httpClient(`${apiUrl}/${resource}/${params.id}`, {
        //     method: 'DELETE',
        // }).then(({ json }) => ({ data: json })),

    deleteMany: (resource, params) => {
        return Promise.all(params.ids.map(id => dataProvider.delete(resource, { id })));
    }
};

export default dataProvider;
