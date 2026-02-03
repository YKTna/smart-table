import {sortCollection, sortMap} from "../lib/sort.js";

export function initSorting(columns) {
    return (data, state, action) => {
        let field = null;
        let order = null;

        if (action && action.name === 'sort') {
            // @todo: #3.1 — запомнить выбранный режим сортировки
            // Переключаем состояние кнопки по карте
            action.dataset.value = sortMap[action.dataset.value]; // переключение состояния
            field = action.dataset.field;
            order = action.dataset.value;

            // @todo: #3.2 — сбросить сортировки остальных колонок
            columns.forEach(column => {
                if (column.dataset.field !== action.dataset.field) {
                    column.dataset.value = 'none'; // сброс остальных кнопок
                }
            });
        } else {
            // @todo: #3.3 — получить выбранный режим сортировки
            // Проверяем, есть ли активная сортировка среди колонок
            columns.forEach(column => {
                if (column.dataset.value !== 'none') {
                    field = column.dataset.field;
                    order = column.dataset.value;
                }
            });
        }

        // @todo: применяем сортировку
        return sortCollection(data, field, order);
    }
}