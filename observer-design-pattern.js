/**
 * @file
 * Observer design pattern.
 *
 * This object will provide an observer design pattern. Observers may
 * subscribe to specific message types. Observables may broadcast
 * messages specific to a type.
 *
 * @author Bryan Hazelbaker <bryan.hazelbaker@gmail.com>
 * @version 1.0
 *
 * @see http://www.joezimjs.com/javascript/javascript-design-patterns-observer/
 */
 
/**
 * The Observable class.
 *
 * Instantiate this to objects that wish to be observed.
 *
 * Example:
 * @code
 *   // Create the observer object. It is simply a function.
 *   var Observer = function(message, messageType) {
 *       console.log(message);
 *   }
 *   // Create the observable object.
 *   observable = new Observable();
 *   // Create a default message type for observers to subscribe to.
 *   observable.messageTypeAdd('generic');
 *   // Subscribe the Observer previously declared to any 'generic' messages
 *   // published.
 *   observable.messageSubscribe(Observer, 'generic');
 *   // Publish a message.
 *   observable.messagePublish('generic', 'We published this data!');
 * @endcode
 */
var Observable = function() {}
Observable.prototype = {
    subscribers: [],
    messageTypeAdd: function(messageType) {
        this.subscribers[messageType] = [];
    },
    messageTypeRemove: function (messageType) {
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
    messageSubscribe: function(messageType, callback) {
        // Add the callback to the message type specific callback list.
        this.subscribers[messageType].push(callback);
    },
    messageUnsubscribe: function(messageType, callback) {
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
    },
    messagePublish: function(messageType, data) {
        var i = 0,
            len = this.subscribers[messageType].length;
        // Iterate over the subscribers array and call each of
        // the callback functions.
        for (; i < len; i++) {
            this.subscribers[messageType][i](data, messageType);
        }
    }
};
