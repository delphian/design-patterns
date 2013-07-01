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
 *   observable.messagePublish('generic', 'I published this data!', observable, response = []);
 *   // Optionally examination the response of any observers.
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
     * @param string messageType
     *   The type of message being distributed.
     * @param mixed data
     *   The data being distributed.
     * @param object observed
     *   The object that is distributing the message.
     *
     * @return bool|object
     *   false if no response was provider by observers. Otherwise an object
     *   keyed by observer callback function name.
     */
    messagePublish: function(messageType, data, observed) {
        var result = [];
        if (messageType in this.subscribers) {
            var i = 0,
                len = this.subscribers[messageType].length;
            // Iterate over the subscribers array and call each of
            // the callback functions.
            for (; i < len; i++) {
                var callback = this.subscribers[messageType][i];
                result[callback] = callback(data, messageType, observed, result);
            }
        }
        return (result.length) ? result : false;
    }
};
