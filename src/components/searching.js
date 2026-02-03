import {rules, createComparison} from "../lib/compare.js";


export function initSearching(searchField) {
    // @todo: #5.1 — настроить компаратор
    // Создаем функцию сравнения для поиска по нескольким полям, используя правила rules.searchMultipleFields
    const compare = createComparison(rules.searchMultipleFields(searchField, ['date', 'customer', 'seller'], false));

    return (data, state, action) => {
        // @todo: #5.2 — применить компаратор
        // Обрабатываем поиск только при наличии значения в state.search или при действии поиска
        if (state.search && state.search.trim() !== '') {
            // Фильтруем данные с помощью созданной функции сравнения
            return data.filter(row => compare(row, { [searchField]: state.search }));
        }
        // Если поиск пустой, возвращаем исходные данные
        return data;
    }
}