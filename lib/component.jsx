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

import React, {PropTypes} from "react";
import ReactDOM from "react-dom";
import Input from "itsa-react-input";
import ReactMaskedInput from "react-maskedinput";

const ON = 'on',
      KEY = "key",
      KEYDOWN = KEY + "down",
      KEYUP = KEY + "up",
      KEYPRESS = KEY + "press";

let IE8_Events;

const MaskedInput = React.createClass({

    propTypes: {
        /**
         * Whether to autofocus the Component.
         *
         * @property autoFocus
         * @type Boolean
         * @since 0.0.1
        */
        autoFocus: PropTypes.bool,

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
         * @property onChange
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
         * @property onChange
         * @type Function
         * @since 0.0.1
        */
        onClick: PropTypes.func,

        /**
         * The `onFocus` function, when happening on the DOM-Element.
         *
         * @property onChange
         * @type Function
         * @since 0.1.0
        */
        onFocus: PropTypes.func,

        /**
         * The `placeholder` for the element.
         *
         * @property placeholder
         * @type String
         * @since 0.0.1
        */
        placeholder: PropTypes.string,

        /**
         * The `type` of the input-element: either `text` or `password`
         *
         * @property type
         * @type String
         * @since 0.0.1
        */
        type: React.PropTypes.oneOf(['text','password']),

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
    },

    /**
     * Gets invoked after the Component mounted.
     * Will set several refences to internal nodes for quick referal.
     *
     * @method componentDidMount
     * @since 0.0.1
     */
    componentDidMount() {
        const instance = this;
        instance._node = ReactDOM.findDOMNode(this);
        IE8_Events = !instance._node.addEventListener;
        instance.setEvents();
    },

    /**
     * Gets invoked before the Component gets unmounted.
     * Will detach some window-eventlisteners.
     *
     * @method componentWillUnmount
     * @since 0.0.1
     */
    componentWillUnmount() {
        this.detachEvents();
    },

    /**
     * Detaches eventlisteners.
     *
     * @method detachEvents
     * @chainable
     * @since 0.0.1
     */
    detachEvents() {
        var instance = this;
        if (IE8_Events) {
            instance._node.detachEvent(ON+KEYDOWN, this.handleKeyDown);
            instance._node.detachEvent(ON+KEYUP, this.handleKeyUp);
            instance._node.detachEvent(ON+KEYPRESS, this.handleKeyPress);
        }
        else {
            instance._node.removeEventListener(KEYDOWN, this.handleKeyDown, true);
            instance._node.removeEventListener(KEYUP, this.handleKeyUp, true);
            instance._node.removeEventListener(KEYPRESS, this.handleKeyPress, true);
        }
        return instance;
    },

    /**
     * Returns the rendered React-Element that serves as the source dom-element
     *
     * @method element
     * @param props {Object} props to be passed through to the Component
     * @return ReactComponent
     * @since 0.0.4
     */
    element(inputProps) {
        // in case we are using `react-maskedinput`, then it doesn"t accept an empty value
        // once it already has content. This makes it impossible to emtpy.
        // therefore we need to empty the maks by hacking it:

        const type = (this.props.type==="password") ? "password" : "text",
              maskComponent = this.refs.mask; // only there when already rendered before

        if (maskComponent && !inputProps.value) {
            maskComponent.mask.setValue();
        }
        return (<ReactMaskedInput mask={this.props.mask} ref="mask" {...inputProps} type={type} />);
    },

    /**
     * Gets the Component"s internal state. Note, that the this is NOT Redux"s state.
     *
     * @method getInitialState
     * @return Object the Component internal initial state
     * @since 0.0.1
     */

    /**
     * Sets the focus on the Component.
     *
     * @method focus
     * @chainable
     * @since 0.0.1
     */

    /**
     * The method that is called whenever the input-Element changes its value.
     * Will update the Redux-store (signupuser.homeaddress);
     *
     * @method handleChange
     * @param e {Object} event-payload
     * @since 0.0.1
     */

    /**
     * The method that is called whenever the input-Element gets the focus.
     * It will change its internal state, so that the css looks right and
     * also any validation-messages disappear.
     *
     * @method handleFocus
     * @param e {Object} event-payload
     * @since 0.0.1
     */

    /**
     * The method that is called whenever the input-Element gets blurred.
     * It will change its internal state, so that the css looks right and
     * also any validation-messages appear.
     *
     * @method handleBlur
     * @param e {Object} event-payload
     * @since 0.0.1
     */

    /**
     * The method that is called whenever the input-Element gets a keyDown-event.
     *
     * @method handleKeyDown
     * @param e {Object} event-payload
     * @since 0.0.3
     */
    handleKeyDown(e) {
        this.props.onKeyDown && this.props.onKeyDown(e);
    },

    /**
     * The method that is called whenever the input-Element gets a keyUp-event.
     *
     * @method handleKeyUp
     * @param e {Object} event-payload
     * @since 0.0.3
     */
    handleKeyUp(e) {
        this.props.onKeyUp && this.props.onKeyUp(e);
    },

    /**
     * The method that is called whenever the input-Element gets a keyPress-event.
     *
     * @method handleKeyPress
     * @param e {Object} event-payload
     * @since 0.0.3
     */
    handleKeyPress(e) {
        this.props.onKeyPress && this.props.onKeyPress(e);
    },

    /**
     * React render-method --> renderes the Component.
     *
     * @method render
     * @return ReactComponent
     * @since 0.0.1
     */
    render() {
        return <Input {...this.props} element={this.element} />;
    },

    /**
     * Sets eventlisteners.
     *
     * @method setEvents
     * @chainable
     * @since 0.0.1
     */
    setEvents() {
        var instance = this;
        if (IE8_Events) {
            instance._node.attachEvent(ON+KEYDOWN, this.handleKeyDown);
            instance._node.attachEvent(ON+KEYUP, this.handleKeyUp);
            instance._node.attachEvent(ON+KEYPRESS, this.handleKeyPress);
        }
        else {
            instance._node.addEventListener(KEYDOWN, this.handleKeyDown, true);
            instance._node.addEventListener(KEYUP, this.handleKeyUp, true);
            instance._node.addEventListener(KEYPRESS, this.handleKeyPress, true);
        }
        return instance;
    }

});

module.exports = MaskedInput;
