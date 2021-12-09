function solution(node) {
    while (node) {
        process.stdout.write(String(node.value) + '\n');
        node = node.next;
    }
}
