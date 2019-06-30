function linkNodes() {
  var Node = function(element) {
    this.element = element;
    this.next = null;
  };
  var length = 0;
  var head = null;

  this.append = function(element) {
    var node = new Node(element);
    var current;
    if (head === null) {
      head = node;
      console.log('head', head);
    } else {
      current = head;
      console.log('current = head', current);
      while (current.next) {
        console.log('while(current.next)', current.next);
        current = current.next;
        console.log('current = current.next', current);
      }
    }
    length++;
    console.log(length);
  };
}
const Link = new linkNodes();
module.exports = Link;
