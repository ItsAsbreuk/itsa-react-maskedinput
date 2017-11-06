"use strict";

/**
 * Description here
 *
 *
 *
 * <i>Copyright (c) 2016 ItsAsbreuk - http://itsasbreuk.nl</i><br>
 * New BSD License - http://choosealicense.com/licenses/bsd-3-clause/
 *
 *
 * @module itsa-react-maskedinput
 * @class MaskedInput
 * @since 2.0.0
*/

const React = require("react"),
    PropTypes = require("prop-types"),
    Input = require("itsa-react-input"),
    ReactMaskedInput = require("react-maskedinput");

// see https://github.com/insin/react-maskedinput/issues/104#issuecomment-315752541
if (MaskedInput.default) {
  MaskedInput = MaskedInput.default;
}

class MaskedInput extends Input {

    getAdditionalProps() {
        return {
            mask: this.props.mask
        };
    }

    /**
     * Returns the rendered React-Element that serves as the source dom-element
     *
     * @method element
     * @param props {Object} props to be passed through to the Component
     * @return ReactComponent
     * @since 0.0.4
     */
    getDefinedComponent(hasValue) {
        const maskComponent = this._inputElement; // only there when already rendered before
        if (maskComponent && !hasValue) {
            maskComponent.mask.setValue();
        }
        return ReactMaskedInput;
    }
}

MaskedInput.propTypes = {
    /**
     * Whether to autofocus the Component.
     *
     * @property autoFocus
     * @type Boolean
     * @since 0.0.1
    */
    autoFocus: PropTypes.bool,

    /**
     * The class that should be set on the element
     *
     * @property className
     * @type String
     * @since 0.0.1
    */
    className: PropTypes.string,

    /**
     * The error-message that appears when the element is wrong validated.
     *
     * @property errorMsg
     * @type String
     * @since 0.0.1
    */
    errorMsg: PropTypes.string,

    /**
     * Whether the parent-form has been validated.
     * This value is needed to determine if the validate-status should be set.
     *
     * @property formValidated
     * @type Boolean
     * @since 0.0.1
    */
    formValidated: PropTypes.bool,

    /**
     * The text that should appear when the element is wrong validated.
     *
     * @property helpText
     * @type String
     * @since 0.0.1
    */
    helpText: PropTypes.string,

    /**
     * The `id` of the element.
     *
     * @property id
     * @type String
     * @since 0.0.1
    */
    id: PropTypes.string,

    /**
     * Whether to mark the Component when successfully validated.
     *
     * @property markValidated
     * @type Boolean
     * @since 0.0.1
    */
    markValidated: PropTypes.bool,

    /**
     * Whether the Component should show an validate-reclamation (star)
     *
     * @property markValidated
     * @type Boolean
     * @since 0.0.1
    */
    markRequired: PropTypes.bool,

    /**
     * The `mask` that determines the pattern.
     * See https://github.com/insin/inputmask-core#pattern
     *
     * @property mask
     * @type String
     * @since 0.0.1
    */
    mask: PropTypes.string.isRequired,

    /**
     * The `name` for the element.
     *
     * @property name
     * @type String
     * @since 0.0.1
    */
    name: PropTypes.string,

    /**
     * The `onBlur` function, when happening on the DOM-Element.
     *
     * @property onBlur
     * @type Function
     * @since 0.1.0
    */
    onBlur: PropTypes.func,

    /**
     * The `onChange` function, which should update the `state`.
     *
     * @property onChange
     * @type Function
     * @since 0.0.1
    */
    onChange: PropTypes.func.isRequired,

    /**
     * The `onClick` function, when happening on the DOM-Element.
     *
     * @property onClick
     * @type Function
     * @since 0.0.1
    */
    onClick: PropTypes.func,

    /**
     * The `onFocus` function, when happening on the DOM-Element.
     *
     * @property onFocus
     * @type Function
     * @since 0.1.0
    */
    onFocus: PropTypes.func,

    /**
     * The `onKeyDown` function, when happening on the DOM-Element.
     *
     * @property onKeyDown
     * @type Function
     * @since 0.1.0
    */
    onKeyDown: PropTypes.func,

    /**
     * The `onKeyEnter` function, when the enter-key is pressed.
     *
     * @property onKeyEnter
     * @type Function
     * @since 0.1.0
    */
    onKeyEnter: PropTypes.func,

    /**
     * The `onKeyPress` function, when happening on the DOM-Element.
     *
     * @property onKeyPress
     * @type Function
     * @since 0.1.0
    */
    onKeyPress: PropTypes.func,

    /**
     * The `onKeyUp` function, when happening on the DOM-Element.
     *
     * @property onKeyUp
     * @type Function
     * @since 0.1.0
    */
    onKeyUp: PropTypes.func,

    /**
     * The `placeholder` for the element.
     *
     * @property placeholder
     * @type String
     * @since 0.0.1
    */
    placeholder: PropTypes.string,

    /**
     * Inline style
     *
     * @property style
     * @type object
     * @since 0.0.1
    */
    style: PropTypes.object,

    /**
     * The `type` of the input-element: either `text` or `password`
     *
     * @property type
     * @type String
     * @since 0.0.1
    */
    type: PropTypes.oneOf(["text", "password"]),

    /**
     * The tabindex of the Component.
     *
     * @property type
     * @type Number
     * @since 0.0.1
    */
    tabIndex: PropTypes.number,

    /**
     * Whether the property is validated right.
     *
     * @property validated
     * @type Boolean
     * @since 0.0.1
    */
    validated: PropTypes.bool,

    /**
     * The `value` of the input-element.
     *
     * @property value
     * @type String
     * @since 0.0.1
    */
    value: PropTypes.string
};

module.exports = MaskedInput;
