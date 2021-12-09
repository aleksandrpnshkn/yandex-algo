function solution(head, value) {
    let node = head;
    let index = 0;

    while (node && node.value !== value) {
        node = node.next;
        index++;
    }

    return node ? index : -1;
}
