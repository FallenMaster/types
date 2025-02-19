import {IEnumerator} from '../collection';
import Abstract from './Abstract';

type ExtractFunc = (item: any, index: string|number) => string|number;

/**
 * Энумератор уникальных элементов
 * @author Мальцев А.А.
 */
export default class UniquelyEnumerator<T> implements IEnumerator<T> {
    readonly '[Types/_collection/IEnumerator]': boolean = true;
    private previous: Abstract<T>;
    private idExtractor: ExtractFunc;
    private enumerator: IEnumerator<T>;
    private objectsHash: any[];
    private keysHash: Object;

    /**
     * Конструктор энумератора уникальных элементов.
     * @param previous Предыдущее звено.
     * @param [idExtractor] Возвращает уникальный идентификатор элемента.
     */
    constructor(previous: Abstract<T>, idExtractor?: ExtractFunc) {
        this.previous = previous;
        this.idExtractor = idExtractor;
        this.reset();
    }

    getCurrent(): any {
        return this.enumerator.getCurrent();
    }

    getCurrentIndex(): any {
        return this.enumerator.getCurrentIndex();
    }

    moveNext(): boolean {
        const hasNext = this.enumerator.moveNext();
        let current;

        if (hasNext) {
            current = this.enumerator.getCurrent();
            if (this.idExtractor) {
                current = this.idExtractor(current, this.enumerator.getCurrentIndex());
            }
            if (current instanceof Object) {
                if (this.objectsHash.indexOf(current) > -1) {
                    return this.moveNext();
                }
                this.objectsHash.push(current);
            } else {
                if (current in this.keysHash) {
                    return this.moveNext();
                }
                this.keysHash[current] = true;
            }
        }

        return hasNext;
    }

    reset(): void {
        this.enumerator = this.previous.getEnumerator();
        this.keysHash = {};
        this.objectsHash = [];
    }
}

Object.assign(UniquelyEnumerator.prototype, {
    previous: null,
    enumerator: null,
    idExtractor: null,
    keysHash: null,
    objectsHash: null
});
