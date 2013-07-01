/**
 * @file
 * Observer design pattern.
 *
 * This object will provide an observer design pattern. Observers may
 * subscribe to specific message types. Observables may broadcast
 * messages specific to a type.
 *
 * @author Bryan Hazelbaker <bryan.hazelbaker@gmail.com>
 * @version 0.1
 *
 * @see http://www.joezimjs.com/javascript/javascript-design-patterns-observer/
 */

/**
 * The Observable class.
 *
 * Instantiate this to objects that wish to be observed.
 *
 * Example using Observable:
 * @code
 *   // Create the observer object. It is simply a function.
 *   var Observer = function(message, messageType) {
 *       console.log(message);
 *   }
 *   // Create the observable object.
 *   observable = new Observable();
 *   // Create a default message type for observers to subscribe to.
 *   observable.messageTypeAdd('generic');
 *   // Subscribe previously declared Observer all 'generic' messages.
 *   observable.messageSubscribe(Observer, 'generic');
 *   // Publish a message.
 *   observable.messagePublish('generic', 'I published this data!', observable);
 *   // Optionally examination the response of any observers.
 * @endcode
 *
 * Example extending Observable:
 * @code
 *   // Declare the subclass.
 *   var SubObserverableClass = function() {
 *       // Call our super class constructor.
 *       Observable.call(this)
 *       // Register a message type.
 *       this.typeAdd('generic');
 *   };
 *   // Cause our subclass to inherit methods of Observable superclass.
 *   SubObservableClass.prototype = Observable.prototype;
 *   // Add a new method to our new subclass.
 *   SubObservableClass.prototype.myCustomMethod = function() {
 *       alert('My new custom method added to existing Observable methods!');
 *   };
 * @endcode
 */
var Observable = function() {
    this.subscribers = [];
};
Observable.prototype = {
    typeAdd: function(messageType) {
        this.subscribers[messageType] = [];
    },
    typeRemove: function (messageType) {
        var i = 0,
            len = this.subscribers.length;
        // Iterate through the array and if the callback is
        // found, remove it from the list of subscribers.
        for (; i < len; i++) {
            if (this.subscribers[i] === messageType) {
                this.subscribers.splice(i, 1);
                // Once we've found it, we don't need to
                // continue, so just return.
                return;
            }
        }
    },
    subscribe: function(messageType, callback) {
        // Add the callback to the message type specific callback list.
        this.subscribers[messageType].push(callback);
    },
    unsubscribe: function(messageType, callback) {
        if (messageType in this.subscribers) {
            var i = 0,
                len = this.subscribers[messageType].length;
            // Iterate through the array and if the callback is
            // found, remove it from the list of subscribers.
            for (; i < len; i++) {
                if (this.subscribers[messageType][i] === callback) {
                    this.subscribers[messageType].splice(i, 1);
                    // Once we've found it, we don't need to
                    // continue, so just return.
                    return;
                }
            }
        }
    },
    /**
     * Send out a message to any listeners.
     *
     * @param mixed data
     *   The data being distributed.
     * @param string messageType
     *   The type of message being distributed.
     * @param object observed
     *   The object that is distributing the message.
     *
     * @return bool|object
     *   false if no response was provider by observers. Otherwise an object
     *   keyed by observer callback function name.
     */
    publish: function(data, messageType, observed) {
        var result = {};
        if (messageType in this.subscribers) {
            var i = 0,
                len = this.subscribers[messageType].length;
            // Iterate over the subscribers array and call each of
            // the callback functions.
            for (; i < len; i++) {
                var callback = this.subscribers[messageType][i];
                result[callback.name] = callback(data, messageType, observed, result);
            }
        }
        return (Object.keys(result).length) ? result : false;
    }
};
