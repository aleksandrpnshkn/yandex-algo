function solution(head) {
    let node = head;
    let prev;

    while (node) {
        [node.prev, node.next] = [node.next, node.prev];
        prev = node;
        node = node.prev;
    }

    return prev;
}
