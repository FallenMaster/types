import IEnumerable from './IEnumerable';

/**
 * Интерфейс списка - коллекции c доступом по индексу.
 * @remark
 * Основные возможности:
 * <ul>
 *     <li>получение элемента по индексу: {@link at};</li>
 *     <li>получение индекса по элементу: {@link getIndex};</li>
 *     <li>добавление элементов: {@link add}, {@link append}, {@link prepend};</li>
 *     <li>удаление элементов: {@link remove}, {@link removeAt}, {@link clear};</li>
 *     <li>замена элементов: {@link replace}, {@link assign};</li>
 *     <li>подсчет числа элементов: {@link getCount}.</li>
 * </ul>
 * @interface Types/_collection/IList
 * @public
 * @author Мальцев А.А.
 */
export default interface IList<T> {
    readonly '[Types/_collection/IList]': boolean;

    /**
     * Заменяет список другой коллекцией.
     * @param {Types/_collection/IEnumerable|Array} [items] Коллекция с элементами для замены
     * @example
     * Заменим элементы в списке, передав массив:
     * <pre>
     *     var list = new List({
     *         items: [1, 2, 3]
     *     });
     *
     *     list.assign([3, 4, 5]);
     *
     *     list.at(0);//3
     *     list.at(1);//4
     *     list.at(2);//5
     * </pre>
     * Заменим элементы в списке, передав список:
     * <pre>
     *     var list = new List({
     *         items: [1, 2, 3]
     *     });
     *
     *     list.assign(new List({
     *         items: [3, 4, 5]
     *     }));
     *
     *     list.at(0);//3
     *     list.at(1);//4
     *     list.at(2);//5
     * </pre>
     */
    assign(items: IEnumerable<T> | T[]): void;

    /**
     * Добавляет элементы другой коллекции к концу списка.
     * @param {Types/_collection/IEnumerable|Array} [items] Коллекция с элементами для добавления
     * @example
     * Добавим элементы в конец списка, передав массив:
     * <pre>
     *     var list = new List({
     *         items: [1, 2, 3]
     *     });
     *
     *     list.append([3, 4, 5]);
     *
     *     list.at(0);//1
     *     list.at(2);//3
     *     list.at(3);//3
     *     list.at(5);//5
     * </pre>
     * Добавим элементы в конец списка, передав список:
     * <pre>
     *     var list = new List({
     *         items: [1, 2, 3]
     *     });
     *
     *     list.append(new List({
     *         items: [3, 4, 5]
     *     }));
     *
     *     list.at(0);//1
     *     list.at(2);//3
     *     list.at(3);//3
     *     list.at(5);//5
     * </pre>
     */
    append(items: IEnumerable<T> | T[]): void;

    /**
     * Добавляет элементы другой коллекции в начало списка.
     * @param {Types/_collection/IEnumerable|Array} [items] Коллекция с элементами для добавления
     * @example
     * Добавим элементы в начало списка, передав массив:
     * <pre>
     *     var list = new List({
     *         items: [1, 2, 3]
     *     });
     *
     *     list.prepend([3, 4, 5]);
     *
     *     list.at(0);//3
     *     list.at(2);//5
     *     list.at(3);//1
     *     list.at(5);//3
     * </pre>
     * Добавим элементы в начало списка, передав список:
     * <pre>
     *     var list = new List({
     *         items: [1, 2, 3]
     *     });
     *
     *     list.prepend(new List({
     *         items: [3, 4, 5]
     *     }));
     *
     *     list.at(0);//3
     *     list.at(2);//5
     *     list.at(3);//1
     *     list.at(5);//3
     * </pre>
     */
    prepend(items: IEnumerable<T> | T[]): void;

    /**
     * Очищает список.
     * @example
     * Очистим список:
     * <pre>
     *     var list = new List({
     *         items: [1, 2, 3]
     *     });
     *
     *     list.getCount();//3
     *     list.clear();
     *     list.getCount();//0
     * </pre>
     */
    clear(): void;

