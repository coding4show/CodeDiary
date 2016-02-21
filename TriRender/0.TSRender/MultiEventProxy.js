/**
 * MultiEventProxy
 */
var MultiEventProxy = (function () {
    function MultiEventProxy(events, allReadyCallback) {
        this.events = events;
        this.allReadyCallback = allReadyCallback;
        this.results = {};
    }
    MultiEventProxy.prototype.Ready = function (event, result) {
        this.results[event] = result;
        this.Check();
    };
    MultiEventProxy.prototype.Check = function () {
        for (var i = 0; i < this.events.length; i++) {
            var event = this.events[i];
            if (!this.results.hasOwnProperty(event)) {
                return;
            }
        }
        this.allReadyCallback(this.results);
    };
    return MultiEventProxy;
})();
