// ID успешной посылки 66294450

/*
 * -- ПРИНЦИП РАБОТЫ --
 * 1) Бинарным поиском найти удаляемую ноду
 * 2) Подставить вместо неё ноду nodeToMove с ближайшим значением (приоритет на ноду из левого поддерева)
 * 3) Если у ноды nodeToMove есть ребенок, то поставить ребенка на место nodeToMove
 *
 * -- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
 * Если взять ближайшее значение, то не потребуется сортировка значений.
 * Все незадействованные в перестановке элементы останутся но своих местах.
 *
 * -- ВРЕМЕННАЯ СЛОЖНОСТЬ --
 * Используется бинарный поиск, поэтому сложность поиска элемента для удаления - O(h), где h - высота дерева.
 * Поиск ближайшего элемента также O(h), т.к. это просто переход в глубину.
 * Все прочие операции - константные.
 * Итоговая сложность функции - O(h)
 *
 * -- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
 * В памяти хранятся только одиночные значения.
 * Т.к. используется рекурсия, максимальная глубина которой O(h), то общая сложность функции - O(h)
 */

function remove(root, key) {
    if (! root) {
        return null;
    }

    // Найти ноду с нужным значением и родителя этой ноды
    const nodeToRemove = find(root, key);

    // Ничего не делать если нода не найдена
    if (! nodeToRemove) {
        return root;
    }

    let nodeToMove;

    // Для подстановки либо использовать ближайшее значение из левого поддерева (самая правая нода).
    // Если левого поддерева нет, то взять ближайший элемент из правого поддерева (самая левая нода).
    if (nodeToRemove.node.left) {
        nodeToMove = getBiggest(nodeToRemove.node.left, nodeToRemove.node);
    } else if (nodeToRemove.node.right) {
        nodeToMove = getSmallest(nodeToRemove.node.right, nodeToRemove.node);
    }

    if (! nodeToMove) {
        if (nodeToRemove.parent) {
            if (nodeToRemove.parent.left === nodeToRemove.node) {
                nodeToRemove.parent.left = null;
            } else {
                nodeToRemove.parent.right = null;
            }
        }
    }

    // Если удаляется лист, то сдвигать нечего
    if (nodeToMove) {
        // У сдвигаемого элемента может быть один ребенок. Если ребенок есть - поставить ребенка на место сдвигаемого
        if (nodeToMove.parent.left === nodeToMove.node) {
            nodeToMove.parent.left = nodeToMove.node.left || nodeToMove.node.right || null;
        } else {
            nodeToMove.parent.right = nodeToMove.node.left || nodeToMove.node.right || null;
        }

        nodeToMove.node.left = null;
        nodeToMove.node.right = null;

        // Подставить новую ноду вместо удалённой ноды
        if (nodeToRemove.parent) {
            if (nodeToRemove.parent.left === nodeToRemove.node) {
                nodeToRemove.parent.left = nodeToMove.node;
            } else {
                nodeToRemove.parent.right = nodeToMove.node;
            }
        }

        // Присвоить детей удаляемой ноды к новой ноде
        if (nodeToRemove.node.left !== nodeToMove.node) {
            nodeToMove.node.left = nodeToRemove.node.left;
        }

        if (nodeToRemove.node.right !== nodeToMove.node) {
            nodeToMove.node.right = nodeToRemove.node.right;
        }
    }

    // Если удален корень - вернуть новую ноду
    if (nodeToRemove.node === root) {
        if (nodeToMove) {
            return nodeToMove.node;
        } else {
            return null;
        }
    } else {
        return root;
    }
}

function find(node, key, parent) {
    if (node.value === key) {
        return {
            node,
            parent,
        };
    }

    if (node.left && node.value > key) {
        return find(node.left, key, node);
    } else if (node.right && node.value < key) {
        return find(node.right, key, node);
    } else {
        return null;
    }
}

function getBiggest(node, parent) {
    while (node.right) {
        parent = node;
        node = node.right;
    }

    return {
        node,
        parent,
    };
}

function getSmallest(node, parent) {
    while (node.left) {
        parent = node;
        node = node.left;
    }

    return {
        node,
        parent,
    };
}