    /**
     * Добавляет элемент в список.
     * При недопустимом at генерируется исключение.
     * @param {*} item Элемент
     * @param {Number} [at] Позиция, в которую добавляется элемент (по умолчанию - в конец)
     * @example
     * Добавим элемент в конец списка:
     * <pre>
     *     var list = new List({
     *         items: [1, 2]
     *     });
     *
     *     list.add(3);
     *
     *     list.at(0);//1
     *     list.at(1);//2
     *     list.at(2);//3
     * </pre>
     * Добавим элемент в начало списка:
     * <pre>
     *     var list = new List({
     *         items: [1, 2]
     *     });
     *
     *     list.add(3, 0);
     *
     *     list.at(0);//3
     *     list.at(1);//1
     *     list.at(2);//2
     * </pre>
     */
    add(item: T, at?: number): void;

    /**
     * Возвращает элемент по позиции.
     * При недопустимом index возвращает undefined.
     * @param {Number} index Позиция
     * @return {*} Элемент списка
     * @example
     * Получим первый и второй элементы списка:
     * <pre>
     *     var list = new List({
     *         items: [1, 2]
     *     });
     *
     *     list.at(0);//1
     *     list.at(1);//2
     * </pre>
     * Попробуем получить первый элемент пустого списка:
     * <pre>
     *     var list = new List();
     *     list.at(0);//undefined
     * </pre>
     */
    at(index: number): T;

    /**
     * Удаляет элемент из списка (первый найденный). Элементы, следующие за удаленным, смещаются вверх.
     * @param {*} item Удаляемый элемент
     * @return {Boolean} Если true - элемент удален, если false - такого элемента нет в списке.
     * @example
     * Удалим элемент списка со значением 2:
     * <pre>
     *     var list = new List({
     *         items: [1, 2, 3]
     *     });
     *
     *     list.at(1);//2
     *     list.remove(2);//true
     *     list.at(1);//3
     * </pre>
     * Удалим первый элемент списка со значением 2:
     * <pre>
     *     var list = new List({
     *         items: [1, 2, 2, 1]
     *     });
     *
     *     list.at(1);//2
     *     list.at(2);//2
     *     list.at(3);//1
     *     list.remove(2);//true
     *     list.at(1);//2
     *     list.at(2);//1
     *     list.at(3);//undefined
     * </pre>
     */
    remove(item: T): boolean;

    /**
     * Удаляет элемент в указанной позиции. Элементы, следующие за удаленным, смещаются вверх.
     * При недопустимом index генерируется исключение.
     * @param {Number} index Позиция элемента
     * @return {*} Удаленный элемент
     * @example
     * Удалим первый элемент списка:
     * <pre>
     *     var list = new List({
     *         items: [1, 2, 3]
     *     });
     *
     *     list.at(0);//1
     *     list.removeAt(0);//1
     *     list.at(0);//2
     * </pre>
     */
    removeAt(index: number): T;

    /**
     * Заменяет элемент в указанной позиции.
     * При недопустимом at генерируется исключение.
     * @param {*} item Заменяющий элемент
     * @param {Number} at Позиция, в которой будет произведена замена
     * @example
     * Заменим второй элемент списка:
     * <pre>
     *     var list = new List({
     *         items: [1, 2, 3]
     *     });
     *
     *     list.at(1);//2
     *     list.replace(5, 1);
     *     list.at(1);//5
     * </pre>
     */
    replace(item: T, at: number): void;

    /**
     * Перемещает элемент с одной позиции на другую.
     * При недопустимом from или to генерируется исключение.
     * @param {Number} from С какой позиции взять элемент
     * @param {Number} to На какую позицию переместить
     * @example
     * Переместим элемент с позиции 0 на позицию 3:
     * <pre>
     *     var list = new List({
     *         items: [1, 2, 3, 4]
     *     });
     *
     *     list.move(0, 3);
     *     list.at(0);//2
     *     list.at(3);//1
     *     list.at(2);//4
     * </pre>
     */
    move(from: number, to: number): void;

    /**
     * Возвращает позицию первого вхождения элемента в список.
     * @param {*} item Искомый элемент
     * @return {Number} Позвиция элемента или -1, если не найден
     * @example
     * Получим индекс первого элемента со значением 2:
     * <pre>
     *     var list = new List({
     *         items: [1, 2, 3, 2]
     *     });
     *
     *     list.getIndex(2);//1
     * </pre>
     */
    getIndex(item: T): number;

    /**
     * Возвращает количество элементов списка
     * @return {Number}
     * @example
     * Получим количество элементов списка:
     * <pre>
     *     var list = new List({
     *         items: [1, 2, 3]
     *     });
     *     list.getCount();//3
     *     list.append([2, 1]);
     *     list.getCount();//5
     * </pre>
     */
    getCount(): number;
}
