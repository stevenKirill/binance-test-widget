
/**
 * Функция сортирует массив в зависимости от того по какой колонке сортируем и какие параетры приняли
 * @param {*array} array массив данных 
 * @param {*object} type объект с параметрами
 * @returns отсортированный массив
 */
export function customSort(array, type) {
    const {direction, byWhat, column} = type;
    console.log(direction, byWhat, column)
    if(byWhat === 'number' && column === 'price') {
        switch(direction) {
            case 'asc':
                return array.sort((a,b) => a.c - b.c);
            case 'desc':
                return array.sort((a,b) => b.c - a.c);
            default:
                return array
        }
    } else if (byWhat === 'number' && column === 'volume') {
        switch(direction) {
            case 'asc':
                return array.sort((a,b) => a.qv - b.qv);
            case 'desc':
                return array.sort((a,b) => b.qv - a.qv);
            default:
                return array
        }
    } else if(byWhat === 'string' && column === 'pair') {
        console.log(direction, byWhat, column)
        switch(direction) {
            case 'asc':
                const sorted = array.sort((x,y) =>{
                    if (y.b > x.b) {
                        return 1
                    } else {
                        return -1
                    }
                });
                return sorted
            case 'desc':
                return array.sort((x,y) => {
                    if(x.b > y.b) {
                        return 1
                    } else {
                        return -1
                    }
                });
            default:
                return array
        }
    }
};
/**
 * Функция фильтрует массив по строке введеной в инпут
 * @param {array} data массив данных 
 * @param {string} userInput то что ввел пользователь в инпут 
 * @returns массив тех валют в имени которых содержаться введенный символы
 */
export function filterByName(data,userInput) {
    return data.filter(item => item.b.toLowerCase().includes(userInput));
};
/**
 * Фильтрует по крипте
 * @param {array} data массив данных 
 * @param {*} currency крипта по которой сортируем
 * @returns отфильтрованный массив
 */
export function filterByCurrency(data,currency) {
    return data.filter(item => {
        return item.q === currency
    });
};