// Source - https://stackoverflow.com/a/8809472
// Posted by Briguy37, modified by community. See post 'Timeline' for change history
// Retrieved 2026-11-16, License - CC BY-SA 4.0

export function generateUUID() { // Public Domain / MIT
    var d = new Date().getTime(); // Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0; // Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16; // Random number between 0 and 16
        if(d > 0){ // Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else { // Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}