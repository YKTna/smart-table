import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes).forEach((elementName) => {
        // Получаем текущий элемент селектора
        const selectElement = elements[elementName];
        // Очищаем текущие опции
        selectElement.empty();

        // Создаем и добавляем новые опции
        Object.values(indexes[elementName]).forEach((name) => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            selectElement.appendChild(option);
        });
    });

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action && action.name === 'filter') {
            // Обработка фильтрации
            // Проверяем, есть ли действие "clear" (например, при нажатии кнопки очистки)
            if (action.dataset && action.dataset.action === 'clear') {
                // Найдем родительский элемент кнопки
                const parent = action.target ? action.target.closest('.filter-container') : null;
                if (parent) {
                    // Поиск input внутри родителя
                    const input = parent.querySelector('input[data-field]');
                    if (input) {
                        input.value = '';
                        // Обновим состояние
                        const field = input.dataset.field;
                        if (field && state.hasOwnProperty(field)) {
                            state[field] = '';
                        }
                    }
                }
            }
        }

        // @todo: #4.5 — отфильтровать данные используя компаратор
        // Создаем функцию сравнения с правилами по умолчанию
        const compare = createComparison(defaultRules);
        return data.filter(row => compare(row, state));
    }
}