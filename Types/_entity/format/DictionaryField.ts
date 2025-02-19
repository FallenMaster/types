import Field from './Field';
import {IHashMap} from '../../_declarations';

type Dictionary = string[] | IHashMap<string>;

/**
 * Формат поля со словарём (абстрактный класс)
 * @class Types/_entity/format/DictionaryField
 * @extends Types/_entity/format/Field
 * @public
 * @author Мальцев А.А.
 */
export default class DictionaryField extends Field {
    /**
     * @cfg {Array.<String>} Словарь возможных значений
     * @name Types/_entity/format/DictionaryField#dictionary
     * @see getDictionary
     */
    _$dictionary: Dictionary;

    /**
     * @cfg {Array.<String>} Локализованный словарь возможных значений
     * @name Types/_entity/format/DictionaryField#localeDictionary
     * @see getDictionary
     */
    _$localeDictionary: Dictionary;

    // region Public methods

    /**
     * Возвращает словарь возможных значений
     * @see dictionary
     */
    getDictionary(): Dictionary {
        return this._$dictionary;
    }

    /**
     * Возвращает словарь возможных значений
     * @return {Array.<String>}
     * @see dictionary
     */
    getLocaleDictionary(): Dictionary {
        return this._$localeDictionary;
    }

    // endregion Public methods
}

Object.assign(DictionaryField.prototype, {
    ['[Types/_entity/format/DictionaryField]']: true,
    _moduleName: 'Types/entity:format.DictionaryField',
    _typeName: 'Dictionary',
    _$dictionary: null,
    _$localeDictionary: null
});
