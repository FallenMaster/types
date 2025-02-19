import {IHashMap} from '../_declarations';
import {protect} from '../util';

const optionPrefix = '_$';
const optionPrefixLen = optionPrefix.length;

const $mergeable = protect('mergeable');

export function getMergeableProperty<T>(value: T): T {
    value[$mergeable] = true;
    return value;
}

function defineProperty(instance: object, name: string, key: string, scope: object): void {
    const proto = Object.getPrototypeOf(instance);
    const isMergeable = proto[name] && proto[name][$mergeable];

    Object.defineProperty(instance, name, {
        enumerable: true,
        configurable: true,
        get(): any {
            delete instance[name];
            const value = isMergeable ? {...proto[name], ...scope[key]} : scope[key];
            return (instance[name] = value);
        },
        set(value: any): void {
            delete instance[name];
            const newValue = isMergeable ? {...proto[name], ...value} : value;
            instance[name] = newValue;
        }
    });
}

/**
 * Примесь, позволяющая передавать в конструктор сущности набор опций (объект вида ключ-значение).
 * @remark
 * Для разделения защищенных свойств и опций последние должны именоваться определенным образом - имя должно начинаться с префикса '_$':
 * <pre>
 *     var Device = Core.extend([OptionsToPropertyMixin], {
 *         _$vendor: '',
 *         getVendor: function () {
 *             return this._$vendor;
 *         }
 *     });
 * </pre>
 * Если класс-наследник имеет свой конструктор, обязательно вызовите конструктор примеси (или конструктор родительского класса, если примесь уже есть у родителя):
 * <pre>
 *     var Device = Core.extend([OptionsToPropertyMixin], {
 *         _$vendor: '',
 *         constructor: function(options) {
 *             OptionsToPropertyMixin.constructor.call(this, options);
 *         },
 *         getVendor: function () {
 *             return this._$vendor;
 *         }
 *     });
 * </pre>
 * Потому что именно конструктор примеси OptionsToPropertyMixin раскладывает значения аргумента options по защищенным свойствам:
 * <pre>
 *     var hdd = new Device({
 *         vendor: 'Seagate'
 *     });
 *     hdd.getVendor();//Seagate
 * </pre>
 * @class Types/_entity/OptionsToPropertyMixin
 * @public
 * @author Мальцев А.А.
 */
export default abstract class OptionsToPropertyMixin {
    /**
     * @deprecated Only for old-fashioned inheritance
     */
    protected _options: any;

    /**
     * Конструктор объекта, принимающий набор опций в качестве первого аргумента
     * @param {Object} [options] Значения опций
     */
    constructor(options?: IHashMap<any>) {
        if (options && typeof options === 'object') {
            const prefix = optionPrefix;
            const keys = Object.keys(options);
            let option;
            let property;
            for (let i = 0, count = keys.length; i < count; i++) {
                option = keys[i];
                property = prefix + option;
                if (property in this) {
                    defineProperty(this, property, option, options);
                }
            }
        }
    }

    /**
     * Возвращает опции объекта
     * @return Значения опций
     * @protected
     */
    protected _getOptions(): IHashMap<any> {
        const options = {};
        const keys = Object.keys(this);
        const proto = Object.getPrototypeOf(this);
        let name;
        let value;
        let optionName;
        for (let i = 0, count = keys.length; i < count; i++) {
            name = keys[i];
            if (name.substr(0, optionPrefixLen) === optionPrefix) {
                value = this[name];
                optionName = name.substr(optionPrefixLen);

                if (proto[name] && proto[name][$mergeable]) {
                     // For mergeable option keep only not original part of value
                     options[optionName] = Object.keys(value)
                          .filter((propName) => value[propName] !== proto[name][propName])
                          .reduce((memo, propName) => {
                                memo[propName] = value[propName];
                                return memo;
                          }, {});
                } else {
                     options[optionName] = value;
                }
            }
        }

        // FIXME: get rid of _options
        if (this._options) {
            for (name in this._options) {
                if (this._options.hasOwnProperty(name) && !(name in options)) {
                    options[name] = this._options[name];
                }
            }
        }

        return options;
    }
}

OptionsToPropertyMixin.prototype['[Types/_entity/OptionsToPropertyMixin]'] = true;
