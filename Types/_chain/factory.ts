import Abstract from './Abstract';
import Arraywise from './Arraywise';
import Objectwise from './Objectwise';
import Enumerable from './Enumerable';
import Concatenated from './Concatenated';
import Counted from './Counted';
import Filtered from './Filtered';
import Flattened from './Flattened';
import Grouped from './Grouped';
import Mapped from './Mapped';
import Reversed from './Reversed';
import Sliced from './Sliced';
import Sorted from './Sorted';
import Uniquely from './Uniquely';
import Zipped from './Zipped';
import {IEnumerable} from '../collection';
import {IHashMap} from '../_declarations';
import {register} from '../di';

register('Types/chain:DestroyableMixin', Abstract, { instantiate: false });
register('Types/chain:Arraywise', Arraywise, { instantiate: false });
register('Types/chain:Concatenated', Concatenated, { instantiate: false });
register('Types/chain:Counted', Counted, { instantiate: false });
register('Types/chain:Enumerable', Enumerable, { instantiate: false });
register('Types/chain:Filtered', Filtered, { instantiate: false });
register('Types/chain:Flattened', Flattened, { instantiate: false });
register('Types/chain:Grouped', Grouped, { instantiate: false });
register('Types/chain:Mapped', Mapped, { instantiate: false });
register('Types/chain:Objectwise', Objectwise, { instantiate: false });
register('Types/chain:Reversed', Reversed, { instantiate: false });
register('Types/chain:Sliced', Sliced, { instantiate: false });
register('Types/chain:Sorted', Sorted, { instantiate: false });
register('Types/chain:Uniquely', Uniquely, { instantiate: false });
register('Types/chain:Zipped', Zipped, { instantiate: false });

/**
 * Создает последовательную цепочку вызовов, обрабатывающих коллекции различных типов.
 * @remark
 * Выберем из массива имена персонажей женского пола, отсортированные по имени:
 * <pre>
 * import {factory} from 'Types/chain';
 * factory([
 *     {name: 'Philip J. Fry', gender: 'M'},
 *     {name: 'Turanga Leela', gender: 'F'},
 *     {name: 'Professor Farnsworth', gender: 'M'},
 *     {name: 'Amy Wong', gender: 'F'},
 *     {name: 'Bender Bending Rodriguez', gender: 'R'}
 * ])
 *     .filter((item) => item.gender === 'F')
 *     .map((item) => item.name)
 *     .sort((a, b) => a - b)
 *     .value();
 * //['Amy Wong', 'Turanga Leela']
 * </pre>
 * Выберем из рекордсета персонажей женского пола, отсортированных по имени:
 * <pre>
 * import {factory} from 'Types/chain';
 * import {RecordSet} from 'Types/collection';
 * factory(new RecordSet({rawData: [
 *     {name: 'Philip J. Fry', gender: 'M'},
 *     {name: 'Turanga Leela', gender: 'F'},
 *     {name: 'Professor Farnsworth', gender: 'M'},
 *     {name: 'Amy Wong', gender: 'F'},
 *     {name: 'Bender Bending Rodriguez', gender: 'R'}
 * ]}))
 *     .filter((item) => item.get('gender') === 'F')
 *     .sort((a, b) => a.get('name') - b.get('name'))
 *     .value();
 * //[Model(Amy Wong), Model(Turanga Leela)]
 * </pre>
 * Другие примеры смотрите в описании методов класса {@link Types/_chain/Abstract}.
 *
 * @class Types/_chain/factory
 * @param source Коллекция, обрабатываемая цепочкой
 * @public
 * @author Мальцев А.А.
 */
export default function factory<T>(source: Abstract<T> | IEnumerable<T> | T[] | IHashMap<T>): Abstract<T> {
    if (source instanceof Abstract) {
        return source;
    } else if (source && source['[Types/_collection/IEnumerable]']) {
        return new Enumerable(source);
    } else if (source instanceof Array) {
        return new Arraywise(source);
    } else if (source instanceof Object) {
        return new Objectwise(source);
    }
    throw new TypeError(`Unsupported source type "${source}": only Array or Object are supported.`);
}
