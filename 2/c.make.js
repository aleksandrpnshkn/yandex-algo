function solution(head, idx) {
    return deleteNode(idx, head);
}

function deleteNode(index, head) { 
    let target;

    if (index === 0) {      
        target = head;
        head = target.next;
    } else {    
        let prev = searchNode(index - 1, head);
        target = prev.next;
        prev.next = target.next;
    } 

    target.next = null;
    return head;
}

function searchNode(index, head) {
    for (let i = 0; i < index; i++) {
        head = head.next;
    }

    return head;
}