import './fonts/ys-display/fonts.css'
import './style.css'

import {ServerApi} from "./components/server.js";
import {initData} from "./components/data.js";

import {initSorting} from "./components/sorting.js";
import {initPagination} from "./components/pagination.js";
import {initFiltering} from "./components/filtering.js";
import {initSearching} from "./components/searching.js";
import {initEditing} from "./components/editing.js";

import {initTable} from "./components/table.js";

const BASE_URL = 'https://webinars.webdev.education-services.ru/sp7-api';
const schema = [
    { name: 'date', label: 'Date', sort: true, filter: "text", edit: "date" },
    { name: 'customer', label: 'Customer', filter: "text", edit: "select", options: "customers" },
    { name: 'seller', label: 'Seller', filter: "select", options: "sellers", edit: "select" },
    { name: 'total', label: 'Total', sort: true, filter: "range", edit: "number" },
];
const app = document.getElementById('app');

const api = initData( ServerApi(BASE_URL) );

const sorting = initSorting(redraw);
const pagination = initPagination(redraw);
const filtering = initFiltering(redraw);
const searching = initSearching(redraw);
const editing = initEditing(redraw, api);

const { container, render } = initTable({
    schema,
    plugins: [
        editing.plugin,
        searching.plugin,
        filtering.plugin,
        sorting.plugin,
        pagination.plugin,
    ]
});

app.replaceChildren( container );

async function redraw() {
    let query = {};
    query = sorting.apply(query);
    query = pagination.apply(query);
    query = filtering.apply(query);
    query = searching.apply(query);

    const { items, total } = await api.getRecords(query);

    render(items);
    pagination.update(total);
}

api.getIndexes().then(indexes => {
    filtering.update(indexes);
    editing.update(indexes);

    return redraw();
})