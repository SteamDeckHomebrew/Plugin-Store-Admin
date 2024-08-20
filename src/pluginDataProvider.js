import { fetchUtils } from 'react-admin';
import authProvider from './authProvider';

export const apiUrl = "";
export const cdnUrl = "https://cdn.tzatzikiweeb.moe/file/steam-deck-homebrew";
const httpClient = fetchUtils.fetchJson;

export let generateDownloadURL = (hash) => `${cdnUrl}/versions/${hash}.zip`

export let downloadArtifact = (hash) => {
    const link = document.createElement('a');
    link.href = generateDownloadURL(hash);
    link.click();
}

const dataProvider = {
    getList: (resource, params) => {
        // const { page, perPage } = params.pagination;
        // const { field, order } = params.sort;
        // const query = {
        //     sort: JSON.stringify([field, order]),
        //     range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        //     filter: JSON.stringify(params.filter),
        // };
        let url = `${apiUrl}/v1/${resource}`;
        if (resource === "plugins") {
            // TODO THIS IS MEGA JANK
            url = `${apiUrl}/${resource}?hidden=true`//?${stringify(query)}`;
        }

        return httpClient(url, resource !== "plugins" && {
            headers: new Headers({
                "Authorization": authProvider.getAuth()
            }),
        }).then(({ json }) => ({
            data: json,
            total: json.length,
        }));
    },

    getOne: (resource, params) => {
        let url = `${apiUrl}/v1/${resource}/${params.id}`;
        if (resource === "plugins") {
            // TODO THIS IS MEGA JANK
            url = `${apiUrl}/${resource}?hidden=true`//?${stringify(query)}`;
            return httpClient(url).then(({ json }) => {
                return {
                    data: json.find(x => x.id.toString() === params.id),
                }
            })
        }

        return httpClient(url, {
            headers: new Headers({
                "Authorization": authProvider.getAuth()
            }),
        }).then(({ json }) => ({data: json}));
    },

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

        return httpClient(`${apiUrl}/v1/${resource}/${params.id}`, {
            method: 'PUT',
            headers: new Headers({
                "Authorization": authProvider.getAuth()
            }),
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: json,
        }))
    },

    // updateMany: (resource, params) => {
    //     const query = {
    //         filter: JSON.stringify({ id: params.ids}),
    //     };
    //     return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
    //         method: 'PUT',
    //         body: JSON.stringify(params.data),
    //     }).then(({ json }) => ({ data: json }));
    // },

    create: (resource, params) => {
        if (resource === "plugins") {
            throw new Error("Not implemented.");
        }

        return httpClient(`${apiUrl}/v1/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
            headers: new Headers({
                "Authorization": authProvider.getAuth()
            }),
        }).then(({ json }) => ({
            data: json,
        }))
    },

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

        return httpClient(`${apiUrl}/v1/${resource}/${params.id}`, {
            method: 'DELETE',
            headers: new Headers({
                "Authorization": authProvider.getAuth()
            }),
        }).then(({ json }) => ({ data: json }));
    },
        // httpClient(`${apiUrl}/${resource}/${params.id}`, {
        //     method: 'DELETE',
        // }).then(({ json }) => ({ data: json })),

    deleteMany: (resource, params) => {
        return Promise.all(params.ids.map(id => dataProvider.delete(resource, { id })));
    }
};

export default dataProvider;
