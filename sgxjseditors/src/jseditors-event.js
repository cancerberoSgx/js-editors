/**
 * @module jseditors-event
 */

(function(ns){
	/**
	 * a source of named events that users can be subscribed to.
	 * @class EventSource
	 */
	ns.util.defineClass(ns, "EventSource", null, 
		function(){ /*constructor */
			this.listeners={}; 
		}
	,	{/* instance fields */
			/**
			 * register a new listener function that will be notified when a event of the given type is triggered. The function will be executed with 'this' editor instance as the context. 
			 * @method addListener
			 */
			addListener: function(eventName, handler) {
				if( ! this.listeners[eventName])
					this.listeners[eventName] = []; 
				this.listeners[eventName].push(handler); //TODO: check for existence and do nothing.
			}
		,	removeListener: function(eventName, listener) {
				if(this.listeners[eventName]) {
					this.listeners[eventName] = _.without(this.listeners[eventName], listener); 
				}
			}
			/**
			 * @method trigger
			 * @param event {Event} Event
			 */ 
		,	trigger: function(event) {
				if( ! this.listeners[event.name])
					this.listeners[event.name] = []; 
				for ( var i = 0; i < this.listeners[event.name].length; i++) {
					this.listeners[event.name][i].apply(this, [event]);
				}				
			}
		}
	);
	
	//description for the implicit Listener Object
	
	
	//description for the implicit Event Object
	
	/**
	 *a object representing an event instance
	 * @class Event
	 */
	/**
	 * @property name
	 * @type String
	 */

	/**
	 * @property target
	 * @type EventSource
	 */
	
	
})(jseditors);