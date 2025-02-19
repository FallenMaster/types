/**
 * Returns wrapper for protected property
 * @param property Property name
 * @public
 * @author Мальцев А.А.
 */
export default function protect(property: string): symbol | string {
    return typeof Symbol === 'undefined' ? `$${property}` : Symbol(property);
}
